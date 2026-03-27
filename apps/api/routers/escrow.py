from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Escrow, EscrowState

router = APIRouter()


class EscrowCreate(BaseModel):
    listing_id: int
    buyer_address: str
    seller_address: str
    amount: float


class EscrowStateTransition(BaseModel):
    action: str  # fund | dispute | resolve | complete | cancel
    in_favor_of_seller: bool | None = None  # for resolve action
    castler_escrow_id: str | None = None


class EscrowResponse(BaseModel):
    id: int
    listing_id: int
    buyer_address: str
    seller_address: str
    amount: float
    castler_escrow_id: str | None
    on_chain_escrow_id: int | None
    state: EscrowState

    model_config = {"from_attributes": True}


_VALID_TRANSITIONS: dict[EscrowState, list[str]] = {
    EscrowState.CREATED: ["fund", "cancel"],
    EscrowState.FUNDED: ["dispute", "complete"],
    EscrowState.DISPUTED: ["resolve"],
    EscrowState.RESOLVED: [],
    EscrowState.COMPLETED: [],
    EscrowState.CANCELLED: [],
}

_ACTION_TO_STATE: dict[str, EscrowState] = {
    "fund": EscrowState.FUNDED,
    "dispute": EscrowState.DISPUTED,
    "resolve": EscrowState.RESOLVED,
    "complete": EscrowState.COMPLETED,
    "cancel": EscrowState.CANCELLED,
}


@router.get("/", response_model=list[EscrowResponse])
async def get_escrows(
    db: Annotated[AsyncSession, Depends(get_db)],
    buyer_address: str | None = None,
    seller_address: str | None = None,
):
    query = select(Escrow)
    if buyer_address:
        query = query.where(Escrow.buyer_address == buyer_address)
    if seller_address:
        query = query.where(Escrow.seller_address == seller_address)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{escrow_id}", response_model=EscrowResponse)
async def get_escrow(
    escrow_id: int, db: Annotated[AsyncSession, Depends(get_db)]
):
    escrow = await db.get(Escrow, escrow_id)
    if not escrow:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Escrow not found")
    return escrow


@router.post("/", response_model=EscrowResponse, status_code=status.HTTP_201_CREATED)
async def create_escrow(
    data: EscrowCreate, db: Annotated[AsyncSession, Depends(get_db)]
):
    escrow = Escrow(**data.model_dump())
    db.add(escrow)
    await db.commit()
    await db.refresh(escrow)
    return escrow


@router.post("/{escrow_id}/transition", response_model=EscrowResponse)
async def transition_escrow(
    escrow_id: int,
    data: EscrowStateTransition,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    escrow = await db.get(Escrow, escrow_id)
    if not escrow:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Escrow not found")

    allowed = _VALID_TRANSITIONS.get(escrow.state, [])
    if data.action not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Action '{data.action}' not allowed from state '{escrow.state}'",
        )

    escrow.state = _ACTION_TO_STATE[data.action]
    if data.castler_escrow_id:
        escrow.castler_escrow_id = data.castler_escrow_id

    await db.commit()
    await db.refresh(escrow)
    return escrow

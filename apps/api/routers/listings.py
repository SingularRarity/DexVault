from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Listing, ListingStatus

router = APIRouter()


class ListingCreate(BaseModel):
    title: str
    description: str | None = None
    price: float
    category: str
    model_name: str
    seller_address: str
    model_3d_url: str | None = None


class ListingUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    price: float | None = None
    status: ListingStatus | None = None
    model_3d_url: str | None = None


class ListingResponse(BaseModel):
    id: int
    title: str
    description: str | None
    price: float
    category: str
    model_name: str
    seller_address: str
    status: ListingStatus
    model_3d_url: str | None

    model_config = {"from_attributes": True}


@router.get("/", response_model=list[ListingResponse])
async def get_listings(
    db: Annotated[AsyncSession, Depends(get_db)],
    category: str | None = None,
    status: ListingStatus = ListingStatus.ACTIVE,
):
    query = select(Listing).where(Listing.status == status)
    if category:
        query = query.where(Listing.category == category)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/{listing_id}", response_model=ListingResponse)
async def get_listing(
    listing_id: int, db: Annotated[AsyncSession, Depends(get_db)]
):
    listing = await db.get(Listing, listing_id)
    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")
    return listing


@router.post("/", response_model=ListingResponse, status_code=status.HTTP_201_CREATED)
async def create_listing(
    data: ListingCreate, db: Annotated[AsyncSession, Depends(get_db)]
):
    listing = Listing(**data.model_dump())
    db.add(listing)
    await db.commit()
    await db.refresh(listing)
    return listing


@router.patch("/{listing_id}", response_model=ListingResponse)
async def update_listing(
    listing_id: int,
    data: ListingUpdate,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    listing = await db.get(Listing, listing_id)
    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(listing, field, value)
    await db.commit()
    await db.refresh(listing)
    return listing


@router.delete("/{listing_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_listing(
    listing_id: int, db: Annotated[AsyncSession, Depends(get_db)]
):
    listing = await db.get(Listing, listing_id)
    if not listing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Listing not found")
    await db.delete(listing)
    await db.commit()

from datetime import datetime
from enum import Enum as PyEnum

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class ListingStatus(str, PyEnum):
    ACTIVE = "active"
    SOLD = "sold"
    CANCELLED = "cancelled"


class EscrowState(str, PyEnum):
    CREATED = "created"
    FUNDED = "funded"
    DISPUTED = "disputed"
    RESOLVED = "resolved"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Listing(Base):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    price: Mapped[float] = mapped_column(Numeric(18, 2), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)  # gpu | cpu
    model_name: Mapped[str] = mapped_column(String(100), nullable=False)
    seller_address: Mapped[str] = mapped_column(String(42), nullable=False, index=True)
    status: Mapped[ListingStatus] = mapped_column(
        SAEnum(ListingStatus), default=ListingStatus.ACTIVE, nullable=False
    )
    model_3d_url: Mapped[str | None] = mapped_column(String(500))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    escrows: Mapped[list["Escrow"]] = relationship(back_populates="listing")


class Escrow(Base):
    __tablename__ = "escrows"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    listing_id: Mapped[int] = mapped_column(ForeignKey("listings.id"), nullable=False)
    buyer_address: Mapped[str] = mapped_column(String(42), nullable=False, index=True)
    seller_address: Mapped[str] = mapped_column(String(42), nullable=False, index=True)
    amount: Mapped[float] = mapped_column(Numeric(18, 2), nullable=False)
    castler_escrow_id: Mapped[str | None] = mapped_column(String(100), index=True)
    on_chain_escrow_id: Mapped[int | None] = mapped_column()
    state: Mapped[EscrowState] = mapped_column(
        SAEnum(EscrowState), default=EscrowState.CREATED, nullable=False
    )
    deadline: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    listing: Mapped["Listing"] = relationship(back_populates="escrows")

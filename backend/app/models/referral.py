import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, DateTime, ForeignKey, Text, Enum as SQLEnum, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
import enum

from app.core.database import Base
from app.models.base import TimestampMixin


class ReferralStatus(str, enum.Enum):
    IDENTIFIED = "identified"
    CONTACTED = "contacted"
    RESPONDED = "responded"
    REFERRED = "referred"


class Referral(Base, TimestampMixin):
    __tablename__ = "referrals"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    company: Mapped[str] = mapped_column(String(255), nullable=False)
    contact_name: Mapped[str] = mapped_column(String(255), nullable=False)
    contact_title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    contact_profile_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    contact_source: Mapped[str] = mapped_column(String(100), nullable=False)
    relevance_score: Mapped[int] = mapped_column(Integer, nullable=False)
    suggested_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[ReferralStatus] = mapped_column(
        SQLEnum(ReferralStatus), default=ReferralStatus.IDENTIFIED, nullable=False
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="referrals")

    __table_args__ = (
        Index("ix_referrals_user_status", "user_id", "status"),
    )
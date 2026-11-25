import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, DateTime, Boolean, ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.core.database import Base
from app.models.base import TimestampMixin


class JobAlert(Base, TimestampMixin):
    __tablename__ = "job_alerts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    search_criteria: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    min_match_score: Mapped[int] = mapped_column(Integer, default=70, nullable=False)
    frequency: Mapped[str] = mapped_column(String(50), nullable=False)  # immediate, daily, weekly
    notification_channels: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    last_run_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="job_alerts")

    __table_args__ = (
        Index("ix_job_alerts_user_active", "user_id", "is_active"),
    )
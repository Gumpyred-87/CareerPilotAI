import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, DateTime, ForeignKey, Text, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.core.database import Base
from app.models.base import TimestampMixin


class InterviewSession(Base, TimestampMixin):
    __tablename__ = "interview_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    job_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="SET NULL"), nullable=True
    )
    session_type: Mapped[str] = mapped_column(String(50), nullable=False)  # technical, hr, scenario, simulation
    questions: Mapped[List[dict]] = mapped_column(JSONB, default=list, nullable=False)
    answers: Mapped[List[dict]] = mapped_column(JSONB, default=list, nullable=False)
    evaluation: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    weak_areas: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    improvement_plan: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="interview_sessions")
    job: Mapped[Optional["Job"]] = relationship()
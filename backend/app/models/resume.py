import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, DateTime, ForeignKey, Text, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.core.database import Base
from app.models.base import TimestampMixin


class Resume(Base, TimestampMixin):
    __tablename__ = "resumes"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    original_file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    parsed_content: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    structured_data: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    version: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="resumes")
    versions: Mapped[List["ResumeVersion"]] = relationship(back_populates="resume", cascade="all, delete-orphan")


class ResumeVersion(Base, TimestampMixin):
    __tablename__ = "resume_versions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    resume_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False, index=True
    )
    job_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="SET NULL"), nullable=True
    )
    tailored_content: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    changes_summary: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    ats_score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    export_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    # Relationships
    resume: Mapped["Resume"] = relationship(back_populates="versions")
    job: Mapped[Optional["Job"]] = relationship()
    applications: Mapped[List["Application"]] = relationship(back_populates="resume_version")
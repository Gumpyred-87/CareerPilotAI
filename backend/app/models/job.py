import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Boolean, DateTime, Integer, ForeignKey, Text, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.core.database import Base
from app.models.base import TimestampMixin


class Job(Base, TimestampMixin):
    __tablename__ = "jobs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    external_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, index=True)
    source: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    source_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    company: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    company_domain: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    location_type: Mapped[str] = mapped_column(String(50), nullable=False)  # remote, hybrid, onsite
    country: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    requirements: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    responsibilities: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    salary_min: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    salary_max: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    salary_currency: Mapped[str] = mapped_column(String(10), default="USD", nullable=False)
    salary_period: Mapped[str] = mapped_column(String(20), default="yearly", nullable=False)  # yearly, monthly, hourly
    employment_type: Mapped[str] = mapped_column(String(50), nullable=False)  # full-time, contract, contract-to-hire
    experience_level: Mapped[str] = mapped_column(String(50), nullable=False)  # entry, mid, senior, lead, principal
    visa_sponsorship: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    posted_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    closing_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    is_duplicate: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    duplicate_of_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("jobs.id"), nullable=True
    )
    raw_data: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)

    # Relationships
    duplicate_of: Mapped[Optional["Job"]] = relationship(remote_side=[id])
    matches: Mapped[List["JobMatch"]] = relationship(back_populates="job", cascade="all, delete-orphan")
    applications: Mapped[List["Application"]] = relationship(back_populates="job")

    __table_args__ = (
        Index("ix_jobs_source_active", "source", "is_active"),
        Index("ix_jobs_posted_date_desc", "posted_date".desc()),
        Index("ix_jobs_company_location", "company", "location"),
    )


class JobMatch(Base, TimestampMixin):
    __tablename__ = "job_matches"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    job_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False, index=True
    )
    overall_score: Mapped[int] = mapped_column(Integer, nullable=False)  # 0-100
    skills_matched: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    skills_missing: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    experience_compatibility: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    location_compatibility: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    eligibility_warnings: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    reasons_to_apply: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    reasons_not_to_apply: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)

    # Relationships
    job: Mapped["Job"] = relationship(back_populates="matches")

    __table_args__ = (
        Index("ix_job_matches_user_score", "user_id", "overall_score".desc()),
        # Unique constraint to prevent duplicate matches
    )
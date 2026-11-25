import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Boolean, DateTime, func, ForeignKey, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.core.database import Base
from app.models.base import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    last_login: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    candidate_profile: Mapped[Optional["CandidateProfile"]] = relationship(
        back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    resumes: Mapped[List["Resume"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    applications: Mapped[List["Application"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    cover_letters: Mapped[List["CoverLetter"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    job_alerts: Mapped[List["JobAlert"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    interview_sessions: Mapped[List["InterviewSession"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    referrals: Mapped[List["Referral"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    ai_providers: Mapped[List["AIProvider"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    audit_logs: Mapped[List["AuditLog"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class CandidateProfile(Base, TimestampMixin):
    __tablename__ = "candidate_profiles"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    designation: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    years_experience: Mapped[Optional[int]] = mapped_column(nullable=True)
    technical_skills: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    target_countries: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    target_locations: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    employment_types: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    work_arrangements: Mapped[List[str]] = mapped_column(JSONB, default=list, nullable=False)
    salary_expectations: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    visa_requirements: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
    languages: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="candidate_profile")
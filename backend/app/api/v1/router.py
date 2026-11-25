from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    jobs,
    applications,
    resume,
    cover_letter,
    matching,
    alerts,
    interview,
    referral,
    analytics,
    settings,
    chrome_extension,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
api_router.include_router(applications.router, prefix="/applications", tags=["Applications"])
api_router.include_router(resume.router, prefix="/resumes", tags=["Resumes"])
api_router.include_router(cover_letter.router, prefix="/cover-letters", tags=["Cover Letters"])
api_router.include_router(matching.router, prefix="/matching", tags=["Job Matching"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["Job Alerts"])
api_router.include_router(interview.router, prefix="/interview", tags=["Interview Preparation"])
api_router.include_router(referral.router, prefix="/referrals", tags=["Referrals"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(settings.router, prefix="/settings", tags=["Settings"])
api_router.include_router(chrome_extension.router, prefix="/chrome", tags=["Chrome Extension"])
from celery import Celery
from app.core.config import settings


celery_app = Celery(
    "careerpilot",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=[
        "app.tasks.job_discovery_tasks",
        "app.tasks.alert_tasks",
        "app.tasks.application_tasks",
        "app.tasks.maintenance_tasks",
    ],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,
    task_soft_time_limit=25 * 60,
    worker_prefetch_multiplier=4,
    worker_max_tasks_per_child=1000,
    beat_schedule={
        "job-discovery-every-30-min": {
            "task": "app.tasks.job_discovery_tasks.discover_all_jobs",
            "schedule": 30 * 60,
        },
        "job-matching-every-15-min": {
            "task": "app.tasks.job_discovery_tasks.match_new_jobs",
            "schedule": 15 * 60,
        },
        "alert-check-every-15-min": {
            "task": "app.tasks.alert_tasks.check_all_alerts",
            "schedule": 15 * 60,
        },
        "daily-maintenance": {
            "task": "app.tasks.maintenance_tasks.daily_cleanup",
            "schedule": 60 * 60 * 24,
        },
        "weekly-report": {
            "task": "app.tasks.alert_tasks.send_weekly_reports",
            "schedule": 60 * 60 * 24 * 7,
        },
    },
)

celery_app.autodiscover_tasks()
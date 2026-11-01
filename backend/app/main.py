from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from app.database import Base, engine
from app.routes import course_router, router

Base.metadata.create_all(bind=engine)

with engine.begin() as connection:
    course_columns = connection.execute(text("PRAGMA table_info(courses)")).all()
    if not any(column[1] == "color" for column in course_columns):
        connection.execute(
            text("ALTER TABLE courses ADD COLUMN color VARCHAR(20) NOT NULL DEFAULT '#7c3aed'")
        )

    assignment_columns = connection.execute(text("PRAGMA table_info(assignments)")).all()
    if not any(column[1] == "course" for column in assignment_columns):
        connection.execute(
            text("ALTER TABLE assignments ADD COLUMN course VARCHAR(100) NOT NULL DEFAULT ''")
        )
        connection.execute(
            text(
                """
                UPDATE assignments
                SET course = (
                    SELECT courses.name
                    FROM courses
                    WHERE courses.id = assignments.course_id
                )
                WHERE course = ''
                """
            )
        )

app = FastAPI(
    title="Assignment Tracker API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://sparrow1.local:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(course_router)

frontend_dist = Path(__file__).resolve().parents[2] / "frontend" / "dist"

# Register this after the API routes so they keep priority over static files.
if (frontend_dist / "index.html").is_file():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
else:
    @app.get("/")
    def root():
        return {"message": "Assignment Tracker API"}

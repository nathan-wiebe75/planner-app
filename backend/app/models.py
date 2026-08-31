from datetime import datetime
from sqlalchemy import Boolean, DateTime, String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    code: Mapped[str] = mapped_column(String(50))

    assignments: Mapped[list["Assignment"]] = relationship(
        back_populates="course"
    )


class Assignment(Base):
    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    course: Mapped[str] = mapped_column(String(100))
    due_date: Mapped[datetime] = mapped_column(DateTime)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)

    course_id: Mapped[int] = mapped_column(
        ForeignKey("courses.id")
    )

    course: Mapped["Course"] = relationship(
        back_populates="assignments"
    )
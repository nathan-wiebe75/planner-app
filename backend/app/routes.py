from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Assignment, Course
from app.schemas import (
    CourseCreate,
    CourseResponse,
    CourseUpdate,
    AssignmentCreate,
    AssignmentResponse,
    AssignmentUpdate,
)

router = APIRouter(
    prefix="/assignments",
    tags=["assignments"],
)

course_router = APIRouter(
    prefix="/classes",
    tags=["classes"],
)


@course_router.get("/", response_model=list[CourseResponse])
def get_courses(db: Session = Depends(get_db)):
    statement = select(Course)
    return db.scalars(statement).all()


@course_router.get("/{course_id}", response_model=CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.get(Course, course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@course_router.post("/", response_model=CourseResponse, status_code=201)
def create_course(course_data: CourseCreate, db: Session = Depends(get_db)):
    course = Course(**course_data.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@course_router.patch("/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: int,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
):
    course = db.get(Course, course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")

    updates = course_data.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(course, field, value)

    if "name" in updates:
        statement = select(Assignment).where(Assignment.course_id == course_id)
        for assignment in db.scalars(statement):
            assignment.course = course.name

    db.commit()
    db.refresh(course)
    return course


@router.get("/", response_model=list[AssignmentResponse])
def get_assignments(db: Session = Depends(get_db)):
    statement = select(Assignment)
    return db.scalars(statement).all()


@router.get("/{assignment_id}", response_model=AssignmentResponse)
def get_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.get(Assignment, assignment_id)
    if assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment


@router.post("/", response_model=AssignmentResponse, status_code=201)
def create_assignment(assignment_data: AssignmentCreate, db: Session = Depends(get_db)):
    course = db.scalar(select(Course).where(Course.name == assignment_data.course))
    if course is None:
        raise HTTPException(status_code=400, detail="Course not found")

    assignment = Assignment(
        title=assignment_data.title,
        course=assignment_data.course,
        due_date=assignment_data.due_date,
        completed=assignment_data.completed,
        course_id=course.id,
    )
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


@router.patch("/{assignment_id}", response_model=AssignmentResponse)
def update_assignment(
    assignment_id: int,
    assignment_data: AssignmentUpdate,
    db: Session = Depends(get_db),
):
    assignment = db.get(Assignment, assignment_id)
    if assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")

    updates = assignment_data.model_dump(exclude_unset=True)

    if "course" in updates:
        course = db.scalar(select(Course).where(Course.name == updates["course"]))
        if course is None:
            raise HTTPException(status_code=400, detail="Course not found")
        updates["course_id"] = course.id

    for field, value in updates.items():
        setattr(assignment, field, value)

    db.commit()
    db.refresh(assignment)
    return assignment


@router.delete("/{assignment_id}", status_code=204)
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    assignment = db.get(Assignment, assignment_id)
    if assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")

    db.delete(assignment)
    db.commit()
    return None
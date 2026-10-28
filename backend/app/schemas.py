from datetime import datetime
from pydantic import BaseModel

class CourseCreate(BaseModel):
    name: str
    code: str
    color: str = "#7c3aed"

class CourseUpdate(BaseModel):
    name: str | None = None
    code: str | None = None
    color: str | None = None

class CourseResponse(BaseModel):
    id: int
    name: str
    code: str
    color: str

    model_config = {
        "from_attributes": True
    }

class AssignmentCreate(BaseModel):
    title: str
    course: str
    due_date: datetime
    completed: bool = False

class AssignmentUpdate(BaseModel):
    title: str | None = None
    course: str | None = None
    due_date: datetime | None = None
    completed: bool | None = None

class AssignmentResponse(BaseModel):
    id: int
    title: str
    course: str
    due_date: datetime
    completed: bool

    model_config = {
        "from_attributes": True
    }
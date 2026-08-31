from datetime import datetime
from pydantic import BaseModel

class AssignmentCreate(BaseModel):
    title:str
    course:str
    due_date:datetime

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
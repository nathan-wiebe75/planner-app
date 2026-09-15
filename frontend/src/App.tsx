import { useState } from 'react'
import './App.css'
import AssignmentCard from './components/AssignmentCard'
import AssignmentForm, {
  type AssignmentFormData,
} from './components/AssignmentForm'
import ClassCard from './components/ClassCard'
import CourseForm, { type CourseFormData } from './components/CourseForm'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import type Assignment from './types/Assignment'
import type Course from './types/Course'

const startingCourses: Course[] = [
  {
    id: 1,
    name: 'Web Development',
    courseNumber: 'CS 201',
    color: '#7c3aed',
  },
  {
    id: 2,
    name: 'Database Systems',
    courseNumber: 'CS 220',
    color: '#0891b2',
  },
]

const startingAssignments: Assignment[] = [
  {
    id: 1,
    name: 'Build a React component',
    course: 'Web Development',
    dueDate: new Date('2026-09-15'),
    isComplete: false,
  },
  {
    id: 2,
    name: 'Design a database schema',
    course: 'Database Systems',
    dueDate: new Date('2026-09-18'),
    isComplete: true,
  },
]

function App() {
  const [courses, setCourses] = useState(startingCourses)
  const [assignments, setAssignments] = useState(startingAssignments)
  const [activeView, setActiveView] = useState<'assignments' | 'courses'>('assignments')
  const [editingAssignmentId, setEditingAssignmentId] = useState<number | null>(null)
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null)

  function addAssignment(assignment: AssignmentFormData) {
    setAssignments((currentAssignments) => [
      ...currentAssignments,
      {
        id: Date.now(),
        name: assignment.name,
        course: assignment.course,
        dueDate: assignment.dueDate
          ? new Date(`${assignment.dueDate}T00:00:00`)
          : new Date(),
        isComplete: false,
      },
    ])
  }

  function deleteAssignment(id: number) {
    setAssignments((currentAssignments) =>
      currentAssignments.filter((assignment) => assignment.id !== id),
    )
  }

  function updateAssignment(id: number, updatedAssignment: AssignmentFormData) {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              ...updatedAssignment,
              dueDate: updatedAssignment.dueDate
                ? new Date(`${updatedAssignment.dueDate}T00:00:00`)
                : new Date(),
            }
          : assignment,
      ),
    )
    setEditingAssignmentId(null)
  }

  function addCourse(course: CourseFormData) {
    setCourses((currentCourses) => [
      ...currentCourses,
      { id: Date.now(), ...course },
    ])
  }

  function updateCourse(id: number, updatedCourse: CourseFormData) {
    const previousCourse = courses.find((course) => course.id === id)

    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id ? { id, ...updatedCourse } : course,
      ),
    )

    if (previousCourse && previousCourse.name !== updatedCourse.name) {
      setAssignments((currentAssignments) =>
        currentAssignments.map((assignment) =>
          assignment.course === previousCourse.name
            ? { ...assignment, course: updatedCourse.name }
            : assignment,
        ),
      )
    }

    setEditingCourseId(null)
  }

  const sortedAssignments = [...assignments].sort(
    (firstAssignment, secondAssignment) =>
      firstAssignment.dueDate.getTime() - secondAssignment.dueDate.getTime(),
  )

  return (
    <>
      <Navbar title="Student Planner" />
      <div className="app-layout">
        <Sidebar />
        <main>
          <header>
            <p>Overview</p>
            <h1>My planner</h1>
            <p>Track your courses and upcoming assignments.</p>
          </header>

          <div className="view-switcher" role="tablist" aria-label="Planner views">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'assignments'}
              className={activeView === 'assignments' ? 'active' : ''}
              onClick={() => setActiveView('assignments')}
            >
              Assignments
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'courses'}
              className={activeView === 'courses' ? 'active' : ''}
              onClick={() => setActiveView('courses')}
            >
              Courses
            </button>
          </div>

          {activeView === 'assignments' ? (
            <>
              <section aria-labelledby="add-assignment-heading">
                <h2 id="add-assignment-heading">
                  {editingAssignmentId === null ? 'Add an assignment' : 'Edit assignment'}
                </h2>
                <AssignmentForm
                  key={editingAssignmentId ?? 'new-assignment'}
                  courses={courses}
                  initialAssignment={assignments.find(
                    (assignment) => assignment.id === editingAssignmentId,
                  )}
                  submitLabel={editingAssignmentId === null ? 'Add assignment' : 'Save assignment'}
                  onCancel={
                    editingAssignmentId === null
                      ? undefined
                      : () => setEditingAssignmentId(null)
                  }
                  onSubmit={
                    editingAssignmentId === null
                      ? addAssignment
                      : (assignment) => updateAssignment(editingAssignmentId, assignment)
                  }
                />
              </section>

              <section aria-labelledby="assignments-heading">
                <h2 id="assignments-heading">Assignments</h2>
                <div className="assignment-list">
                  {sortedAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      {...assignment}
                      courseColor={courses.find(
                        (course) => course.name === assignment.course,
                      )?.color}
                      onEdit={() => setEditingAssignmentId(assignment.id)}
                      onDelete={() => deleteAssignment(assignment.id)}
                    />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section aria-labelledby="courses-heading">
              <h2 id="courses-heading">Courses</h2>
              <CourseForm
                key={editingCourseId ?? 'new-course'}
                initialCourse={courses.find((course) => course.id === editingCourseId)}
                submitLabel={editingCourseId === null ? 'Add course' : 'Save course'}
                onCancel={
                  editingCourseId === null
                    ? undefined
                    : () => setEditingCourseId(null)
                }
                onSubmit={
                  editingCourseId === null
                    ? addCourse
                    : (course) => updateCourse(editingCourseId, course)
                }
              />
              <div className="course-list">
                {courses.map((course) => (
                  <ClassCard
                    key={course.id}
                    {...course}
                    onEdit={() => setEditingCourseId(course.id)}
                    assignmentCount={assignments.filter(
                      (assignment) => assignment.course === course.name,
                    ).length}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  )
}

export default App

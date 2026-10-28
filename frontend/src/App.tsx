import { useEffect, useState } from 'react'
import './App.css'
import AssignmentCard from './components/AssignmentCard'
import AssignmentForm, {
  type AssignmentFormData,
} from './components/AssignmentForm'
import ClassCard from './components/ClassCard'
import CourseForm, { type CourseFormData } from './components/CourseForm'
import Navbar from './components/Navbar'
import type Assignment from './types/Assignment'
import type Course from './types/Course'
import {
  createAssignment,
  deleteAssignment as deleteAssignmentFromApi,
  getAssignments,
  updateAssignment as updateAssignmentInApi,
} from './services/assignmentService'
import {
  createCourse,
  deleteCourse as deleteCourseFromApi,
  getCourses,
  updateCourse as updateCourseInApi,
} from './services/classService'

function App() {
  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [activeView, setActiveView] = useState<'assignments' | 'courses'>('assignments')
  const [editingAssignmentId, setEditingAssignmentId] = useState<number | null>(null)
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null)

  useEffect(() => {
    async function loadPlannerData() {
      const [loadedCourses, loadedAssignments] = await Promise.all([
        getCourses(),
        getAssignments(),
      ])
      setCourses(loadedCourses)
      setAssignments(loadedAssignments)
    }

    void loadPlannerData()
  }, [])

  async function addAssignment(assignment: AssignmentFormData) {
    const savedAssignment = await createAssignment({
      ...assignment,
      dueDate: new Date(`${assignment.dueDate}T00:00:00`),
      isComplete: false,
    })
    setAssignments((currentAssignments) => [...currentAssignments, savedAssignment])
  }

  async function deleteAssignment(id: number) {
    await deleteAssignmentFromApi(id)
    setAssignments((currentAssignments) =>
      currentAssignments.filter((assignment) => assignment.id !== id),
    )
  }

  async function toggleAssignmentCompletion(id: number) {
    const assignment = assignments.find((item) => item.id === id)
    if (!assignment) return

    const updatedAssignment = await updateAssignmentInApi(id, {
      isComplete: !assignment.isComplete,
    })
    setAssignments((currentAssignments) =>
      currentAssignments.map((item) => item.id === id ? updatedAssignment : item),
    )
  }

  async function updateAssignment(id: number, updatedAssignment: AssignmentFormData) {
    const savedAssignment = await updateAssignmentInApi(id, {
      ...updatedAssignment,
      dueDate: new Date(`${updatedAssignment.dueDate}T00:00:00`),
    })
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) => assignment.id === id ? savedAssignment : assignment),
    )
    setEditingAssignmentId(null)
  }

  async function addCourse(course: CourseFormData) {
    const savedCourse = await createCourse(course)
    setCourses((currentCourses) => [...currentCourses, savedCourse])
  }

  async function updateCourse(id: number, updatedCourse: CourseFormData) {
    const savedCourse = await updateCourseInApi(id, updatedCourse)
    setCourses((currentCourses) =>
      currentCourses.map((course) => course.id === id ? savedCourse : course),
    )

    const loadedAssignments = await getAssignments()
    setAssignments(loadedAssignments)

    setEditingCourseId(null)
  }

  async function deleteCourse(id: number) {
    await deleteCourseFromApi(id)
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id),
    )
    setAssignments((currentAssignments) =>
      currentAssignments.filter((assignment) =>
        courses.find((course) => course.id === id)?.name !== assignment.course,
      ),
    )
  }

  const sortedAssignments = [...assignments].sort(
    (firstAssignment, secondAssignment) =>
      firstAssignment.dueDate.getTime() - secondAssignment.dueDate.getTime(),
  )

  return (
    <>
      <Navbar title="Student Planner" />
      <div className="app-layout">
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
                      onToggleComplete={() => toggleAssignmentCompletion(assignment.id)}
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
                    onDelete={() => deleteCourse(course.id)}
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

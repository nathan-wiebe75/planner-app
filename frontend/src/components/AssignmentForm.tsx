import { type FormEvent, useState } from 'react'
import type Assignment from '../types/Assignment'
import type Course from '../types/Course'

export type AssignmentFormData = Omit<Assignment, 'id' | 'isComplete' | 'dueDate'> & {
	dueDate: string
}

function getDefaultDueDate() {
	return new Date().toISOString().slice(0, 10)
}

type AssignmentFormProps = {
	courses?: Course[]
	initialAssignment?: Assignment
	submitLabel?: string
	onCancel?: () => void
	onSubmit?: (assignment: AssignmentFormData) => void
}

function AssignmentForm({
	courses = [],
	initialAssignment,
	submitLabel = 'Add assignment',
	onCancel,
	onSubmit,
}: AssignmentFormProps) {
	const [name, setName] = useState(initialAssignment?.name ?? '')
	const [course, setCourse] = useState(initialAssignment?.course ?? '')
	const [dueDate, setDueDate] = useState(
		initialAssignment?.dueDate.toISOString().slice(0, 10) ?? getDefaultDueDate(),
	)

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onSubmit?.({ name, course, dueDate })
	}

	return (
		<form className="create-form" onSubmit={handleSubmit}>
			<label>
				Assignment Name
				<input
					value={name}
					onChange={(event) => setName(event.target.value)}
					required
				/>
			</label>
			<label>
				Course
				<select
					value={course}
					onChange={(event) => setCourse(event.target.value)}
					required
				>
					<option value="">Select a course</option>
					{courses.map((availableCourse) => (
						<option key={availableCourse.id} value={availableCourse.name}>
							{availableCourse.name}
						</option>
					))}
				</select>
			</label>
			<label>
				Due date
				<input
					type="date"
					value={dueDate}
					onChange={(event) => setDueDate(event.target.value)}
				/>
			</label>
			<button type="submit">{submitLabel}</button>
			{onCancel && (
				<button type="button" onClick={onCancel}>
					Cancel
				</button>
			)}
		</form>
	)
}

export default AssignmentForm

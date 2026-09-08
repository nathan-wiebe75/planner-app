import { type FormEvent, useState } from 'react'
import type Assignment from '../types/Assignment'

type AssignmentFormData = Omit<Assignment, 'id' | 'isComplete' | 'dueDate'> & {
	dueDate: string
}

type AssignmentFormProps = {
	onSubmit?: (assignment: AssignmentFormData) => void
}

function AssignmentForm({ onSubmit }: AssignmentFormProps) {
	const [name, setName] = useState('')
	const [course, setCourse] = useState('')
	const [dueDate, setDueDate] = useState('')

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onSubmit?.({ name, course, dueDate })
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Assignment name
				<input
					value={name}
					onChange={(event) => setName(event.target.value)}
					required
				/>
			</label>
			<label>
				Course
				<input
					value={course}
					onChange={(event) => setCourse(event.target.value)}
					required
				/>
			</label>
			<label>
				Due date
				<input
					type="date"
					value={dueDate}
					onChange={(event) => setDueDate(event.target.value)}
				/>
			</label>
			<button type="submit">Add assignment</button>
		</form>
	)
}

export default AssignmentForm

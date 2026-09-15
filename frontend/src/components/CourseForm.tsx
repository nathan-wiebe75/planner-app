import { type FormEvent, useState } from 'react'
import type Course from '../types/Course'

export type CourseFormData = Omit<Course, 'id'>

type CourseFormProps = {
	initialCourse?: Course
	submitLabel?: string
	onCancel?: () => void
	onSubmit?: (course: CourseFormData) => void
}

const colorOptions = [
	{ label: 'Violet', value: '#7c3aed' },
	{ label: 'Cyan', value: '#0891b2' },
	{ label: 'Green', value: '#16a34a' },
	{ label: 'Orange', value: '#ea580c' },
	{ label: 'Rose', value: '#e11d48' },
]

function CourseForm({
	initialCourse,
	submitLabel = 'Add course',
	onCancel,
	onSubmit,
}: CourseFormProps) {
	const [name, setName] = useState(initialCourse?.name ?? '')
	const [courseNumber, setCourseNumber] = useState(initialCourse?.courseNumber ?? '')
	const [color, setColor] = useState(initialCourse?.color ?? colorOptions[0].value)

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onSubmit?.({ name, courseNumber, color })
		setName('')
		setCourseNumber('')
		setColor(colorOptions[0].value)
	}

	return (
		<form className="create-form" onSubmit={handleSubmit}>
			<label>
				Course name
				<input
					value={name}
					onChange={(event) => setName(event.target.value)}
					required
				/>
			</label>
			<label>
				Course number
				<input
					value={courseNumber}
					onChange={(event) => setCourseNumber(event.target.value)}
					required
				/>
			</label>
			<label>
				Color
				<select value={color} onChange={(event) => setColor(event.target.value)}>
					{colorOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
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

export default CourseForm

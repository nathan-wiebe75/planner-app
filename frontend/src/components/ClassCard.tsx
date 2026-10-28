import type Course from '../types/Course'

type ClassCardProps = Partial<Course> & {
	onEdit?: () => void
	onDelete?: () => void
	assignmentCount?: number
}

function ClassCard({
	name = 'Class',
	courseNumber = 'No course number',
	color = '#9ca3af',
	onEdit,
	onDelete,
	assignmentCount = 0,
}: ClassCardProps) {
	return (
		<article className="course-card">
			<div className="course-card__name">
				<span
					className="course-card__swatch"
					style={{ backgroundColor: color }}
					aria-hidden="true"
				/>
				<h2>{name}</h2>
			</div>
			<div>
				<span className="course-card__label">Course number</span>
				<p>{courseNumber}</p>
			</div>
			<div>
				<span className="course-card__label">Assignments</span>
				<p>{assignmentCount}</p>
			</div>
			{onEdit && (
				<button type="button" onClick={onEdit}>
					Edit
				</button>
			)}
			{onDelete && (
				<button type="button" onClick={onDelete}>
					Delete
				</button>
			)}
		</article>
	)
}

export default ClassCard

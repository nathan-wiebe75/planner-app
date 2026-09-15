import type Assignment from '../types/Assignment'

type AssignmentCardProps = Partial<Assignment> & {
	courseColor?: string
	onEdit?: () => void
	onDelete?: () => void
}

function AssignmentCard({
	name = 'Assignment',
	course = 'Course',
	courseColor = '#9ca3af',
	dueDate,
	isComplete = false,
	onEdit,
	onDelete,
}: AssignmentCardProps) {
	return (
		<article className="assignment-card">
			<div className="assignment-card__name">
				<span
					className="assignment-card__swatch"
					style={{ backgroundColor: courseColor }}
					aria-hidden="true"
				/>
				<h2>{name}</h2>
			</div>
			<div>
				<span className="assignment-card__label">Course</span>
				<p>{course}</p>
			</div>
			<div>
				<span className="assignment-card__label">Due</span>
				<p>{dueDate?.toLocaleDateString() ?? 'No due date'}</p>
			</div>
			<div>
				<span className="assignment-card__label">Status</span>
				<p>{isComplete ? 'Complete' : 'Incomplete'}</p>
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

export default AssignmentCard

import type Assignment from '../types/Assignment'

type AssignmentCardProps = Partial<Assignment>

function AssignmentCard({
	name = 'Assignment',
	course = 'Course',
	dueDate,
	isComplete = false,
}: AssignmentCardProps) {
	return (
		<article>
			<h2>{name}</h2>
			<p>{course}</p>
			<p>Due: {dueDate?.toLocaleDateString() ?? 'No due date'}</p>
			<p>{isComplete ? 'Complete' : 'Incomplete'}</p>
		</article>
	)
}

export default AssignmentCard

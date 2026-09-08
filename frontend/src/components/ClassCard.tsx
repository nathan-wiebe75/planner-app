import type Course from '../types/Course'

type ClassCardProps = Partial<Course> & {
	instructor?: string
	assignmentCount?: number
}

function ClassCard({
	name = 'Class',
	instructor = 'No instructor',
	assignmentCount = 0,
}: ClassCardProps) {
	return (
		<article>
			<h2>{name}</h2>
			<p>Instructor: {instructor}</p>
			<p>Assignments: {assignmentCount}</p>
		</article>
	)
}

export default ClassCard

import type Course from '../types/Course'
import { apiFetch } from './api'

export type CourseInput = Omit<Course, 'id'>

type CourseApiResponse = {
	id: number
	name: string
	code: string
	color: string
}

function parseCourse(course: CourseApiResponse): Course {
	return {
		id: course.id,
		name: course.name,
		courseNumber: course.code,
		color: course.color,
	}
}

async function parseResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}

	return response.json() as Promise<T>
}

export async function getCourses(): Promise<Course[]> {
	const response = await apiFetch('/classes')
	const courses = await parseResponse<CourseApiResponse[]>(response)

	return courses.map(parseCourse)
}

export async function getCourse(id: number): Promise<Course> {
	const response = await apiFetch(`/classes/${id}`)

	return parseResponse<CourseApiResponse>(response).then(parseCourse)
}

export async function createCourse(course: CourseInput): Promise<Course> {
	const response = await apiFetch('/classes', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name: course.name, code: course.courseNumber, color: course.color }),
	})

	return parseResponse<CourseApiResponse>(response).then(parseCourse)
}

export async function updateCourse(
	id: number,
	course: Partial<CourseInput>,
): Promise<Course> {
	const response = await apiFetch(`/classes/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...(course.name !== undefined && { name: course.name }),
			...(course.courseNumber !== undefined && { code: course.courseNumber }),
			...(course.color !== undefined && { color: course.color }),
		}),
	})

	return parseResponse<CourseApiResponse>(response).then(parseCourse)
}

export async function deleteCourse(id: number): Promise<void> {
	const response = await apiFetch(`/classes/${id}`, { method: 'DELETE' })

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}
}

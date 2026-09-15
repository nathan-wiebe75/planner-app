import type Course from '../types/Course'
import { apiFetch } from './api'

export type CourseInput = Omit<Course, 'id'>

async function parseResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}

	return response.json() as Promise<T>
}

export async function getCourses(): Promise<Course[]> {
	const response = await apiFetch('/classes')

	return parseResponse<Course[]>(response)
}

export async function getCourse(id: number): Promise<Course> {
	const response = await apiFetch(`/classes/${id}`)

	return parseResponse<Course>(response)
}

export async function createCourse(course: CourseInput): Promise<Course> {
	const response = await apiFetch('/classes', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(course),
	})

	return parseResponse<Course>(response)
}

export async function updateCourse(
	id: number,
	course: Partial<CourseInput>,
): Promise<Course> {
	const response = await apiFetch(`/classes/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(course),
	})

	return parseResponse<Course>(response)
}

export async function deleteCourse(id: number): Promise<void> {
	const response = await apiFetch(`/classes/${id}`, { method: 'DELETE' })

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}
}

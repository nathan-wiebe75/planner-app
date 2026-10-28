import { apiFetch } from './api'
import type Assignment from '../types/Assignment'

export type AssignmentInput = Omit<Assignment, 'id'>

type AssignmentApiResponse = {
	id: number
	title: string
	course: string
	due_date: string
	completed: boolean
}

function parseAssignment(assignment: AssignmentApiResponse): Assignment {
	return {
		id: assignment.id,
		name: assignment.title,
		course: assignment.course,
		dueDate: new Date(assignment.due_date),
		isComplete: assignment.completed,
	}
}

async function parseResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}

	return response.json() as Promise<T>
}

export async function getAssignments(): Promise<Assignment[]> {
	const response = await apiFetch('/assignments')
	const assignments = await parseResponse<AssignmentApiResponse[]>(response)

	return assignments.map(parseAssignment)
}

export async function getAssignment(id: number): Promise<Assignment> {
	const response = await apiFetch(`/assignments/${id}`)
	const assignment = await parseResponse<AssignmentApiResponse>(response)

	return parseAssignment(assignment)
}

export async function createAssignment(assignment: AssignmentInput): Promise<Assignment> {
	const response = await apiFetch('/assignments', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			title: assignment.name,
			course: assignment.course,
			due_date: assignment.dueDate.toISOString(),
			completed: assignment.isComplete,
		}),
	})
	const createdAssignment = await parseResponse<AssignmentApiResponse>(response)

	return parseAssignment(createdAssignment)
}

export async function updateAssignment(
	id: number,
	assignment: Partial<AssignmentInput>,
): Promise<Assignment> {
	const response = await apiFetch(`/assignments/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...(assignment.name !== undefined && { title: assignment.name }),
			...(assignment.course !== undefined && { course: assignment.course }),
			...(assignment.dueDate !== undefined && { due_date: assignment.dueDate.toISOString() }),
			...(assignment.isComplete !== undefined && { completed: assignment.isComplete }),
		}),
	})
	const updatedAssignment = await parseResponse<AssignmentApiResponse>(response)

	return parseAssignment(updatedAssignment)
}

export async function deleteAssignment(id: number): Promise<void> {
	const response = await apiFetch(`/assignments/${id}`, { method: 'DELETE' })

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}
}

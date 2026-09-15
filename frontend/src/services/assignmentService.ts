import { apiFetch } from './api'
import type Assignment from '../types/Assignment'

export type AssignmentInput = Omit<Assignment, 'id'>

function parseAssignment(assignment: Assignment & { dueDate: string | Date }): Assignment {
	return {
		...assignment,
		dueDate: new Date(assignment.dueDate),
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
	const assignments = await parseResponse<Array<Assignment & { dueDate: string | Date }>>(response)

	return assignments.map(parseAssignment)
}

export async function getAssignment(id: number): Promise<Assignment> {
	const response = await apiFetch(`/assignments/${id}`)
	const assignment = await parseResponse<Assignment & { dueDate: string | Date }>(response)

	return parseAssignment(assignment)
}

export async function createAssignment(assignment: AssignmentInput): Promise<Assignment> {
	const response = await apiFetch('/assignments', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(assignment),
	})
	const createdAssignment = await parseResponse<Assignment & { dueDate: string | Date }>(response)

	return parseAssignment(createdAssignment)
}

export async function updateAssignment(
	id: number,
	assignment: Partial<AssignmentInput>,
): Promise<Assignment> {
	const response = await apiFetch(`/assignments/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(assignment),
	})
	const updatedAssignment = await parseResponse<Assignment & { dueDate: string | Date }>(response)

	return parseAssignment(updatedAssignment)
}

export async function deleteAssignment(id: number): Promise<void> {
	const response = await apiFetch(`/assignments/${id}`, { method: 'DELETE' })

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}
}

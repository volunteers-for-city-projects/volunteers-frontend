import {
	ENDPOINT_ORGANIZER_PROJECT_CATEGORIES,
	ENDPOINT_ORGANIZER_PROJECTS,
} from '../endpoints';

export async function getProjectCategories() {
	try {
		const response = await fetch(ENDPOINT_ORGANIZER_PROJECT_CATEGORIES);
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

export async function createProject(value) {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(ENDPOINT_ORGANIZER_PROJECTS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify(value),
		});
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

export async function getProjectById(id) {
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(`${ENDPOINT_ORGANIZER_PROJECTS}${id}/`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
		});
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

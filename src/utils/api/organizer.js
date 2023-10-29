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
		const response = await fetch(ENDPOINT_ORGANIZER_PROJECTS, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		});
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

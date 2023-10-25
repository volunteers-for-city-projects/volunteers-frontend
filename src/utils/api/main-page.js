import {
	ENDPOINT_MAIN_PAGE_NEWS,
	ENDPOINT_MAIN_PAGE_PLATFORM_ABOUT,
	ENDPOINT_MAIN_PAGE_FEEDBACK,
	ENDPOINT_MAIN_PAGE_SEARCH,
} from '../endpoints';

export async function getNews() {
	try {
		const response = await fetch(ENDPOINT_MAIN_PAGE_NEWS);
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

export async function getPlatformAbout() {
	try {
		const response = await fetch(ENDPOINT_MAIN_PAGE_PLATFORM_ABOUT);
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

export async function getSearchProject(search) {
	try {
		const response = await fetch(
			`${ENDPOINT_MAIN_PAGE_SEARCH}?search=${search}`
		);
		return response.json();
	} catch (error) {
		throw new Error(console.error(error));
	}
}

export async function sendMessage(value) {
	try {
		const response = await fetch(ENDPOINT_MAIN_PAGE_FEEDBACK, {
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

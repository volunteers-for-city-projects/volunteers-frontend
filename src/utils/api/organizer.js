import request from './request';
import {
	ENDPOINT_ORGANIZER_PROJECT_CATEGORIES,
	ENDPOINT_ORGANIZER_PROJECTS,
} from './endpoints';

const getProjectCategories = () =>
	request(ENDPOINT_ORGANIZER_PROJECT_CATEGORIES, 'GET');

const createProject = (value) => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_ORGANIZER_PROJECTS, 'POST', value, token);
};

const getProjectById = (id) => {
	const token = localStorage.getItem('token');
	return request(`${ENDPOINT_ORGANIZER_PROJECTS}${id}/`, 'GET', null, token);
};

/* const getAllProjects = () => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_ORGANIZER_PROJECTS, 'GET', null);
}; */

const getAllProjects = () => request(ENDPOINT_ORGANIZER_PROJECTS, 'GET', null);

/* const getNextPrev = (url) => {
	const token = localStorage.getItem('token');
	return request(url, 'GET', null);
}; */

const getNextPrev = (url) => request(url.slice(URL.length - 1), 'GET', null);

export {
	getProjectCategories,
	createProject,
	getProjectById,
	getAllProjects,
	getNextPrev,
};

import request from './request';
import {
	ENDPOINT_ORGANIZER_PROJECT_CATEGORIES,
	ENDPOINT_ORGANIZER_PROJECTS,
	ENDPOINT_ORGANIZER_PROJECTS_ME,
} from './endpoints';

const getProjectCategories = () =>
	request(ENDPOINT_ORGANIZER_PROJECT_CATEGORIES, 'GET');

const createProject = (value) => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_ORGANIZER_PROJECTS, 'POST', value, token);
};

const getProjectById = (id) =>
	request(`${ENDPOINT_ORGANIZER_PROJECTS}${id}/`, 'GET', null);

const getAllProjects = (limitParameter) =>
	request(ENDPOINT_ORGANIZER_PROJECTS + limitParameter, 'GET', null);

const getNextPrev = (limitParameter) =>
	request(ENDPOINT_ORGANIZER_PROJECTS + limitParameter, 'GET', null);

const getProjectsMe = () => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_ORGANIZER_PROJECTS_ME, 'GET', null, token);
};

const getNextPrevProjectsMe = (limitParameter) => {
	const token = localStorage.getItem('token');
	return request(
		ENDPOINT_ORGANIZER_PROJECTS_ME + limitParameter,
		'GET',
		null,
		token
	);
};

export {
	getProjectCategories,
	createProject,
	getProjectById,
	getAllProjects,
	getNextPrev,
	getProjectsMe,
	getNextPrevProjectsMe,
};

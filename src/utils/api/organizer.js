import request from './request';
import {
	ENDPOINT_ORGANIZER_PROJECT_CATEGORIES,
	ENDPOINT_ORGANIZER_PROJECTS_DRAFT,
	ENDPOINT_ORGANIZER_PROJECTS,
	ENDPOINT_ORGANIZER_PROJECTS_ME,
} from './endpoints';

const getProjectCategories = () =>
	request(ENDPOINT_ORGANIZER_PROJECT_CATEGORIES, 'GET');

const createProject = (value) => {
	const token = localStorage.getItem('token');
	request(ENDPOINT_ORGANIZER_PROJECTS, 'POST', value, token);
};

const getProjectById = (id, isLoggedIn) =>
	request(
		`${ENDPOINT_ORGANIZER_PROJECTS}${id}/`,
		'GET',
		null,
		isLoggedIn ? localStorage.getItem('token') : null
	);

const getAllProjects = (limitParameter, isLoggedIn) =>
	request(
		ENDPOINT_ORGANIZER_PROJECTS + limitParameter,
		'GET',
		null,
		isLoggedIn ? localStorage.getItem('token') : null
	);

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

const createProjectAsDraft = (value) => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_ORGANIZER_PROJECTS_DRAFT, 'POST', value, token);
};

export {
	getProjectCategories,
	createProjectAsDraft,
	createProject,
	getProjectById,
	getAllProjects,
	getProjectsMe,
	getNextPrevProjectsMe,
};

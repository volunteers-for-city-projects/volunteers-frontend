import request from './request';
import {
	ENDPOINT_ORGANIZER_PROJECT_CATEGORIES,
	ENDPOINT_ORGANIZER_PROJECTS,
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

export { getProjectCategories, createProject, getProjectById, getAllProjects };

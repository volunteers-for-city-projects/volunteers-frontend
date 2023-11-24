import request from './request';
import { ENDPOINT_ORGANIZER_PROJECTS } from './endpoints';

const deleteCardProjectOrganization = (id) => {
	const token = localStorage.getItem('token');
	return request(`${ENDPOINT_ORGANIZER_PROJECTS}${id}/`, 'DELETE', null, token);
};

const setLikeForProject = (id) => {
	const token = localStorage.getItem('token');
	return request(
		`${ENDPOINT_ORGANIZER_PROJECTS}${id}/favorite/`,
		'POST',
		null,
		token
	);
};

const resetLikeForProject = (id) => {
	const token = localStorage.getItem('token');
	return request(
		`${ENDPOINT_ORGANIZER_PROJECTS}${id}/favorite/`,
		'DELETE',
		null,
		token
	);
};

export {
	deleteCardProjectOrganization,
	setLikeForProject,
	resetLikeForProject,
};

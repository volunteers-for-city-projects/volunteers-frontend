import request from './request';
import { ENDPOINT_ORGANIZER_PROJECTS } from './endpoints';

const deleteCardProjectOrganization = (id) => {
	const token = localStorage.getItem('token');
	return request(`${ENDPOINT_ORGANIZER_PROJECTS}${id}/`, 'DELETE', null, token);
};

export { deleteCardProjectOrganization };

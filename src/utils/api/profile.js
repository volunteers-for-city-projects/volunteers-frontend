import request from './request';
import {
	ENDPOINT_PROFILE_VOLUNTEER,
	ENDPOINT_PROFILE_ORGANIZATION,
} from './endpoints';

const getVolunteerInformation = (id) => {
	const token = localStorage.getItem('token');
	return request(`${ENDPOINT_PROFILE_VOLUNTEER}${id}/`, 'GET', null, token);
};

const getOrganizationInformation = (id) => {
	const token = localStorage.getItem('token');
	return request(`${ENDPOINT_PROFILE_ORGANIZATION}${id}/`, 'GET', null, token);
};

export { getVolunteerInformation, getOrganizationInformation };

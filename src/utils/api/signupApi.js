import request from './request';
import {
	ENDPOINT_CITIES,
	ENDPOINT_SKILLS,
	ENDPOINT_USERS,
	ENDPOINT_VOLUNTEERS,
	ENDPOINT_ORGANIZATIONS,
	ENDPOINT_MEDIA,
} from './endpoints';

const getCities = () => request(ENDPOINT_CITIES, 'GET');

const getSkills = () => request(ENDPOINT_SKILLS, 'GET');

const createUser = (userData) => request(ENDPOINT_USERS, 'POST', userData);

const createVolunteer = (volunteerData) =>
	request(ENDPOINT_VOLUNTEERS, 'POST', volunteerData);

const updateVolunteer = (volunteerId, updatedVolunteerData) =>
	request(`${ENDPOINT_VOLUNTEERS}${volunteerId}/`, 'PUT', updatedVolunteerData);

const createOrganization = (organizationData) =>
	request(ENDPOINT_ORGANIZATIONS, 'POST', organizationData);

const updateOrganization = (organizationId, updatedOrganizationData) =>
	request(
		`${ENDPOINT_ORGANIZATIONS}${organizationId}/`,
		'PUT',
		updatedOrganizationData
	);

const postPhoto = (formData) => request(ENDPOINT_MEDIA, 'POST', formData);

export {
	getCities,
	getSkills,
	createUser,
	createVolunteer,
	updateVolunteer,
	createOrganization,
	updateOrganization,
	postPhoto,
};

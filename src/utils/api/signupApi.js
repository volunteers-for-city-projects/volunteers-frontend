import request from './request';
import {
	ENDPOINT_CITIES,
	ENDPOINT_SKILLS,
	ENDPOINT_USERS,
	ENDPOINT_VOLUNTEERS,
	ENDPOINT_ORGANIZATIONS,
	ENDPOINT_MEDIA,
	ENDPOINT_ACTIVATION_USER,
	ENDPOINT_RESEND_ACTIVATION_USER,
} from './endpoints';

const getCities = () => request(ENDPOINT_CITIES, 'GET');

const getSkills = () => request(ENDPOINT_SKILLS, 'GET');

const createUser = (userData) => request(ENDPOINT_USERS, 'POST', userData);

const createVolunteer = (volunteerData) =>
	request(ENDPOINT_VOLUNTEERS, 'POST', volunteerData);

const updateVolunteer = (volunteerId, updatedVolunteerData) => {
	const token = localStorage.getItem('token');
	request(
		`${ENDPOINT_VOLUNTEERS}${volunteerId}/`,
		'PUT',
		updatedVolunteerData,
		token
	);
};

const createOrganization = (organizationData) =>
	request(ENDPOINT_ORGANIZATIONS, 'POST', organizationData);

const updateOrganization = (organizationId, updatedOrganizationData) => {
	const token = localStorage.getItem('token');
	request(
		`${ENDPOINT_ORGANIZATIONS}${organizationId}/`,
		'PUT',
		updatedOrganizationData,
		token
	);
};

const postPhoto = (formData) => request(ENDPOINT_MEDIA, 'POST', formData);

const activateUser = (data) => request(ENDPOINT_ACTIVATION_USER, 'POST', data);

const resendActivateUser = ({ email }) =>
	request(ENDPOINT_RESEND_ACTIVATION_USER, 'POST', { email });

export {
	getCities,
	getSkills,
	createUser,
	createVolunteer,
	updateVolunteer,
	createOrganization,
	updateOrganization,
	postPhoto,
	activateUser,
	resendActivateUser,
};

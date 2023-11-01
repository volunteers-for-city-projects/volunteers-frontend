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

const createOrganization = (organizationData) =>
	request(ENDPOINT_ORGANIZATIONS, 'POST', organizationData);

const postPhoto = (formData) => request(ENDPOINT_MEDIA, 'POST', formData);

const updateVolunteer = async (volunteerId, updatedVolunteerData) => {
	try {
		const response = await fetch(
			`${ENDPOINT_VOLUNTEERS}/volunteers/${volunteerId}/`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedVolunteerData),
			}
		);

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при обновлении волонтера: ${error.message}`);
	}
};

const updateOrganization = async (organizationId, updatedOrganizationData) => {
	try {
		const response = await fetch(
			`${ENDPOINT_ORGANIZATIONS}/organizations/${organizationId}/`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedOrganizationData),
			}
		);

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при обновлении организации: ${error.message}`);
	}
};

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

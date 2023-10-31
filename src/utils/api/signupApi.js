const BASE_URL = 'http://better-together.acceleratorpracticum.ru/api';

const getCities = async () => {
	try {
		const response = await fetch(`${BASE_URL}/cities`);
		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при загрузке городов: ${error.message}`);
	}
};

const getSkills = async () => {
	try {
		const response = await fetch(`${BASE_URL}/skills`);
		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при загрузке навыков: ${error.message}`);
	}
};

const createUser = async (userData) => {
	try {
		const response = await fetch(`${BASE_URL}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при создании пользователя: ${error.message}`);
	}
};

const createVolunteer = async (volunteerData) => {
	try {
		const response = await fetch(`${BASE_URL}/volunteers/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(volunteerData),
		});

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при создании волонтера: ${error.message}`);
	}
};

const updateVolunteer = async (volunteerId, updatedVolunteerData) => {
	try {
		const response = await fetch(`${BASE_URL}/volunteers/${volunteerId}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedVolunteerData),
		});

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при обновлении волонтера: ${error.message}`);
	}
};

const createOrganization = async (organizationData) => {
	try {
		const response = await fetch(`${BASE_URL}/organizations/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(organizationData),
		});

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при создании организации: ${error.message}`);
	}
};

const updateOrganization = async (organizationId, updatedOrganizationData) => {
	try {
		const response = await fetch(
			`${BASE_URL}/organizations/${organizationId}/`,
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

const postPhoto = async (formData) => {
	try {
		const response = await fetch(`${BASE_URL}/media`, {
			method: 'POST',
			body: JSON.stringify(formData),
		});

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при создании организации: ${error.message}`);
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

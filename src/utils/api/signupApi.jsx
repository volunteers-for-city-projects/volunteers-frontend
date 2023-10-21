const BASE_URL = 'http://better-together.acceleratorpracticum.ru/api';

const fetchCities = async () => {
	try {
		const response = await fetch(`${BASE_URL}/cities`); // Замените на ваше API-путь для городов
		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при загрузке городов: ${error.message}`);
	}
};

const fetchSkills = async () => {
	try {
		const response = await fetch(`${BASE_URL}/skills`); // Замените на ваше API-путь для навыков
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

export {
	fetchCities,
	fetchSkills,
	createUser,
	createVolunteer,
	createOrganization,
};

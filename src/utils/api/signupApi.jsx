const BASE_URL = 'http://better-together.acceleratorpracticum.ru/api';

const createUser = async (userData) => {
	try {
		const response = await fetch(`${BASE_URL}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error('Ошибка при создании пользователя');
		}

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

		if (!response.ok) {
			throw new Error('Ошибка при создании волонтера');
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Ошибка при создании волонтера: ${error.message}`);
	}
};

export { createUser, createVolunteer };

import errorFields from '../errorFields';

export const BASE_URL = 'https://better-together.acceleratorpracticum.ru/api';

const processErrors = (errorObject) => {
	// Обработка ошибок для страницы авторизации

	if (
		Object.prototype.hasOwnProperty.call(
			errorObject,
			'CustomTokenCreateSerializer'
		)
	) {
		const objLogin = errorObject.CustomTokenCreateSerializer;
		if (Object.prototype.hasOwnProperty.call(objLogin, 'email')) {
			if (
				objLogin.email ===
				'Пользователь с данным адресом электронной почты не существует.'
			) {
				return [
					{
						notExistEmail:
							'Пользователя с такой электронной почтой не существует.',
					},
				];
			}
		}

		if (Object.prototype.hasOwnProperty.call(objLogin, 'not_active')) {
			return [
				{
					notActiveEmail:
						'Пользователь с такой электронной почтой не активирован.',
				},
			];
		}

		if (Object.prototype.hasOwnProperty.call(objLogin, 'password')) {
			if (objLogin.password === 'Неправильный пароль.') {
				return [
					{
						textError: 'Неверно указана электронная почта или пароль.',
					},
				];
			}
		}
	}

	// Обработка ошибок для страницы регистрации волонтера

	if (
		Object.prototype.hasOwnProperty.call(
			errorObject,
			'VolunteerCreateSerializer'
		)
	) {
		const objRegister = errorObject.VolunteerCreateSerializer;
		if (Object.prototype.hasOwnProperty.call(objRegister, 'email')) {
			if (
				objRegister.email[0] ===
				'Пользователь с таким Электронная почта уже существует.'
			) {
				return [
					{
						textError:
							'Пользователь с такой электронной почтой уже существует.',
					},
				];
			}
		}
	}

	// Обработка ошибок для страницы регистрации организатора

	if (
		Object.prototype.hasOwnProperty.call(
			errorObject,
			'OgranizationCreateSerializer'
		)
	) {
		const objRegister = errorObject.OgranizationCreateSerializer;
		if (Object.prototype.hasOwnProperty.call(objRegister, 'email')) {
			if (
				objRegister.email[0] ===
				'Пользователь с таким Электронная почта уже существует.'
			) {
				return [
					{
						textError:
							'Пользователь с такой электронной почтой уже существует.',
					},
				];
			}
		}

		if (Object.prototype.hasOwnProperty.call(objRegister, 'ogrn')) {
			if (objRegister.ogrn[0] === 'Организация с таким ОГРН уже существует.') {
				return [
					{
						textError: 'Организация с таким ОГРН уже существует.',
					},
				];
			}
		}
	}

	const otherErrors = Object.values(errorObject).reduce((acc, current) => {
		const errors = Object.entries(current);
		return [
			...acc,
			...errors.map((error) => {
				if (errorFields[error[0]]) {
					return {
						textError: `В поле «${errorFields[error[0]]}» ошибка: ${
							Array.isArray(error[1])
								? error[1]
										.map((item) => item)
										.join(', ')
										.toLowerCase()
								: error[1].toLowerCase()
						}`,
					};
				}
				return {
					textError: Array.isArray(error[1])
						? error[1].map((item) => item).join(', ')
						: error[1],
				};
			}),
		];
	}, []);

	return otherErrors;
};

const handleResponse = (res) => {
	if (res.statusText === 'No Content') {
		return res;
	}

	if (res.ok) {
		return res.json();
	}

	return res.json().then((error) => Promise.reject(processErrors(error)));
};

const request = (endpoint, method, body, jwt) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	const fetchInit = {
		method,
		headers: jwt
			? {
					...headers,
					Authorization: `Token ${jwt}`,
			  }
			: headers,
	};

	return fetch(
		`${BASE_URL}/${endpoint}`,
		body
			? {
					...fetchInit,
					body: JSON.stringify(body),
			  }
			: fetchInit
	).then(handleResponse);
};

export default request;

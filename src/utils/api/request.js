import errorFields from '../errorFields';

export const BASE_URL = 'https://better-together.acceleratorpracticum.ru/api';

const parseErrors = (obj) => {
	const errorArray = [];
	Object.values(obj).forEach((value) => {
		if (Array.isArray(value)) {
			const errorTexts = value.map((errorText) => ({ textError: errorText }));
			errorArray.push(...errorTexts);
		} else if (typeof value === 'object' && value !== null) {
			const nestedErrors = parseErrors(value);
			errorArray.push(...nestedErrors);
		}
	});
	return errorArray;
};

const processErrors = (errorObject) => {
	const serializer = Object.keys(errorObject)[0];

	// Обработка ошибок для страницы авторизации

	if (
		Object.prototype.hasOwnProperty.call(
			errorObject,
			'CustomTokenCreateSerializer'
		)
	) {
		const objLogin = errorObject.CustomTokenCreateSerializer;
		if (Object.prototype.hasOwnProperty.call(objLogin, 'email')) {
			return [
				{
					notExistEmail:
						'Пользователя с такой электронной почтой не существует.',
				},
			];
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
			return [
				{
					textError: 'Неверно указана электронная почта или пароль.',
				},
			];
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
			return [
				{
					textError: 'Пользователь с такой электронной почтой уже существует.',
				},
			];
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
			return [
				{
					textError: 'Пользователь с такой электронной почтой уже существует.',
				},
			];
		}

		if (Object.prototype.hasOwnProperty.call(objRegister, 'ogrn')) {
			return [
				{
					textError: 'Организация с таким ОГРН уже существует.',
				},
			];
		}
	}

	// Обработка ошибок для страницы восстановление пароля

	if (
		Object.prototype.hasOwnProperty.call(
			errorObject,
			'CustomSendEmailResetSerializer'
		)
	) {
		const objResetEmail = errorObject.CustomSendEmailResetSerializer;
		if (Object.prototype.hasOwnProperty.call(objResetEmail, 'email')) {
			return [
				{
					textError: 'Пользователя с такой электронной почтой не существует.',
				},
			];
		}
	}

	if (
		Object.prototype.hasOwnProperty.call(
			errorObject[serializer],
			'ValidationErrors'
		) &&
		Object.keys(errorObject[serializer].ValidationErrors || {}).length > 0
	) {
		const validationErrors = errorObject[serializer].ValidationErrors;
		const errorObjects = Object.entries(validationErrors).reduce(
			(acc, [key, value]) => {
				const fieldName = errorFields[key];
				const errorText = value.map((item) => item.toLowerCase()).join(', ');

				if (fieldName) {
					acc.push({
						textError: `В поле «${fieldName}» ошибка: ${errorText}`,
					});
				} else {
					acc.push({
						textError: errorText,
					});
				}

				return acc;
			},
			[]
		);

		return errorObjects;
	}

	return parseErrors(errorObject);
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

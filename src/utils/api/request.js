export const BASE_URL = 'http://better-together.acceleratorpracticum.ru/api';

const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(new Error(`Ошибка: ${res.status}`));
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
					Authorization: `Bearer ${jwt}`,
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

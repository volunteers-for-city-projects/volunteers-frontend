export const BASE_URL = 'http://better-together.acceleratorpracticum.ru/api';

const flattenObject = (obj) =>
	Object.keys(obj).reduce((result, key) => {
		if (typeof obj[key] === 'object') {
			return result.concat(flattenObject(obj[key]));
		}

		return result.concat({ textError: obj[key] });
	}, []);

const handleResponse = (res) => {
	if (res.statusText === 'No Content') {
		return res;
	}

	if (res.ok) {
		return res.json();
	}

	return res.json().then((error) => Promise.reject(flattenObject(error)));
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

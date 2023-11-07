import { ENDPOINT_CHANGE_PASSWORD, URL } from '../endpoints';

class ChangePasswordApi {
	constructor(options) {
		this.baseUrl = options.baseUrl;
		this.headers = options.headers;
	}

	request(endPoint, options) {
		return fetch(`${this.baseUrl}${endPoint}`, options).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return res.json().then((result) => Promise.reject(result));
		});
	}

	requestResponseWithoutBody(endPoint, options) {
		return fetch(`${this.baseUrl}${endPoint}`, options).then((res) => {
			if (res.ok) {
				return res;
			}
			return res.json().then((result) => Promise.reject(result));
		});
	}

	changePasswordProfile({ newPassword, currentPassword }) {
		return this.request(ENDPOINT_CHANGE_PASSWORD, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				new_password: newPassword,
				current_password: currentPassword,
			}),
		});
	}
}

export const apiChangePassword = new ChangePasswordApi({
	baseUrl: URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

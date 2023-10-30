import {
	ENDPOINT_SIGNIN,
	ENDPOINT_ABOUT_ME,
	ENDPOINT_RESET_PASSWORD,
	// ENDPOINT_CHANGE_PASSWORD,
	URL,
} from '../utils/api/endpoints';

class LoginApi {
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

	getUserInformation() {
		const token = localStorage.getItem('token');
		return this.request(ENDPOINT_ABOUT_ME, {
			method: 'GET',
			headers: Object.assign(this.headers, {
				Authorization: `Bearer ${token}`,
			}),
		});
	}

	signIn({ password, email }) {
		return this.request(ENDPOINT_SIGNIN, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				password,
				email,
			}),
		});
	}

	keyAuthentication(token) {
		return this.request(ENDPOINT_ABOUT_ME, {
			method: 'GET',
			headers: Object.assign(this.headers, {
				Authorization: `Bearer ${token}`,
			}),
		});
	}

	resetPassword(email) {
		return this.request(ENDPOINT_RESET_PASSWORD, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				email,
			}),
		});
	}
}

export const apiLogin = new LoginApi({
	baseUrl: URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

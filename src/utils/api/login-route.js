import {
	ENDPOINT_SIGNIN,
	ENDPOINT_ABOUT_ME,
	ENDPOINT_RESET_PASSWORD,
	ENDPOINT_RESET_PASSWORD_CONFIRM,
	URL,
} from '../endpoints';

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

	requestResponseWithoutBody(endPoint, options) {
		return fetch(`${this.baseUrl}${endPoint}`, options).then((res) => {
			if (res.ok) {
				return res;
			}
			return res.json().then((result) => Promise.reject(result));
		});
	}

	getUserInformation() {
		const token = localStorage.getItem('token');
		return this.request(ENDPOINT_ABOUT_ME, {
			method: 'GET',
			headers: Object.assign(this.headers, {
				Authorization: `Token ${token}`,
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
				Authorization: `Token ${token}`,
			}),
		});
	}

	resetPassword({ email }) {
		return this.requestResponseWithoutBody(ENDPOINT_RESET_PASSWORD, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				email,
			}),
		});
	}

	resetPasswordConfirm({ uid, token, password }) {
		return this.requestResponseWithoutBody(ENDPOINT_RESET_PASSWORD_CONFIRM, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				uid,
				token,
				new_password: password,
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

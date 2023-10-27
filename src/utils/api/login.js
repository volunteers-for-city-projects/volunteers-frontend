import request from './request';
import {
	ENDPOINT_SIGNIN,
	ENDPOINT_ABOUT_ME,
	ENDPOINT_RESET_PASSWORD,
	// ENDPOINT_CHANGE_PASSWORD,
} from './endpoints';

const getUserInformation = () => {
	const token = localStorage.getItem('token');
	request(ENDPOINT_ABOUT_ME, 'GET', '', token);
};

const signIn = (value) => request(ENDPOINT_SIGNIN, 'POST', value);

const keyAuthentication = (token) =>
	request(ENDPOINT_ABOUT_ME, 'GET', '', token);

const resetPassword = (email) =>
	request(ENDPOINT_RESET_PASSWORD, 'POST', { email });

export { getUserInformation, signIn, keyAuthentication, resetPassword };

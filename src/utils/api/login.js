import request from './request';
import {
	ENDPOINT_SIGNIN,
	ENDPOINT_ABOUT_ME,
	ENDPOINT_RESET_PASSWORD,
	ENDPOINT_LOGOUT,
	ENDPOINT_RESET_PASSWORD_CONFIRM,
	ENDPOINT_CHANGE_PASSWORD,
} from './endpoints';

const getUserInformation = () => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_ABOUT_ME, 'GET', null, token);
};

const signIn = (value) => request(ENDPOINT_SIGNIN, 'POST', value);

const keyAuthentication = (token) =>
	request(ENDPOINT_ABOUT_ME, 'GET', null, token);

const resetPassword = ({ email }) =>
	request(ENDPOINT_RESET_PASSWORD, 'POST', { email });

const resetPasswordConfirm = ({ uid, token, password }) =>
	request(ENDPOINT_RESET_PASSWORD_CONFIRM, 'POST', {
		uid,
		token,
		new_password: password,
	});

const logOut = () => {
	const token = localStorage.getItem('token');
	return request(ENDPOINT_LOGOUT, 'POST', null, token);
};

const changePasswordProfile = ({ newPassword, currentPassword }) => {
	const token = localStorage.getItem('token');
	return request(
		ENDPOINT_CHANGE_PASSWORD,
		'POST',
		{
			new_password: newPassword,
			current_password: currentPassword,
		},
		token
	);
};

export {
	getUserInformation,
	signIn,
	keyAuthentication,
	resetPassword,
	resetPasswordConfirm,
	logOut,
	changePasswordProfile,
};

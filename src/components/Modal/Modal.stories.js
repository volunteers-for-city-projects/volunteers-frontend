import Modal from './Modal';

export default {
	title: 'UI/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {},
};

export const Confirm = {
	args: {
		modal: {
			isOpen: true,
			type: 'confirm',
			state: 'info',
			title: 'Выход',
			onSubmit: () => {},
		},
		closeModal: () => {},
	},
};

export const PasswordInfo = {
	args: {
		modal: {
			isOpen: true,
			type: 'password',
			state: 'info',
			title: 'Сброс пароля',
			onSubmit: () => {},
		},
		closeModal: () => {},
	},
};

export const PasswordSuccess = {
	args: {
		modal: {
			isOpen: true,
			type: 'password',
			state: 'success',
			title: 'Сброс пароля',
			onSubmit: () => {},
		},
		closeModal: () => {},
	},
};

export const PasswordError = {
	args: {
		modal: {
			isOpen: true,
			type: 'password',
			state: 'error',
			title: 'Сброс пароля',
			onSubmit: () => {},
		},
		closeModal: () => {},
	},
};

export const EmailInfo = {
	args: {
		modal: {
			isOpen: true,
			type: 'email',
			state: 'info',
			title: 'Подтверждение E-mail',
			onSubmit: () => {},
		},
		closeModal: () => {},
	},
};

export const EmailSuccess = {
	args: {
		modal: {
			isOpen: true,
			type: 'email',
			state: 'success',
			title: 'E-mail подтвержден',
			onSubmit: () => {},
		},
		closeModal: () => {},
	},
};

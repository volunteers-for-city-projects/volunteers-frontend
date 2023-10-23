import { Pushbutton } from './Pushbutton';

export default {
	title: 'Components/Pushbutton/PushbuttonsPrototype',
	component: Pushbutton,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
};

export const Registration = {
	args: {
		primary: true,
		label: 'Регистрация',
		size: 'small',
	},
};

export const Entrance = {
	args: {
		primary: false,
		color: 'White',
		label: 'Войти',
		size: 'medium',
	},
};

export const Become = {
	args: {
		primary: false,
		color: 'White',
		label: 'Стать Волонтером',
		size: 'large',
		minWidth: '286px',
	},
};

export const SubmitYourApplication = {
	args: {
		primary: false,
		color: 'White',
		label: 'Оставить заявку',
		size: 'medium',
		minWidth: '541px',
	},
};

export const PersonalAccount = {
	args: {
		primary: true,
		label: 'ЛК',
		size: 'small',
	},
};

export const Exit = {
	args: {
		primary: false,
		color: 'White',
		label: 'Выход',
		size: 'medium',
	},
};

export const Register = {
	args: {
		primary: false,
		color: 'White',
		label: 'Зарегистрироваться',
		size: 'medium',
		minWidth: '380px',
	},
};

export const GoBackToTheMainPage = {
	args: {
		primary: false,
		color: 'White',
		label: 'Вернуться на главную',
		size: 'medium',
		minWidth: '380px',
	},
};

export const Welcome = {
	args: {
		primary: false,
		color: 'White',
		label: 'Добро пожаловать',
		size: 'medium',
		minWidth: '380px',
	},
};

export const ResetPassword = {
	args: {
		primary: false,
		color: 'White',
		label: 'Сбросить пароль',
		size: 'medium',
		minWidth: '380px',
	},
};

export const Status = {
	args: {
		primary: true,
		label: 'Статус',
		size: 'mini',
		minWidth: '149px',
	},
};

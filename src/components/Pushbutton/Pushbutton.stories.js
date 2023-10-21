import { Pushbutton } from './Pushbutton';

export default {
	title: 'Components/Pushbutton',
	component: Pushbutton,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
		color: { control: 'color' },
	},
};

export const Primary = {
	args: {
		primary: true,
		label: 'Зарегистрироваться',
	},
};

export const Secondary = {
	args: {
		color: 'White',
		label: 'Зарегистрироваться',
	},
};

export const Large = {
	args: {
		size: 'large',
		color: 'White',
		label: 'Зарегистрироваться',
	},
};

export const MediumPadding = {
	args: {
		size: 'medium',
		color: 'White',
		label: 'Войти',
	},
};

export const SmallPadding = {
	args: {
		size: 'small',
		color: 'White',
		label: 'Регистрация',
	},
};

export const MinFontSize = {
	args: {
		size: 'mini',
		primary: true,
		label: 'Статус',
		minWidth: '149px',
	},
};

export const MinWidth180px = {
	args: {
		size: 'small',
		label: 'Регистрация',
		color: 'White',
		minWidth: '180px',
	},
};

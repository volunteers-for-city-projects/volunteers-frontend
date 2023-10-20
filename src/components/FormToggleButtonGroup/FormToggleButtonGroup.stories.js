import FormToggleButtonGroup from './FormToggleButtonGroup';

export default {
	title: 'components/FormToggleButtonGroup',
	component: FormToggleButtonGroup,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		isActiveButton: 'volunteer',
		handleToggle: () =>
			console.log('Контейнер для кнопки с активным полем volunteer'),
	},
};

export const Volunteer = {
	title: 'components/FormToggleButtonGroup',
	component: FormToggleButtonGroup,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		isActiveButton: 'volunteer',
		handleToggle: () =>
			console.log('Контейнер для кнопки с активным полем organizer'),
	},
};

export const Organizer = {
	title: 'components/FormToggleButtonGroup',
	component: FormToggleButtonGroup,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		isActiveButton: 'organizer',
		handleToggle: () =>
			console.log('Контейнер для кнопки с активным полем organizer'),
	},
};

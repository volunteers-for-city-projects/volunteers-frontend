import Logo from './Logo';

export default {
	title: 'UI/Logo',
	component: Logo,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'ЛучшеВместе',
	},
};

export const Default = (args) => <Logo {...args} />;

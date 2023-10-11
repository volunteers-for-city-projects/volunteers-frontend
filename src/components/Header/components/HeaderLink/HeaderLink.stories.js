import HeaderLink from './HeaderLink';

export default {
	title: 'UI/Header/HeaderLink',
	component: HeaderLink,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'Link',
		path: '#',
	},
};

export const Default = (args) => <HeaderLink {...args} />;

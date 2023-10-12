import NavigationLink from './NavigationLink';

export default {
	title: 'UI/Header/NavigationLink',
	component: NavigationLink,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'Link',
		path: '#',
	},
};

export const Default = (args) => <NavigationLink {...args} />;

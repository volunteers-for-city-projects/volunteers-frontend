import NavBar from './NavBar';

export default {
	title: 'UI/NavBar',
	component: NavBar,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		dataNavArray: [
			{
				label: 'Link',
				path: '#',
			},
		],
	},
};

export const Default = (args) => <NavBar {...args} />;

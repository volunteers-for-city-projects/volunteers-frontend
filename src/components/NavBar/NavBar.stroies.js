import { withRouter } from 'storybook-addon-react-router-v6';
import NavBar from './NavBar';

export default {
	title: 'UI/NavBar',
	component: NavBar,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		dataNavArray: [
			{
				id: 1,
				label: 'Link',
				path: '/#',
				anchor: '',
			},
		],
	},
	decorators: [withRouter],
};

export const Default = (args) => <NavBar {...args} />;

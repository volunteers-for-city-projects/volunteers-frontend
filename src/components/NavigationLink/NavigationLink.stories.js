import { withRouter } from 'storybook-addon-react-router-v6';
import NavigationLink from './NavigationLink';

export default {
	title: 'UI/NavigationLink',
	component: NavigationLink,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'Link',
		path: '#',
		anchor: '',
	},
	decorators: [withRouter],
};

export const Default = (args) => <NavigationLink {...args} />;

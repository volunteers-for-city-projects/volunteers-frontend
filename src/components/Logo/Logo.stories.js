import { withRouter } from 'storybook-addon-react-router-v6';
import Logo from './Logo';

export default {
	title: 'UI/Logo',
	component: Logo,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'ЛучшеВместе',
	},
	decorators: [withRouter],
};

export const Default = (args) => <Logo {...args} />;

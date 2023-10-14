import { withRouter } from 'storybook-addon-react-router-v6';
import Contacts from './Contacts';

export default {
	title: 'UI/Contacts',
	component: Contacts,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		type: 'contacts',
	},
	decorators: [withRouter],
};

export const Default = (args) => <Contacts {...args} />;

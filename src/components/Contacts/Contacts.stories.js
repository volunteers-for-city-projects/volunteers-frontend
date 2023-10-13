import Contacts from './Contacts';

export default {
	title: 'UI/Contacts',
	component: Contacts,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		type: 'contacts',
	},
};

export const Default = (args) => <Contacts {...args} />;

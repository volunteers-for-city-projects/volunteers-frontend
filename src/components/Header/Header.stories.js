import { withRouter } from 'storybook-addon-react-router-v6';
import Header from './Header';

export default {
	title: 'Blocks/Header',
	component: Header,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		isLoggedIn: true,
		handleConfirmLogout: () => console.log('Модальное окно выхода из аккаунта'),
	},
	decorators: [withRouter],
};

export const Default = (args) => <Header {...args} />;

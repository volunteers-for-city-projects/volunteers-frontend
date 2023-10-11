import Header from './Header';

export default {
	title: 'Blocks/Header',
	component: Header,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		label: 'Header',
		type: 'button',
	},
};

export const Default = () => <Header />;

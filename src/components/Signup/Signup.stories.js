import Signup from './Signup';

export default {
	title: 'components/FormToggleButton',
	component: Signup,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		buttonText: 'Волонтер',
		isActive: true,
		onToggle: () => console.log('Кнопка переключается'),
	},
};

export const Default = (args) => <Signup {...args} />;

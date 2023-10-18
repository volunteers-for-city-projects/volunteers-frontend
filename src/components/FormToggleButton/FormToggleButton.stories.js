import FormToggleButton from './FormToggleButton';

export default {
	title: 'components/FormToggleButton',
	component: FormToggleButton,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		buttonText: 'Волонтер',
		isActive: true,
		onToggle: () => console.log('Кнопка переключается'),
	},
};

export const Default = (args) => <FormToggleButton {...args} />;

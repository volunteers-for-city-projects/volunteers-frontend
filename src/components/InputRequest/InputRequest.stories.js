import InputRequest from './InputRequest';

export default {
	title: 'UI/InputRequest',
	component: InputRequest,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		type: 'text',
		htmlFor: 'input-text',
		label: 'Имя',
		placeholder: 'Введите имя',
	},
};

export const Default = (args) => <InputRequest {...args} />;

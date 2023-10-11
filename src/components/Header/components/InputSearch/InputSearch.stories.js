import InputSearch from './InputSearch';

export default {
	title: 'UI/Header/InputSearch',
	component: InputSearch,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		placeholder: 'Поиск инициатив',
		label: '',
	},
};

export const Default = (args) => <InputSearch {...args} />;

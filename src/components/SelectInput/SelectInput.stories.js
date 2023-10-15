import SelectInput from './SelectInput';

export default {
	title: 'Components/Input/SelectInput',
	component: SelectInput,
	tags: ['autodocs'],
};

export const InputSelect = {
	args: {
		text: 'Город*',
		isValid: true,
		options: ['Выберите город', 'Москва', 'Санкт-Петербург', 'Екатеринбург'],
	},
};

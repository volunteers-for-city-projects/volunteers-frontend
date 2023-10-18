import SelectOption from './SelectOption';

export default {
	title: 'Components/SelectOption',
	component: SelectOption,
	tags: ['autodocs'],
};

export const SelectCity = {
	args: {
		text: 'Город*',
		isValid: true,
		options: [
			{ label: 'Москва', value: 'moscow' },
			{ label: 'Санкт-Петербург', value: 'sankt-petersburg' },
			{ label: 'Екатеринбург', value: 'yekaterinburg' },
		],
	},
};

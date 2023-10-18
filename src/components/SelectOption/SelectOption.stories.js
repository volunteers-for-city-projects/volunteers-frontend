import SelectOption from './SelectOption';

export default {
	title: 'Components/SelectOption',
	component: SelectOption,
	tags: ['autodocs'],
};

export const SelectCity = {
	args: {
		label: 'Город',
		width: 280,
		placeholder: 'Выберите город',
		options: [
			{ label: 'Москва', value: 'moscow' },
			{ label: 'Воронеж', value: 'voronezh' },
			{ label: 'Тула', value: 'tula' },
			{ label: 'Санкт-Петербург', value: 'sankt-petersburg' },
			{ label: 'Екатеринбург', value: 'yekaterinburg' },
			{ label: 'Курск', value: 'kursk' },
			{ label: 'Белгород', value: 'belgorod' },
			{ label: 'Казань', value: 'kazan' },
		],
		handleChange: (selectedOption) =>
			console.log(`Option selected: `, selectedOption),
		errorMessage: undefined,
		isMulti: false,
	},
};

export const SelectSkills = {
	args: {
		label: 'Навыки',
		width: 280,
		placeholder: 'Выберите навыки',
		options: [
			{ label: 'Работа с ПК', value: 'skill-001' },
			{ label: 'Вождения', value: 'skill-002' },
			{ label: 'Коммуникативные навыки', value: 'skill-003' },
			{ label: 'Организационные навыки', value: 'skill-004' },
			{ label: 'Работа в сфере экологии', value: 'skill-005' },
			{ label: 'работы с чертежами и схемами', value: 'skill-006' },
			{
				label:
					'Знание законодательства в области градостроительства и архитектуры',
				value: 'skill-007',
			},
			{ label: 'Коммуникативные навыки', value: 'skill-008' },
		],
		handleChange: (selectedOption) =>
			console.log(`Option selected: `, selectedOption),
		errorMessage: undefined,
		isMulti: true,
	},
};

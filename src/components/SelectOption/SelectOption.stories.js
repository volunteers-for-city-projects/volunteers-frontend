import SelectOption from './SelectOption';
import citiesArray from '../../utils/citiesArray';
import skillsArray from '../../utils/skillsArray';

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
		options: citiesArray,
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
		options: skillsArray,
		handleChange: (selectedOption) =>
			console.log(`Option selected: `, selectedOption),
		errorMessage: undefined,
		isMulti: true,
	},
};

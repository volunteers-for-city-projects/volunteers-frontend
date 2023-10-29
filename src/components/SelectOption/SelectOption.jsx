import Select from 'react-select';
import './SelectOption.scss';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import clsx from 'clsx';

function SelectOption({
	label,
	width,
	placeholder,
	options,
	handleChange,
	errorMessage,
	isMulti,
	required,
}) {
	// const [selectedOption, setSelectedOption] = useState(null);

	const customStyles = {
		control: (baseStyles) => ({
			...baseStyles,
			fontFamily: 'Fira Sans',
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: '23px',
			borderRadius: '5px',
			borderColor: '#3f3f3f',
			borderWidth: '1px',
			minHeight: '48px',
			padding: '2px 5px',
			'&:hover': {
				borderColor: '#3f3f3f',
			},
		}),
		dropdownIndicator: (baseStyles) => ({
			...baseStyles,
			padding: '11px 12px',
			// width: '5px',
			// height: '5px',
			color: '#3f3f3f',
			'&:hover': {
				color: '#3f3f3f',
			},
		}),
		placeholder: (baseStyles) => ({
			...baseStyles,
			fontFamily: 'Fira Sans',
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: '23px',
			color: '#c5c5c5',
		}),
		menu: (baseStyles) => ({
			...baseStyles,
		}),
		option: (baseStyles) => ({
			...baseStyles,
			fontFamily: 'Fira Sans',
			fontSize: '20px',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: '23px',
			padding: '8px 16px',
		}),
	};

	const changeOption = useCallback(
		(option) => {
			handleChange(option); // Передать выбранный вариант в функцию handleChange
		},
		[handleChange]
	);

	return (
		<div className="select-option__container" style={{ width }}>
			<label className="select-option__label" htmlFor="select-option">
				{required ? `${label}*` : label}
			</label>
			<Select
				className="select-option"
				placeholder={placeholder}
				options={options}
				onChange={changeOption}
				components={{
					IndicatorSeparator: () => null,
				}}
				styles={customStyles}
				theme={(theme) => ({
					...theme,
					borderRadius: 5,
					colors: {
						...theme.colors,
						primary25: '#a6c94f',
						primary: '#a6c94f',
					},
				})}
				isMulti={isMulti}
			/>
			<span
				className={clsx('select-option__error-message', {
					'select-option__error-message_show': errorMessage?.length > 0,
				})}
			>
				{errorMessage}
			</span>
		</div>
	);
}

SelectOption.propTypes = {
	label: PropTypes.string,
	width: PropTypes.number,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string,
		})
	),
	handleChange: PropTypes.func,
	errorMessage: PropTypes.string,
	isMulti: PropTypes.bool,
	required: PropTypes.bool,
};

SelectOption.defaultProps = {
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
	required: false,
};

export default SelectOption;

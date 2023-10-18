import Select from 'react-select';
import './SelectOption.scss';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

function SelectOption({
	label,
	width,
	placeholder,
	options,
	handleChange,
	errorMessage,
	isMulti,
}) {
	const [selectedOption, setSelectedOption] = useState(null);

	const customStyles = {
		control: (baseStyles) => ({
			...baseStyles,
			borderRadius: '10px',
			border: '2px solid black',
		}),
		dropdownIndicator: (baseStyles) => ({
			...baseStyles,
			color: '#000',
		}),
	};

	const changeOption = useCallback(
		(option) => {
			setSelectedOption(option);
			handleChange(selectedOption);
		},
		[handleChange, selectedOption]
	);

	return (
		<div className="select-option__container" style={{ maxWidth: width }}>
			<label className="select-option__label" htmlFor="select-option">
				{label}
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
					borderRadius: 10,
					colors: {
						...theme.colors,
						primary25: '#d7d7d7',
						primary: '#000',
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
};

export default SelectOption;

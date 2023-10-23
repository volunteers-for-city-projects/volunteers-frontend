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
			borderRadius: '10px',
			borderColor: '#000',
			borderWidth: '1.613px',
			'&:hover': {
				borderColor: '#000',
			},
		}),
		dropdownIndicator: (baseStyles) => ({
			...baseStyles,
			color: '#000',
			'&:hover': {
				color: '#000',
			},
		}),
		placeholder: (baseStyles) => ({
			...baseStyles,
			color: '#959595',
		}),
		menu: (baseStyles) => ({
			...baseStyles,
			padding: '8px 0px',
		}),
		option: (baseStyles) => ({
			...baseStyles,
			fontFamily: 'Fira Sans',
			fontSize: '14px',
			fontStyle: 'normal',
			fontWeight: '300',
			lineHeight: '20px',
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

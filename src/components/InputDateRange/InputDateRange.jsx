import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ru } from 'date-fns/locale';
import './react-datepicker.scss';
import './InputDateRange.scss';

const InputDateRange = forwardRef(
	(
		{
			name,
			label,
			placeholder,
			value,
			handleChange,
			inputSize,
			disabled,
			required,
			error,
			submitCount,
			filterData,
			...restProps
		},
		ref
	) => {
		registerLocale('ru', ru);
		const [isFocus, setIsFocus] = React.useState(true);
		const [dateRange, setDateRange] = useState([null, null]);
		const [startDate, endDate] = dateRange;

		// классы
		let inputClass = '';
		let labelClass = '';
		let errorClass = '';

		if (inputSize === 'mini') {
			inputClass = 'mini';
			labelClass = 'mini';
			errorClass = 'mini';
		} else if (inputSize === 'small') {
			inputClass = 'small';
			labelClass = 'small';
			errorClass = 'small';
		} else if (inputSize === 'medium') {
			inputClass = 'medium';
			labelClass = 'medium';
			errorClass = 'medium';
		} else if (inputSize === 'large') {
			inputClass = 'large';
			labelClass = 'large';
			errorClass = 'large';
		} else if (inputSize === 'extra-large') {
			inputClass = 'extra-large';
			labelClass = 'extra-large';
			errorClass = 'extra-large';
		}

		return (
			<div>
				{label.length > 0 && (
					<label htmlFor={name} className={`label label_type-${labelClass}`}>
						{required ? `${label}*` : label}
					</label>
				)}
				<DatePicker
					locale={ru}
					dateFormat="dd.MM.yyyy"
					ref={ref}
					name={name}
					selectsRange
					isClearable
					type="text"
					placeholderText={placeholder}
					startDate={startDate}
					endDate={endDate}
					calendarClassName="calendar"
					popperClassName="calendar"
					wrapperClassName="calendar"
					className={`input input_type-${inputClass} ${
						(!isFocus && error) || (submitCount === 1 && error)
							? 'input_error'
							: ''
					}`}
					style={{ marginTop: label?.length === 0 && '0' }}
					required={required}
					onChange={(update) => {
						if (update === [null, null]) {
							setDateRange([null, null]);
							setIsFocus(false);
						}
						if (update && Array.isArray(update) && update.length === 2) {
							const [start, end] = update;
							const startOfDay = start
								? new Date(start.setHours(0, 0, 0, 0))
								: null;
							const endOfDay = end
								? new Date(end.setHours(23, 59, 59, 999))
								: null;

							setIsFocus(false);
							setDateRange([startOfDay, endOfDay]);
						}
					}}
					onBlur={(e) => {
						setIsFocus(false);
						const trimmedValue = e.target.value.trim();
						handleChange(e.target.name)(trimmedValue);
					}}
					onCalendarClose={() => {
						if (startDate !== null && endDate !== null) {
							filterData(startDate, endDate);
						}
					}}
					autoComplete="off"
					{...restProps}
				/>
				<span className={`error-message error-message_type-${errorClass}`}>
					{(!isFocus && error) || (submitCount === 1 && error && error)}
				</span>
			</div>
		);
	}
);

InputDateRange.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	label: PropTypes.string.isRequired,
	// type: PropTypes.string.isRequired,
	inputSize: PropTypes.oneOf(['mini', 'small', 'medium', 'large', 'photo']),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	submitCount: PropTypes.number,
	filterData: PropTypes.func,
};

InputDateRange.defaultProps = {
	placeholder: null,
	inputSize: 'medium',
	disabled: false,
	required: false,
	error: '',
	submitCount: 0,
	handleChange: () => {},
	filterData: () => {},
	value: '',
};

export default InputDateRange;

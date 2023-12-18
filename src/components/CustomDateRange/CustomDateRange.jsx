import './CustomDateRange.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from 'styled-components';
import moment from 'moment';

export default function CustomDateRange({
	name,
	label,
	placeholder,
	error,
	required,
	helperText,
	handleChange,
	dateValue,
	...props
}) {
	registerLocale('ru', ru);
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	useEffect(() => {
		if (dateValue?.length > 0) {
			const sDate = moment(dateValue[0], 'DD.MM.YYYY').toDate();
			const eDate = moment(dateValue[1], 'DD.MM.YYYY').toDate();
			setDateRange([sDate, eDate]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="custom-daterange-input">
			{label.length > 0 && (
				<label
					htmlFor="custom-daterange-input__field"
					className="custom-daterange-input__label"
				>
					{`${label}${required ? '*' : ''}`}
				</label>
			)}
			<Styles>
				<DatePicker
					locale={ru}
					dateFormat="dd.MM.yyyy"
					name={name}
					selectsRange
					selected={startDate}
					isClearable
					type="text"
					placeholderText={placeholder}
					startDate={startDate}
					endDate={endDate}
					required={required}
					autoComplete="off"
					onChange={(v) => {
						setDateRange(v);
						console.log(v);
					}}
					className={clsx('custom-daterange-input__field', {
						'custom-daterange-input__field-error': error,
					})}
					{...props}
				/>
			</Styles>
			<span className="custom-daterange-input__error-message">
				{error && helperText}
			</span>
		</div>
	);
}

const Styles = styled.div`
	.react-datepicker-wrapper {
		width: 100%;
	}

	.react-datepicker__close-icon {
		padding: 0 13px 0 0;
	}

	.react-datepicker__close-icon::after {
		background-color: transparent;
		color: #333;
		font-size: 26px;
	}
`;

CustomDateRange.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.bool,
	required: PropTypes.bool,
	helperText: PropTypes.string,
	handleChange: PropTypes.func,
	dateValue: PropTypes.arrayOf(PropTypes.string),
};

CustomDateRange.defaultProps = {
	name: '',
	placeholder: '',
	required: false,
	error: false,
	helperText: '',
	handleChange: () => {},
	dateValue: [],
};

import React from 'react';
import PropTypes from 'prop-types';
import { useMask } from '@react-input/mask';
import './Input.scss';

export default function Input({
	name,
	label,
	type,
	placeholder,
	value,
	handleChange,
	inputSize,
	disabled,
	required,
	error,
	submitCount,
	...restProps
}) {
	const [isFocus, setIsFocus] = React.useState(true);

	// классы
	let inputClass = '';
	let labelClass = '';
	let errorClass = '';

	if (inputSize === 'small') {
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
	} else if (inputSize === 'photo') {
		inputClass = 'photo';
		labelClass = 'photo';
		errorClass = 'photo';
	}

	// маски
	let inputRef;
	let mask;
	if (type === 'text-date') {
		mask = '__.__.____';
	} else if (type === 'phone' || type === 'organize_phone') {
		mask = '+_ (___) ___-__-__';
	}

	// eslint-disable-next-line prefer-const
	inputRef = useMask({
		mask,
		replacement: { _: /\d/ },
	});

	return (
		<div>
			<label htmlFor={name} className={`label label_type-${labelClass}`}>
				{required ? `${label}*` : label}
			</label>

			<input
				ref={type !== 'text' ? inputRef : null}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				className={`input input_type-${inputClass} ${
					(!isFocus && error) || (submitCount === 1 && error)
						? 'input_error'
						: ''
				}`}
				required={required}
				onChange={(e) => {
					setIsFocus(true);
					handleChange(e);
				}}
				onBlur={() => {
					setIsFocus(false);
				}}
				{...restProps}
			/>

			<span className={`error-message error-message_type-${errorClass}`}>
				{(!isFocus && error) || (submitCount === 1 && error && error)}
			</span>
		</div>
	);
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	inputSize: PropTypes.oneOf(['small', 'medium', 'large', 'photo']),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	submitCount: PropTypes.number,
};

Input.defaultProps = {
	placeholder: null,
	inputSize: 'medium',
	disabled: false,
	required: false,
	error: '',
	submitCount: 0,
	handleChange: () => {},
	value: '',
};

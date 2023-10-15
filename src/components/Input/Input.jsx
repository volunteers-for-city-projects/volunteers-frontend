import { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export default function Input({
	name,
	label,
	type,
	placeholder,
	inputSize,
	disabled,
	required,
	...restProps
}) {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

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

	const isError = false;

	return (
		<div>
			<label htmlFor={name} className={`label label_type-${labelClass}`}>
				{required ? `${label}*` : label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				value={inputValue}
				placeholder={placeholder}
				className={`input input_type-${inputClass} ${isError && 'input_error'}`}
				disabled={disabled}
				required={required}
				onChange={handleInputChange}
				{...restProps}
			/>
			{isError && (
				<span className={`error-message  error-message_type-${errorClass}`}>
					Tекст ошибки, который должен вылазить за экран и его не должно быть
					видно, но если видно то это надо поработать со стилями и проверить все
					еще разочек
				</span>
			)}
		</div>
	);
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	inputSize: PropTypes.oneOf(['small', 'medium', 'large', 'photo']),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
};

Input.defaultProps = {
	placeholder: null,
	inputSize: 'medium',
	disabled: false,
	required: false,
};

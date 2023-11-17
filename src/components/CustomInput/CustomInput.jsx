import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './CustomInput.scss';
import clsx from 'clsx';

export default function CustomInput({
	name,
	label,
	placeholder,
	type,
	handleChange,
	error,
	required,
	inputRef,
	helperText,
	...props
}) {
	const changeName = useCallback(
		(value) => {
			handleChange(value);
		},
		[handleChange]
	);

	return (
		<div className="custom-input">
			{label.length > 0 && (
				<label htmlFor="custom-input__field" className="custom-input__label">
					{`${label}${required ? '*' : ''}`}
				</label>
			)}
			<input
				ref={inputRef}
				name={name}
				type={type}
				placeholder={placeholder}
				className={clsx('custom-input__field', {
					'custom-input__field-error': error,
				})}
				required={required}
				onChange={changeName}
				{...props}
			/>
			<span className="custom-input__error-message">{error && helperText}</span>
		</div>
	);
}

CustomInput.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	handleChange: PropTypes.func,
	error: PropTypes.bool,
	required: PropTypes.bool,
	inputRef: PropTypes.oneOfType([
		// Either a function
		PropTypes.func,
		// Or the instance of a DOM native element (see the note about SSR)
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	helperText: PropTypes.string,
};

CustomInput.defaultProps = {
	name: '',
	placeholder: '',
	required: false,
	error: false,
	handleChange: () => {},
	inputRef: undefined,
	helperText: '',
};

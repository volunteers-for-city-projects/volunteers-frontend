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
	...props
}) {
	const [isFocused, setIsFocused] = React.useState(false);

	const changeName = useCallback(
		(value) => {
			handleChange(value);
		},
		[handleChange]
	);

	return (
		<div className="input__container">
			{label.length > 0 && (
				<label htmlFor="input" className="input__label">
					{`${label}${required && '*'}`}
				</label>
			)}
			<input
				ref={inputRef}
				name={name}
				type={type}
				placeholder={placeholder}
				className={clsx('input__field', {
					'input__field-error': isFocused && error?.length > 0,
				})}
				required={required}
				onChange={changeName}
				onBlur={() => {
					setIsFocused(true);
				}}
				{...props}
			/>
			<span className="input__error-message">
				{isFocused && error?.length > 0 && error}
			</span>
		</div>
	);
}

CustomInput.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	handleChange: PropTypes.func,
	error: PropTypes.string,
	required: PropTypes.bool,
	inputRef: PropTypes.oneOfType([
		// Either a function
		PropTypes.func,
		// Or the instance of a DOM native element (see the note about SSR)
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
};

CustomInput.defaultProps = {
	name: '',
	placeholder: '',
	required: false,
	error: '',
	handleChange: () => {},
	inputRef: undefined,
};

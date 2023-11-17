import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './CustomTextarea.scss';

export default function CustomTextarea({
	name,
	label,
	placeholder,
	type,
	handleChange,
	error,
	required,
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
		<div className="textarea__container">
			{label.length > 0 && (
				<label htmlFor="textarea" className="textarea__label">
					{`${label}${required ? '*' : ''}`}
				</label>
			)}
			<textarea
				name={name}
				type={type}
				placeholder={placeholder}
				className={clsx('textarea__field', {
					'textarea__field-error': error,
				})}
				required={required}
				onChange={changeName}
				{...props}
			/>
			<span className="textarea__error-message">{error && helperText}</span>
		</div>
	);
}

CustomTextarea.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	handleChange: PropTypes.func,
	error: PropTypes.bool,
	required: PropTypes.bool,
	helperText: PropTypes.string,
};

CustomTextarea.defaultProps = {
	name: '',
	placeholder: '',
	required: false,
	error: false,
	handleChange: () => {},
	helperText: '',
};

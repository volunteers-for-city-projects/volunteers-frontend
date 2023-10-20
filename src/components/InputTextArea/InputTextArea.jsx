import React from 'react';
import PropTypes from 'prop-types';

import './InputTextArea.scss';

export default function InputTextArea({
	name,
	label,
	placeholder,
	disabled,
	required,
	value,
	handleChange,
	submitCount,
	error,
	...restProps
}) {
	const [isFocus, setIsFocus] = React.useState(true);

	return (
		<div>
			<label htmlFor={name} className="textarea-label">
				{required ? `${label}*` : label}
			</label>
			<textarea
				id={name}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				value={value}
				className={`text-area ${
					(!isFocus && error) || (submitCount === 1 && error)
						? 'text-area_error'
						: ''
				}`}
				onChange={(e) => {
					setIsFocus(true);
					handleChange(e);
				}}
				onBlur={() => {
					setIsFocus(false);
				}}
				{...restProps}
				{...restProps}
			/>
			<span className="text-area_error-message">
				{(!isFocus && error) || (submitCount === 1 && error && error)}
			</span>
		</div>
	);
}

InputTextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	value: PropTypes.string,
	handleChange: PropTypes.func,
	submitCount: PropTypes.number,
	error: PropTypes.string,
};

InputTextArea.defaultProps = {
	placeholder: null,
	disabled: false,
	required: false,
	submitCount: 0,
	handleChange: () => {},
	value: '',
	error: '',
};

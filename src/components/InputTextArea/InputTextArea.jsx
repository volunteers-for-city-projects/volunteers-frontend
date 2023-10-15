import { useState } from 'react';
import PropTypes from 'prop-types';

import './InputTextArea.scss';

export default function InputTextArea({
	name,
	label,
	placeholder,
	disabled,
	required,
	...restProps
}) {
	const [inputTextAreaValue, setInputTextAreaValue] = useState('');

	const handleInputChange = (e) => {
		setInputTextAreaValue(e.target.value);
	};

	return (
		<div>
			<label htmlFor={name} className="textarea-label">
				{required ? `${label}*` : label}
			</label>
			<textarea
				className="text-area"
				id={name}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				value={inputTextAreaValue}
				onChange={handleInputChange}
				{...restProps}
			/>
		</div>
	);
}

InputTextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
};

InputTextArea.defaultProps = {
	placeholder: null,
	disabled: false,
	required: false,
};

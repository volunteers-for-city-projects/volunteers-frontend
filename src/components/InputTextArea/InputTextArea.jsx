import { useState } from 'react';
import PropTypes from 'prop-types';

import './InputTextArea.scss';

export default function InputTextArea({
	name,
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
	);
}

InputTextArea.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
};

InputTextArea.defaultProps = {
	placeholder: null,
	disabled: false,
	required: false,
};

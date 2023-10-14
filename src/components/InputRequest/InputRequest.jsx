import { useState } from 'react';
import PropTypes from 'prop-types';
import { PatternFormat } from 'react-number-format';
import './InputRequest.scss';

function InputRequest({
	name,
	type,
	htmlFor,
	label,
	placeholder,
	error,
	value,
	handleChange,
	isMask,
	submitCount,
}) {
	const [isFocus, setIsFocus] = useState(true);

	return (
		<label className="input-request" htmlFor={htmlFor}>
			{label}
			{isMask ? (
				<PatternFormat
					className={`input-request__input ${
						(!isFocus && error) || submitCount === 1
							? 'input-request__input_error'
							: ''
					}`}
					value={value}
					format="+7 (###) ###-##-##"
					placeholder={placeholder}
					mask="_"
					onChange={handleChange}
					name={name}
					onBlur={() => {
						setIsFocus(false);
					}}
				/>
			) : (
				<input
					className={`input-request__input ${
						(!isFocus && error) || submitCount === 1
							? 'input-request__input_error'
							: ''
					}`}
					name={name}
					type={type}
					id={htmlFor}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					onBlur={() => {
						setIsFocus(false);
					}}
				/>
			)}
			<span className="input-request__error">
				{(!isFocus && error) || (submitCount === 1 && error)}
			</span>
		</label>
	);
}

InputRequest.propTypes = {
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
	htmlFor: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	error: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	isMask: PropTypes.bool,
	submitCount: PropTypes.number.isRequired,
};

InputRequest.defaultProps = {
	label: '',
	error: '',
	isMask: false,
};

export default InputRequest;

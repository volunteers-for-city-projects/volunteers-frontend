import { useState } from 'react';
import PropTypes from 'prop-types';
import { PatternFormat } from 'react-number-format';
import clsx from 'clsx';
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
	setFieldValue,
}) {
	const [isFocus, setIsFocus] = useState(true);

	return (
		<label className="input-request" htmlFor={htmlFor}>
			{label}
			{isMask ? (
				<PatternFormat
					className={clsx('input-request__input', {
						'input-request__input_error':
							(!isFocus && error) || (submitCount >= 1 && error),
					})}
					value={value}
					format="+7 (###) ###-##-##"
					placeholder={placeholder}
					mask="_"
					onChange={handleChange}
					name={name}
					onBlur={() => setIsFocus(false)}
				/>
			) : (
				<input
					className={clsx('input-request__input', {
						'input-request__input_error':
							(!isFocus && error) || (submitCount >= 1 && error),
					})}
					name={name}
					type={type}
					id={htmlFor}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					onBlur={() => {
						setIsFocus(false);
						setFieldValue(name, value.trim());
					}}
				/>
			)}
			<span className="input-request__error">
				{((!isFocus && error) || (submitCount >= 1 && error)) && error}
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
	setFieldValue: PropTypes.func.isRequired,
};

InputRequest.defaultProps = {
	label: '',
	error: '',
	isMask: false,
};

export default InputRequest;

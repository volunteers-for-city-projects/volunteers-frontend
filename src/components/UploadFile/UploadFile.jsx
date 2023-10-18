import React from 'react';
import PropTypes from 'prop-types';
import './UploadFile.scss';

export default function UploadFile({
	name,
	label,
	type,
	placeholder,
	value,
	setSelectedFile,
	inputSize,
	disabled,
	required,
	error,
	submitCount,
	...restProps
}) {
	return (
		<div>
			<label htmlFor={name} className="label-file label-file_type-photo">
				{required ? `${label}*` : label}
			</label>

			<input
				name={name}
				type={type}
				placeholder={placeholder}
				className="input-file input-file_type-photo"
				required={required}
				onChange={(e) => {
					setSelectedFile(e.target.files[0]); // Save the selected file locally
				}}
				{...restProps}
			/>
		</div>
	);
}

UploadFile.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	setSelectedFile: PropTypes.func,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	inputSize: PropTypes.oneOf(['small', 'medium', 'large', 'photo']),
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	submitCount: PropTypes.number,
};

UploadFile.defaultProps = {
	placeholder: null,
	inputSize: 'medium',
	disabled: false,
	required: false,
	error: '',
	submitCount: 0,
	setSelectedFile: () => {},
	value: '',
};

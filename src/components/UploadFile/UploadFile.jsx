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
	disabled,
	required,
	error,
	submitCount,
	...restProps
}) {
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	return (
		<>
			<label htmlFor={name} className="label-file label-file_type-photo">
				{required ? `${label}*` : label}
			</label>

			<input
				name={name}
				type={type}
				placeholder={placeholder}
				className="input-file input-file_type-photo"
				required={required}
				accept="image/*" // Укажите типы файлов, которые разрешено загружать
				onChange={handleFileChange}
				{...restProps}
			/>
		</>
	);
}

UploadFile.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	setSelectedFile: PropTypes.func,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.string,
	submitCount: PropTypes.number,
};

UploadFile.defaultProps = {
	placeholder: null,
	disabled: false,
	required: false,
	error: '',
	submitCount: 0,
	setSelectedFile: () => {},
	value: '',
};

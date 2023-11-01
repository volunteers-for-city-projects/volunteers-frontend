import { useState } from 'react';
import PropTypes from 'prop-types';
import './UploadFile.scss';

export default function UploadFile({
	name,
	label,
	type,
	placeholder,
	value,
	setFieldValue,
	inputSize,
	disabled,
	required,
	error,
	submitCount,
	...restProps
}) {
	const [image, setImage] = useState('');

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function handleFileLoad() {
			const base64Data = reader.result;
			setFieldValue('photo', base64Data);
			setImage(base64Data);
		};

		reader.readAsDataURL(file);
	};

	return (
		<>
			{image && (
				<img className="input-file__image" src={image} alt="Фото волонтёра" />
			)}
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
					accept="image/*"
					onChange={handleFileChange}
					{...restProps}
				/>
			</div>
		</>
	);
}

UploadFile.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	setFieldValue: PropTypes.func,
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
	setFieldValue: () => {},
	value: '',
};

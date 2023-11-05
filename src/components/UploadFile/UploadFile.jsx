import { useState } from 'react';
import PropTypes from 'prop-types';
import './UploadFile.scss';

export default function UploadFile({
	name,
	label,
	type,
	placeholder,
	value,
	error,
	setFieldValue,
	setFieldError,
	inputSize,
	disabled,
	required,
	submitCount,
	...restProps
}) {
	const [image, setImage] = useState('');

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		if (file) {
			if (file.size >= 20 * (1024 * 1024)) {
				setFieldError('photo', 'Размер не более 20 Мбайт');
				// eslint-disable-next-line no-param-reassign
				event.target.value = '';
			} else {
				reader.onload = function handleFileLoad() {
					const base64Data = reader.result;
					setFieldValue('photo', base64Data);
					setImage(base64Data);
				};
				reader.readAsDataURL(file);
			}
		}
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
					accept="image/png, image/jpeg"
					onChange={handleFileChange}
					{...restProps}
				/>
				<span className="error-message error-message_type-photo">
					{error && error}
				</span>
			</div>
		</>
	);
}

UploadFile.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	error: PropTypes.string,
	setFieldValue: PropTypes.func,
	setFieldError: PropTypes.func,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	submitCount: PropTypes.number,
};

UploadFile.defaultProps = {
	placeholder: null,
	disabled: false,
	required: false,
	submitCount: 0,
	setFieldValue: () => {},
	setFieldError: () => {},
	value: '',
	error: '',
};

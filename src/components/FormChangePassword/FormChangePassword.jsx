import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import './FormChangePassword.scss';
import Input from '../Input/Input';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import { changePasswordProfile } from '../../utils/api/login';
import FormChangePasswordSchema from '../../utils/validationSchemas/FormChangePasswordSchema';

function FormChangePassword({ popup, setModal, setPopup, closePopup }) {
	const [isDisabled, setIsDisabled] = useState(false);

	const handleChangePassword = (
		{ newPassword, currentPassword },
		{ resetForm }
	) => {
		setIsDisabled(true);
		changePasswordProfile({ newPassword, currentPassword })
			.then(() => {
				setModal({
					isOpen: true,
					type: 'changePassword',
					typeChildren: 'change-password',
					state: 'success',
					title: 'Пароль успешно изменён',
					onSubmit: (event) => {
						event.preventDefault();
						setModal({
							isOpen: false,
						});
					},
				});
				resetForm();
			})
			.catch((err) => {
				setPopup({
					isOpen: true,
					type: 'error',
					styleType: 'modal',
					text: err[0].textError,
				});
				closePopup();
			})
			.finally(() => {
				setIsDisabled(false);
			});
	};

	return (
		<Formik
			initialValues={{
				currentPassword: '',
				newPassword: '',
				repeatNewPassword: '',
			}}
			validateOnMount
			validateOnChange
			validationSchema={FormChangePasswordSchema}
			onSubmit={handleChangePassword}
		>
			{({ handleChange, values, errors, isValid }) => (
				<Form className="form-password__inputs" noValidate>
					<Input
						id="currentPassword"
						name="currentPassword"
						type="password"
						label="Старый пароль*"
						placeholder=""
						inputSize="mini"
						value={values.currentPassword}
						error={errors.currentPassword}
						handleChange={handleChange}
					/>
					<div className="form-password__inputs-group">
						<Input
							id="newPassword"
							name="newPassword"
							type="password"
							label="Новый пароль*"
							placeholder=""
							inputSize="mini"
							value={values.newPassword}
							error={errors.newPassword}
							handleChange={handleChange}
						/>
						<Input
							id="repeatNewPassword"
							name="repeatNewPassword"
							type="password"
							label="Повтор нового пароля*"
							placeholder=""
							inputSize="mini"
							value={values.repeatNewPassword}
							error={errors.repeatNewPassword}
							handleChange={handleChange}
						/>
					</div>
					<div className="form-password__button">
						<Pushbutton
							label="Изменить пароль"
							color="white"
							size="pre-large"
							backgroundColor="#A6C94F"
							border="none"
							type="submit"
							disabled={!isValid || isDisabled || popup.isOpen}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default FormChangePassword;

FormChangePassword.propTypes = {
	popup: PropTypes.shape({
		isOpen: PropTypes.bool,
		text: PropTypes.string,
		type: PropTypes.string,
	}).isRequired,
	closePopup: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired,
	setPopup: PropTypes.func.isRequired,
};

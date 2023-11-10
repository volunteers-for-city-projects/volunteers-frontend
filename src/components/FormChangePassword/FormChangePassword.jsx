import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import './FormChangePassword.scss';
import Input from '../Input/Input';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import FormChangePasswordSchema from '../../utils/validationSchemas/FormChangePasswordSchema';

function FormChangePassword({ isOpen, onClose, onChangePassword }) {
	const handleSubmit = (values, { resetForm }) => {
		onChangePassword(
			{
				newPassword: values.newPassword,
				currentPassword: values.currentPassword,
			},
			{ resetForm }
		);
	};

	return (
		<div className={`form-password ${isOpen ? 'form-password_opened' : ''}`}>
			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: '',
					repeatNewPassword: '',
				}}
				validationSchema={FormChangePasswordSchema}
				onSubmit={handleSubmit}
			>
				{({ handleChange, values, errors, isValid }) => (
					<Form className="form-password__container" noValidate>
						<button
							className="form-password__close"
							type="button"
							onClick={onClose}
						>
							{' '}
						</button>
						<div className="form-password__title-container">
							<h2 className="form-password__title">Изменение пароля</h2>
						</div>

						<div className="form-password__inputs">
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
						</div>
						<Pushbutton
							label="Изменить пароль"
							color="white"
							size="pre-large"
							minWidth="400px"
							backgroundColor="#A6C94F"
							border="none"
							type="submit"
							disabled={!isValid}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default FormChangePassword;

FormChangePassword.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onChangePassword: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import './ModalChangePassword.scss';
import Input from '../Input/Input';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ModalChangePasswordSchema from '../../utils/validationSchemas/ModalChangePasswordSchema';

function ModalChangePassword({ isOpen, onClose, onChangePassword }) {
	const handleSubmit = (values) => {
		onChangePassword({
			newPassword: values.newPassword,
			currentPassword: values.currentPassword,

			// repeatNewPassword: values.repeatNewPassword,
		});
	};

	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: '',
					repeatNewPassword: '',
				}}
				validationSchema={ModalChangePasswordSchema}
				onSubmit={handleSubmit}
			>
				{({ handleChange, values, errors, touched }) => (
					<Form className="popup__container" noValidate>
						<button className="popup__close" type="button" onClick={onClose}>
							{' '}
						</button>
						<div className="popup__title-container">
							<h2 className="popup__title">Изменение пароля</h2>
						</div>

						<div className="popup__inputs">
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
								touched={touched.currentPassword}
							/>
							<div className="popup__inputs-group">
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
									touched={touched.newPassword}
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
									touched={touched.repeatNewPassword}
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
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default ModalChangePassword;

ModalChangePassword.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onChangePassword: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

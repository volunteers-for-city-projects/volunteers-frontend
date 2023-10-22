import React from 'react';
import PropTypes from 'prop-types';
import './PasswordRecovery.scss';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import {
	REG_EX_EMAIL,
	ERROR_MESSAGE_REQUIRED,
	ERROR_MESSAGE_EMAIL,
	ERROR_MESSAGE_EMAIL_REG_EX,
} from '../../utils/constants';

function PasswordRecovery({
	title,
	subtitle,
	buttonSubmitText,
	onPasswordReset,
}) {
	const isLoading = false;
	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			userEmail: '',
		},
		validationSchema: Yup.object({
			userEmail: Yup.string()
				.email(ERROR_MESSAGE_EMAIL)
				.matches(REG_EX_EMAIL, ERROR_MESSAGE_EMAIL_REG_EX)
				.required(ERROR_MESSAGE_REQUIRED),
		}),
		onSubmit: (values) => {
			onPasswordReset({
				email: values.userEmail,
			});
		},
	});

	return (
		<section className="password-recovery">
			<h1 className="password-recovery__header-title">{title}</h1>
			<p className="password-recovery__header-text">{subtitle}</p>
			<form
				name="signIn"
				onSubmit={formik.handleSubmit}
				className="password-recovery__form"
			>
				<label className="password-recovery__label" htmlFor="userEmail">
					E-mail
					<input
						type="email"
						placeholder="Email"
						className="password-recovery__input"
						id="userEmail"
						name="userEmail"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.userEmail}
						disabled={isLoading}
						required
					/>
					{formik.touched.userEmail && formik.errors.userEmail ? (
						<div className="password-recovery__input-error">
							{formik.errors.userEmail}
						</div>
					) : null}
				</label>
				<Link to="password-recovery" className="password-recovery__link">
					Я вспомнил пароль!
				</Link>

				<Pushbutton
					color="White"
					label={buttonSubmitText}
					minWidth="380px"
					size="medium"
					disabled={!formik.isValid || isLoading}
					type="submit"
				/>
			</form>
		</section>
	);
}
PasswordRecovery.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	buttonSubmitText: PropTypes.string,
	onPasswordReset: PropTypes.func,
};

PasswordRecovery.defaultProps = {
	title: 'Восстановление пароля',
	subtitle:
		'Введите E-mail, указанный при регистрации — мы отправим вам ссылку для восстановления пароля',
	buttonSubmitText: 'Сбросить пароль',
	onPasswordReset: PropTypes.func,
};

export default PasswordRecovery;

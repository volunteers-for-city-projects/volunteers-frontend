import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './PasswordRecovery.scss';
import { Link, useOutletContext } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import {
	REG_EX_EMAIL,
	ERROR_MESSAGE_REQUIRED,
	ERROR_MESSAGE_EMAIL,
	ERROR_MESSAGE_EMAIL_MIN_MAX,
} from '../../utils/constants';

function PasswordRecovery({
	title,
	subtitle,
	buttonSubmitText,
	onPasswordReset,
	className,
}) {
	const { isLoading } = useOutletContext();
	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			userEmail: '',
		},
		validationSchema: Yup.object({
			userEmail: Yup.string()
				.email(ERROR_MESSAGE_EMAIL)
				.matches(REG_EX_EMAIL, ERROR_MESSAGE_EMAIL)
				.min(5, ERROR_MESSAGE_EMAIL_MIN_MAX)
				.max(256, ERROR_MESSAGE_EMAIL_MIN_MAX)
				.required(ERROR_MESSAGE_REQUIRED),
		}),
		onSubmit: (values) => {
			onPasswordReset({
				email: values.userEmail,
			});
		},
	});

	const linkClasses = clsx(
		'password-recovery__link',
		{
			'password-recovery__link_disabled': isLoading,
		},
		className
	);

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
					E-mail*
					<input
						type="email"
						placeholder="Введите E-mail"
						className={clsx('password-recovery__input', {
							'password-recovery__input_type-error':
								formik.touched.userEmail && formik.errors.userEmail,
						})}
						id="userEmail"
						name="userEmail"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.userEmail ?? ''}
						disabled={isLoading}
						required
					/>
					{formik.touched.userEmail && formik.errors.userEmail ? (
						<div className="password-recovery__input-error">
							{formik.errors.userEmail}
						</div>
					) : null}
					<Link to=".." className={linkClasses}>
						Вспомнил пароль!
					</Link>
				</label>

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
	className: PropTypes.string,
};

PasswordRecovery.defaultProps = {
	title: 'Восстановление пароля',
	subtitle:
		'Введите E-mail, указанный при регистрации — мы отправим вам ссылку для восстановления пароля',
	buttonSubmitText: 'Сбросить пароль',
	onPasswordReset: PropTypes.func,
	className: '',
};

export default PasswordRecovery;

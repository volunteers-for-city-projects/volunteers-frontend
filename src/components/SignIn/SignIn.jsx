import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './SignIn.scss';
import { Link, useOutletContext } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import {
	REG_EX_EMAIL,
	ERROR_MESSAGE_REQUIRED,
	ERROR_MESSAGE_EMAIL,
	ERROR_MESSAGE_PASSWORD_MIN,
	ERROR_MESSAGE_PASSWORD_MAX,
	ERROR_MESSAGE_EMAIL_REG_EX,
} from '../../utils/constants';

function SignIn({ title, subtitle, buttonSubmitText, onSignIn, className }) {
	const { isLoading } = useOutletContext();
	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			userPassword: '',
			userEmail: '',
		},
		validationSchema: Yup.object({
			userEmail: Yup.string()
				.email(ERROR_MESSAGE_EMAIL)
				.matches(REG_EX_EMAIL, ERROR_MESSAGE_EMAIL_REG_EX)
				.required(ERROR_MESSAGE_REQUIRED),
			userPassword: Yup.string()
				.min(5, ERROR_MESSAGE_PASSWORD_MIN)
				.max(20, ERROR_MESSAGE_PASSWORD_MAX)
				.required(ERROR_MESSAGE_REQUIRED),
		}),
		onSubmit: (values) => {
			onSignIn({
				password: values.userPassword,
				email: values.userEmail,
			});
		},
	});
	const linkClasses = clsx(
		'sign-in__link',
		{
			'sign-in__link_disabled': isLoading,
		},
		className
	);
	return (
		<section className="sign-in">
			<h1 className="sign-in__header-title">{title}</h1>
			<p className="sign-in__header-text">{subtitle}</p>
			<form
				name="signIn"
				onSubmit={formik.handleSubmit}
				className="sign-in__form"
			>
				<div className="sign-in__inputs">
					<label className="sign-in__label" htmlFor="userEmail">
						E-mail
						<input
							type="email"
							placeholder="Email"
							className="sign-in__input"
							id="userEmail"
							name="userEmail"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.userEmail}
							disabled={isLoading}
							required
						/>
						{formik.touched.userEmail && formik.errors.userEmail ? (
							<div className="sign-in__input-error">
								{formik.errors.userEmail}
							</div>
						) : null}
					</label>
					<label className="sign-in__label" htmlFor="userPassword">
						Пароль
						<input
							type="password"
							placeholder="Пароль"
							className="sign-in__input"
							id="userPassword"
							name="userPassword"
							minLength="5"
							maxLength="20"
							value={formik.values.userPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							disabled={isLoading}
							required
						/>
						{formik.touched.userPassword && formik.errors.userPassword ? (
							<div className="sign-in__input-error">
								{formik.errors.userPassword}
							</div>
						) : null}
					</label>
					<Link to="password-recovery" className={linkClasses}>
						Забыли пароль?
					</Link>
				</div>
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
SignIn.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	buttonSubmitText: PropTypes.string,
	className: PropTypes.string,
	onSignIn: PropTypes.func,
};

SignIn.defaultProps = {
	title: 'Войти',
	subtitle: 'в личный кабинет',
	buttonSubmitText: 'Войти',
	className: '',
	onSignIn: PropTypes.func,
};

export default SignIn;

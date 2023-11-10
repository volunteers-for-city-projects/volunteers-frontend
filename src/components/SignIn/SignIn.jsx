import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './SignIn.scss';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import {
	REG_EX_EMAIL,
	ERROR_MESSAGE_REQUIRED,
	ERROR_MESSAGE_EMAIL,
	ERROR_MESSAGE_PASSWORD_MIN,
	ERROR_MESSAGE_PASSWORD_MAX,
	ERROR_MESSAGE_EMAIL_MIN_MAX,
	REG_EX_PASSWORD,
	ERROR_MESSAGE_PASSWORD_REG_EX,
} from '../../utils/constants';
import telegram from '../../images/icon-tg.svg';
import vkontakte from '../../images/icon-vk.svg';

function SignIn({ title, subtitle, buttonSubmitText, onSignIn, className }) {
	const { isLoading } = useOutletContext();
	const navigate = useNavigate();
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
				.min(5, ERROR_MESSAGE_EMAIL_MIN_MAX)
				.max(256, ERROR_MESSAGE_EMAIL_MIN_MAX)
				.matches(REG_EX_EMAIL, ERROR_MESSAGE_EMAIL)
				.required(ERROR_MESSAGE_REQUIRED),
			userPassword: Yup.string()
				.min(8, ERROR_MESSAGE_PASSWORD_MIN)
				.max(20, ERROR_MESSAGE_PASSWORD_MAX)
				.matches(REG_EX_PASSWORD, ERROR_MESSAGE_PASSWORD_REG_EX)
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

	const onClickRegestration = () => {
		navigate('/registration');
	};

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
							placeholder="Введите E-mail"
							className={clsx('sign-in__input', {
								'sign-in__input_type-error':
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
							<div className="sign-in__input-error">
								{formik.errors.userEmail}
							</div>
						) : null}
					</label>

					<label className="sign-in__label" htmlFor="userPassword">
						Пароль
						<input
							type="password"
							placeholder="Введите пароль"
							className="sign-in__input"
							id="userPassword"
							name="userPassword"
							minLength="5"
							maxLength="20"
							value={formik.values.userPassword ?? ''}
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
						<Link to="password-recovery" className={linkClasses}>
							Забыли пароль?
						</Link>
					</label>
				</div>
				<Pushbutton
					label={buttonSubmitText}
					color="#fff"
					size="entrance"
					minWidth="100%"
					disabled={!formik.isValid || isLoading}
					type="submit"
				/>
			</form>
			<Pushbutton
				label="Зарегистрироваться"
				color="#3F3F3F"
				primary
				border="1px solid #a6c94f"
				size="entrance"
				minWidth="100%"
				type="button"
				onClick={onClickRegestration}
			/>
			<h2 className="sign-in__heading-button-icon-list">Через соцсети</h2>
			<ul className="sign-in__button-icon-list">
				<li>
					<button className="sign-in__button" disabled={isLoading}>
						<img className="sign-in__icon" src={telegram} alt="Телеграмм" />
					</button>
				</li>
				<li>
					<button className="sign-in__button" disabled={isLoading}>
						<img className="sign-in__icon" src={vkontakte} alt="ВКонтакте" />
					</button>
				</li>
			</ul>
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

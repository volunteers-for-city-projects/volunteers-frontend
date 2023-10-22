import React from 'react';
import PropTypes from 'prop-types';
import './PasswordReset.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import {
	ERROR_MESSAGE_REQUIRED,
	ERROR_MESSAGE_PASSWORD_MIN,
	ERROR_MESSAGE_PASSWORD_MAX,
} from '../../utils/constants';

function PasswordReset({ title, subtitle, buttonSubmitText, onSaveChanges }) {
	const isLoading = false;
	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			userPassword: '',
			passwordConfirm: '',
		},
		validationSchema: Yup.object({
			userPassword: Yup.string()
				.min(5, ERROR_MESSAGE_PASSWORD_MIN)
				.max(20, ERROR_MESSAGE_PASSWORD_MAX)
				.required(ERROR_MESSAGE_REQUIRED),
			userPasswordConfirm: Yup.string()
				.min(5, ERROR_MESSAGE_PASSWORD_MIN)
				.max(20, ERROR_MESSAGE_PASSWORD_MAX)
				.required(ERROR_MESSAGE_REQUIRED),
		}),

		onSubmit: (values) => {
			onSaveChanges({
				password: values.userPassword,
				passwordConfirm: values.userPasswordConfirm,
			});
		},
	});

	return (
		<section className="password-reset">
			<h1 className="password-reset__header-title">{title}</h1>
			<p className="password-reset__header-text">{subtitle}</p>
			<form
				name="passwordReset"
				onSubmit={formik.handleSubmit}
				className="password-reset__form"
			>
				<div className="password-reset__inputs">
					<label className="password-reset__label" htmlFor="userPassword">
						Новый пароль*
						<input
							type="password"
							placeholder="Пароль"
							className="password-reset__input"
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
							<div className="password-reset__input-error">
								{formik.errors.userPassword}
							</div>
						) : null}
					</label>

					<label
						className="password-reset__label"
						htmlFor="userPasswordConfirm"
					>
						Новый пароль (повторно)*
						<input
							type="password"
							placeholder="Пароль"
							className="password-reset__input"
							id="userPasswordConfirm"
							name="userPasswordConfirm"
							minLength="5"
							maxLength="20"
							value={formik.values.userPasswordConfirm}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							disabled={isLoading}
							required
						/>
						{formik.touched.userPasswordConfirm &&
						formik.errors.userPasswordConfirm ? (
							<div className="password-reset__input-error">
								{formik.errors.userPasswordConfirm}
							</div>
						) : null}
					</label>
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
PasswordReset.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	buttonSubmitText: PropTypes.string,
	onSaveChanges: PropTypes.func,
};

PasswordReset.defaultProps = {
	title: 'Сброс пароля',
	subtitle: 'Введите новый пароль',
	buttonSubmitText: 'Сохранить изменения',
	onSaveChanges: PropTypes.func,
};

export default PasswordReset;

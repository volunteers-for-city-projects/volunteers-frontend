import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import './FormRequest.scss';
import clsx from 'clsx';
import InputRequest from '../InputRequest/InputRequest';

function FormRequest({ handleSendMessage }) {
	const [isFocus, setIsFocus] = useState(true);
	const RequestSchema = Yup.object().shape({
		message: Yup.string()
			.min(10, 'Длина поля от 10 до 750 символов')
			.max(750, 'Длина поля от 10 до 750 символов')
			.required('Поле обязательно для заполнения'),
		firstName: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите имя кириллицей')
			.required('Поле обязательно для заполнения'),
		phone: Yup.string()
			.matches(
				/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
				'Введите корректный телефон'
			)
			.required('Поле обязательно для заполнения'),
		email: Yup.string()
			.min(5, 'Длина поля от 5 до 256 символов')
			.max(256, 'Длина поля от 5 до 256 символов')
			.matches(
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				'Проверьте правильность email адреса'
			)
			.required('Поле обязательно для заполнения'),
	});

	const handleSubmit = (values, { resetForm }) => {
		const formattedPhone = values.phone
			.replaceAll('-', '')
			.replaceAll(' ', '')
			.replaceAll('(', '')
			.replaceAll(')', '');

		handleSendMessage(
			{
				name: values.firstName,
				phone: formattedPhone,
				email: values.email,
				text: values.message,
			},
			{ resetForm }
		);
	};

	return (
		<section className="request" id="request">
			<h2 className="request__title">Связаться c нами</h2>
			<Formik
				initialValues={{
					message: '',
					firstName: '',
					phone: '',
					email: '',
				}}
				validationSchema={RequestSchema}
				onSubmit={handleSubmit}
			>
				{({ handleChange, values, errors, touched, submitCount }) => (
					<Form className="form-request" name="form-request">
						<div>
							<textarea
								className={clsx('form-request__textarea', {
									'form-request__textarea_error':
										(!isFocus && errors.message) ||
										(submitCount === 1 && errors.message),
								})}
								name="message"
								cols="93"
								rows="14"
								placeholder="Введете сообщение для менеджера"
								value={values.message}
								onChange={handleChange}
								onBlur={() => {
									setIsFocus(false);
								}}
							>
								{values.message}
							</textarea>
							<p className="form-request__error">
								{(!isFocus && errors.message) ||
									(submitCount === 1 && errors.message && errors.message)}
							</p>
						</div>
						<div className="form-request__inputs">
							<InputRequest
								name="firstName"
								type="text"
								htmlFor="firstName"
								label="Имя*"
								placeholder="Введите ваше имя"
								value={values.firstName}
								error={errors.firstName}
								handleChange={handleChange}
								touched={touched.firstName}
								submitCount={submitCount}
							/>
							<InputRequest
								name="phone"
								type="text"
								htmlFor="phone"
								label="Телефон*"
								placeholder="Введите ваш номер телефона"
								value={values.phone}
								error={errors.phone}
								handleChange={handleChange}
								isMask
								touched={touched.phone}
								submitCount={submitCount}
							/>
							<InputRequest
								name="email"
								type="text"
								htmlFor="email"
								label="Emai*"
								placeholder="Введите ваш email"
								value={values.email}
								error={errors.email}
								handleChange={handleChange}
								touched={touched.email}
								submitCount={submitCount}
							/>
							<button className="form-request__button" type="submit">
								Оставить заявку
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</section>
	);
}

FormRequest.propTypes = {
	handleSendMessage: PropTypes.func.isRequired,
};

export default FormRequest;

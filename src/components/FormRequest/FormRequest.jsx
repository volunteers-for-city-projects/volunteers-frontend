import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import './FormRequest.scss';
import clsx from 'clsx';
import InputRequest from '../InputRequest/InputRequest';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import PopupWindow from '../PopupWindow/PopupWindow';

function FormRequest({ handleSendMessage, popup }) {
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
			<div className="request__container">
				<div className="request__container-title">
					<h2 className="request__title">Связаться c нами</h2>
					<p className="request__subtitle">
						Если у вас остались вопросы, вы можете связаться с нами через форму
						обратной связи и мы обязательно ответим вам в течении трех дней
					</p>
				</div>
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
							<div className="form-request__container-textarea">
								<p className="form-request__textarea-label">Сообщение*</p>
								<textarea
									className={clsx('form-request__textarea', {
										'form-request__textarea_error':
											(!isFocus && errors.message) ||
											(submitCount >= 1 && errors.message),
									})}
									name="message"
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
									{((!isFocus && errors.message) ||
										(submitCount >= 1 && errors.message)) &&
										errors.message}
								</p>
							</div>
							<div className="form-request__inputs">
								<div className="form-request__inputs-fields">
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
								</div>
								<Pushbutton
									label="Оставить заявку"
									backgroundColor="#A6C94F"
									size="large-var"
									border="none"
									color="#FFF"
									type="submit"
									disabled={popup.isOpen}
								/>
							</div>
						</Form>
					)}
				</Formik>
				{popup.isOpen &&
					createPortal(
						<PopupWindow
							text={popup.text}
							type={popup.type}
							isOpen={popup.isOpen}
						/>,
						document.querySelector('.request__container')
					)}
			</div>
		</section>
	);
}

FormRequest.propTypes = {
	handleSendMessage: PropTypes.func.isRequired,
	popup: PropTypes.shape({
		isOpen: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	}).isRequired,
};

export default FormRequest;

import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import './FormRequest.scss';
import clsx from 'clsx';
import RequestFormSchema from '../../utils/validationSchemas/RequestFormSchema';
import InputRequest from '../InputRequest/InputRequest';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import PopupWindow from '../PopupWindow/PopupWindow';
import CheckboxConfirm from '../CheckboxConfirm/CheckboxConfirm';

function FormRequest({ handleSendMessage, popup }) {
	const apiKey = process.env.REACT_APP_SECRET_KEY_RECAPTCHA;
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [isReCaptchaChecked, setIsReCaptchaChecked] = useState(false);
	const [isReCaptchaOpen, setIsReCaptchaOpen] = useState(false);
	const recaptchaRef = useRef(null);
	const [isFocus, setIsFocus] = useState(true);

	const handleCheckboxClick = () => {
		setIsCheckboxChecked(!isCheckboxChecked);
	};

	const handleResetRecaptcha = () => {
		if (recaptchaRef.current) {
			recaptchaRef.current.reset();
		}
	};

	const handleReCaptchaClick = () => {
		setIsReCaptchaChecked(true);
	};

	const handleSubmit = (values, { resetForm }) => {
		if (isReCaptchaChecked) {
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
			handleResetRecaptcha();
			setIsReCaptchaChecked(false);
			setIsCheckboxChecked(false);
			setIsReCaptchaOpen(false);
		} else {
			setIsReCaptchaOpen(true);
		}
	};

	return (
		<section className="request">
			<div className="request__container">
				<div className="request__container-title">
					<h2 className="request__title" id="request">
						Связаться c нами
					</h2>
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
					validationSchema={RequestFormSchema}
					onSubmit={handleSubmit}
				>
					{({
						handleChange,
						values,
						errors,
						touched,
						submitCount,
						setFieldValue,
						isValid,
					}) => (
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
										setFieldValue('message', values.message.trim());
									}}
								>
									{values.message}
								</textarea>
								<p className="form-request__error">
									{((!isFocus && errors.message) ||
										(submitCount >= 1 && errors.message)) &&
										errors.message}
								</p>
								<ReCAPTCHA
									sitekey={apiKey}
									ref={recaptchaRef}
									onChange={handleReCaptchaClick}
									className={clsx('recaptcha', {
										recaptcha_active: isReCaptchaOpen,
									})}
								/>
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
										setFieldValue={setFieldValue}
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
										setFieldValue={setFieldValue}
									/>
									<InputRequest
										name="email"
										type="text"
										htmlFor="email"
										label="Email*"
										placeholder="Введите ваш email"
										value={values.email}
										error={errors.email}
										handleChange={handleChange}
										touched={touched.email}
										submitCount={submitCount}
										setFieldValue={setFieldValue}
									/>
								</div>
								<Pushbutton
									label="Оставить заявку"
									backgroundColor="#A6C94F"
									size="large-var"
									border="none"
									color="#FFF"
									type="submit"
									disabled={
										popup.isOpen ||
										!isValid ||
										!isCheckboxChecked ||
										(isReCaptchaOpen && !isReCaptchaChecked)
									}
								/>
								<CheckboxConfirm
									onClick={handleCheckboxClick}
									checked={isCheckboxChecked}
									name="checkbox-confirm"
									htmlFor="checkbox-confirm"
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

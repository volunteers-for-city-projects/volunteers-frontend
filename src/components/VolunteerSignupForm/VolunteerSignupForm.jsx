import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import './VolunteerSignupForm.scss';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import { Pushbutton } from '../Pushbutton/Pushbutton';

export default function VolunteerSignupForm({ onSubmit, ...restProps }) {
	const VolunteerSignupFormSchema = Yup.object().shape({
		firstname: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите имя кириллицей')
			.required('Поле обязательно для заполнения'),
		secondname: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите фамилию кириллицей')
			.required('Поле обязательно для заполнения'),
		thirdname: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите отчество кириллицей')
			.required('Поле обязательно для заполнения'),
		birthday: Yup.string()
			.min(10, 'Введите корректную дату')
			.max(10, 'Введите корректную дату')
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
				'Для регистрации вам должно быть не менее 18 лет'
			)
			.test('age', 'Вам должно быть 18 лет или старше', (value) => {
				const birthdate = moment(value, 'DD.MM.YYYY');
				const today = moment();
				return today.diff(birthdate, 'years') >= 18;
			})
			.required('Поле обязательно для заполнения'),
		phone: Yup.string()
			.matches(
				/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
				'Введите корректный телефон'
			)
			.required('Поле обязательно для заполнения'),
		email: Yup.string()
			.required('Поле обязательно для заполнения')
			.min(5, 'Длина поля от 5 до 256 символов')
			.max(256, 'Длина поля от 5 до 256 символов')
			.matches(
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				'Проверьте правильность email адреса'
			),
		telegram: Yup.string()
			.min(5, 'Длина поля от 5 до 32 символов')
			.max(32, 'Длина поля от 5 до 32 символов')
			.matches(/^[а-яА-ЯёЁ_]{5,32}$/, 'Введите корректный username'),
		password: Yup.string()
			.required('Поле обязательно для заполнения')
			.min(8, 'Длина поля от 8 до 20 символов')
			.max(20, 'Длина поля от 8 до 20 символов')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
				'Пароль должен содержать латинские и кириллические буквы, цифры и спецсимволы'
			)
			.oneOf([Yup.ref('confirm_password'), null], 'Пароли не совпадают'),
		confirm_password: Yup.string()
			.required('Поле обязательно для заполнения')
			.min(8, 'Длина поля от 8 до 20 символов')
			.max(20, 'Длина поля от 8 до 20 символов')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
				'Пароль должен содержать латинские и кириллические буквы, цифры и спецсимволы'
			)
			.oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
	});

	const handleSubmit = (values) => {
		console.log('Данные формы:', values);
	};

	return (
		<Formik
			initialValues={{
				firstname: '',
				secondname: '',
				thirdname: '',
				birthday: '',
				phone: '',
				email: '',
				telegram: '',
				password: '',
				confirm_password: '',
			}}
			validationSchema={VolunteerSignupFormSchema}
			onSubmit={handleSubmit}
		>
			{({ handleChange, values, errors, touched, submitCount }) => (
				<Form
					action="#"
					method="post"
					className="volunteer-signup-form"
					name="volunteer-auth-form"
					noValidate
					errors={errors}
					onSubmit={handleSubmit}
					{...restProps}
				>
					<InputGroup title="Общая информация">
						<Input
							name="firstname"
							label="Имя"
							type="text"
							placeholder="Пётр"
							inputSize="small"
							error={errors.firstname}
							touched={touched.firstname}
							value={values.firstname}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="secondname"
							label="Фамилия"
							type="text"
							placeholder="Иванов"
							inputSize="small"
							error={errors.secondname}
							touched={touched.secondname}
							value={values.secondname}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="thirdname"
							type="text"
							label="Отчество"
							placeholder="Сергеевич"
							inputSize="small"
							error={errors.thirdname}
							touched={touched.thirdname}
							value={values.thirdname}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="birthday"
							label="Дата рождения"
							type="text-date"
							placeholder="01.02.2010"
							data-default="2019-12-31"
							inputSize="small"
							error={errors.birthday}
							touched={touched.birthday}
							value={values.birthday}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
					</InputGroup>
					<InputGroup title="Контактные данные">
						<Input
							name="phone"
							label="Телефон"
							type="phone"
							placeholder="+7 977 000-00-00"
							inputSize="small"
							error={errors.phone}
							touched={touched.phone}
							value={values.phone}
							handleChange={handleChange}
							submitCount={submitCount}
						/>
						<Input
							name="email"
							label="E-mail"
							type="email"
							placeholder="example@email.ru"
							inputSize="small"
							error={errors.email}
							touched={touched.email}
							value={values.email}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="telegram"
							label="Telegram"
							type="text"
							placeholder="@name"
							inputSize="small"
							error={errors.telegram}
							touched={touched.telegram}
							value={values.telegram}
							handleChange={handleChange}
							submitCount={submitCount}
						/>
					</InputGroup>
					<InputGroup title="Пароль">
						<Input
							name="password"
							label="Пароль"
							type="password"
							placeholder=""
							inputSize="small"
							error={errors.password}
							touched={touched.password}
							value={values.password}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="confirm_password"
							label="Повтор пароля"
							type="password"
							placeholder=""
							inputSize="small"
							error={errors.confirm_password}
							touched={touched.confirm_password}
							value={values.confirm_password}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
					</InputGroup>
					<InputGroup title="Фото">
						<Input name="photo" label="" type="file" inputSize="photo" />
					</InputGroup>
					<InputGroup title="Дополнительная информация">
						<Input
							name="skills"
							label="Навыки"
							type="text"
							placeholder="Выберите навыки"
							inputSize="small"
							required
						/>
						<Input
							name="city"
							label="Город"
							type="text"
							placeholder="Выберите город"
							inputSize="small"
							required
						/>
					</InputGroup>
					<div className=" volunteer-signup-form__text-content">
						<Pushbutton
							label="Зарегистрироваться"
							color="white"
							size="medium"
						/>
						<p className="volunteer-signup-form__text">
							Нажимая кнопку «Отправить данные», я подтверждаю, что мне
							исполнилось 18 лет, и соглашаюсь с Политикой конфиденциальности
						</p>
						<label
							htmlFor="volunteer-signup-form"
							className="volunteer-signup-form__text"
						>
							<input
								id="volunteer-signup-form"
								name="volunteer-signup-form"
								type="checkbox"
								className="volunteer-signup-form__input"
							/>
							Даю согласие на обработку моих персональных данных
						</label>
					</div>
				</Form>
			)}
		</Formik>
	);
}

VolunteerSignupForm.propTypes = {
	onSubmit: PropTypes.func,
};

VolunteerSignupForm.defaultProps = {
	onSubmit: () => {},
};

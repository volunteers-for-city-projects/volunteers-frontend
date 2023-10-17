import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './OrganizerSignupForm.scss';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import InputTextArea from '../InputTextArea/InputTextArea';
import { Pushbutton } from '../Pushbutton/Pushbutton';

export default function OrganizerSignupForm({ onSubmit, ...restProps }) {
	const OrganizerSignupFormSchema = Yup.object().shape({
		organization: Yup.string()
			.trim()
			.required('Поле обязательно для заполнения')
			.matches(/^[А-Яа-яёЁ0-9\s\-.,&+!№]+$/, {
				message: 'Введите название кириллицей',
				excludeEmptyString: true,
			})
			.min(2, 'Длина поля от 2 до 50 символов')
			.max(50, 'Длина поля от 2 до 50 символов'),
		about_organization: Yup.string()
			.trim()
			.required('Поле обязательно для заполнения')
			.matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-!@#$%^&*(),.?":{}|<>]+$/, {
				message: 'Введите корректное значение',
				excludeEmptyString: true,
			})
			.min(10, 'Длина поля от 10 до 750 символов')
			.max(750, 'Длина поля от 10 до 750 символов'),
		organize_firstname: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите имя кириллицей')
			.required('Поле обязательно для заполнения'),
		organize_secondname: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите фамилию кириллицей')
			.required('Поле обязательно для заполнения'),
		organize_thirdname: Yup.string()
			.min(2, 'Длина поля от 2 до 40 символов')
			.max(40, 'Длина поля от 2 до 40 символов')
			.matches(/^[А-Яа-яЁё\s-]+$/, 'Введите отчество кириллицей')
			.required('Поле обязательно для заполнения'),
		organize_phone: Yup.string()
			.matches(
				/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
				'Введите корректный телефон'
			)
			.required('Поле обязательно для заполнения'),
		organize_email: Yup.string()
			.required('Поле обязательно для заполнения')
			.min(5, 'Длина поля от 5 до 256 символов')
			.max(256, 'Длина поля от 5 до 256 символов')
			.matches(
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				'Проверьте правильность email адреса'
			),
		organize_ogrn: Yup.string()
			.trim()
			.matches(/^\d{13}$/, {
				message: 'ОГРН должен состоять из 13 символов',
				excludeEmptyString: true,
			})
			.matches(/^[0-9]+$/, {
				message: 'ОГРН должен состоять только из цифр',
				excludeEmptyString: true,
			})
			.required('Поле обязательно для заполнения'),
		organize_password: Yup.string()
			.required('Поле обязательно для заполнения')
			.min(8, 'Длина поля от 8 до 20 символов')
			.max(20, 'Длина поля от 8 до 20 символов')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
				'Пароль должен содержать латинские и кириллические буквы, цифры и спецсимволы'
			)
			.oneOf(
				[Yup.ref('organize_confirm_password'), null],
				'Пароли не совпадают'
			),
		organize_confirm_password: Yup.string()
			.required('Поле обязательно для заполнения')
			.min(8, 'Длина поля от 8 до 20 символов')
			.max(20, 'Длина поля от 8 до 20 символов')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
				'Пароль должен содержать латинские и кириллические буквы, цифры и спецсимволы'
			)
			.oneOf([Yup.ref('organize_password'), null], 'Пароли не совпадают'),
	});

	const handleSubmit = (values) => {
		console.log('Данные формы:', values);
	};

	return (
		<Formik
			initialValues={{
				organization: '',
				about_organization: '',
				organize_city: '',
				organize_firstname: '',
				organize_secondname: '',
				organize_thirdname: '',
				birthday: '',
				organize_phone: '',
				organize_email: '',
				organize_ogrn: '',
				organize_password: '',
				organize_confirm_password: '',
			}}
			validationSchema={OrganizerSignupFormSchema}
			onSubmit={handleSubmit}
		>
			{({ handleChange, values, errors, touched, submitCount }) => (
				<Form
					action="#"
					method="post"
					className="organizer-signup-form"
					name="organizer-auth-form"
					noValidate
					onSubmit={onSubmit}
					{...restProps}
				>
					<InputGroup title="Общая информация">
						<Input
							name="organization"
							label="Название организации"
							type="text"
							placeholder=""
							inputSize="small"
							error={errors.organization}
							touched={touched.organization}
							value={values.organization}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="organize_city"
							label="Город"
							type="text"
							placeholder=""
							inputSize="small"
							error={errors.organize_city}
							touched={touched.organize_city}
							value={values.organize_city}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
					</InputGroup>
					<InputTextArea
						label="Об организации"
						name="about_organization"
						placeholder="Расскажите коротко об организации"
						error={errors.about_organization}
						touched={touched.about_organization}
						value={values.about_organization}
						handleChange={handleChange}
						submitCount={submitCount}
					/>
					<InputGroup title="Контактные данные представителя компании">
						<Input
							name="organize_firstname"
							label="Имя"
							type="text"
							placeholder="Пётр"
							inputSize="small"
							error={errors.organize_firstname}
							touched={touched.organize_firstname}
							value={values.organize_firstname}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="organize_secondname"
							label="Фамилия"
							type="text"
							placeholder="Иванов"
							inputSize="small"
							error={errors.organize_secondname}
							touched={touched.organize_secondname}
							value={values.organize_secondname}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="organize_thirdname"
							type="text"
							label="Отчество"
							placeholder="Сергеевич"
							inputSize="small"
							error={errors.organize_thirdname}
							touched={touched.organize_thirdname}
							value={values.organize_thirdname}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="organize_email"
							label="E-mail"
							type="text"
							placeholder="example@mail.ru"
							inputSize="small"
							error={errors.organize_email}
							touched={touched.organize_email}
							value={values.organize_email}
							handleChange={handleChange}
							required
						/>
						<Input
							name="organize_phone"
							label="Телефон"
							type="text"
							placeholder="+7 977 000-00-00"
							inputSize="small"
							error={errors.organize_phone}
							touched={touched.organize_phone}
							value={values.organize_phone}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
					</InputGroup>
					<InputGroup title="Дополнительная информация">
						<Input
							name="organize_ogrn"
							label="ОГРН"
							type="text"
							placeholder=""
							inputSize="small"
							error={errors.organize_ogrn}
							touched={touched.organize_ogrn}
							value={values.organize_ogrn}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
					</InputGroup>
					<InputGroup title="Пароль">
						<Input
							name="organize_password"
							label="Пароль"
							type="password"
							placeholder=""
							inputSize="small"
							error={errors.organize_password}
							touched={touched.organize_password}
							value={values.organize_password}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
						<Input
							name="organize_confirm_password"
							label="Повтор пароля"
							type="password"
							placeholder=""
							inputSize="small"
							error={errors.organize_confirm_password}
							touched={touched.organize_confirm_password}
							value={values.organize_confirm_password}
							handleChange={handleChange}
							submitCount={submitCount}
							required
						/>
					</InputGroup>
					<div className=" organizer-signup-form__text-content">
						<Pushbutton
							label="Зарегистрироваться"
							color="white"
							size="medium"
						/>
						<p className="organizer-signup-form__text">
							Нажимая кнопку «Отправить данные», я подтверждаю, что мне
							исполнилось 18 лет, и соглашаюсь с Политикой конфиденциальности
						</p>
						<label
							htmlFor="organizer-signup-form"
							className="organizer-signup-form__text"
						>
							<input
								id="organizer-signup-form"
								name="organizer-signup-form"
								type="checkbox"
								className="organizer-signup-form__input"
							/>
							Даю согласие на обработку моих персональных данных
						</label>
					</div>
				</Form>
			)}
		</Formik>
	);
}

OrganizerSignupForm.propTypes = {
	onSubmit: PropTypes.func,
};

OrganizerSignupForm.defaultProps = {
	onSubmit: () => {},
};

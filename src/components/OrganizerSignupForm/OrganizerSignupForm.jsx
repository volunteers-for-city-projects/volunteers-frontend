import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './OrganizerSignupForm.scss';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import InputTextArea from '../InputTextArea/InputTextArea';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import { createOrganization } from '../../utils/api/signupApi';

export default function OrganizerSignupForm({ onSubmit, ...restProps }) {
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	const OrganizerSignupFormSchema = Yup.object({
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
			.matches(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-!@#$%^&*(),.?":{}|<>]+$/, {
				message: 'Введите корректное значение',
				excludeEmptyString: true,
			})
			.min(10, 'Длина поля от 10 до 750 символов')
			.max(750, 'Длина поля от 10 до 750 символов')
			.required('Поле обязательно для заполнения'),
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

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			organization: '',
			about_organization: '',
			organize_city: '',
			organize_firstname: '',
			organize_secondname: '',
			organize_thirdname: '',
			organize_phone: '',
			organize_email: '',
			organize_ogrn: '',
			organize_password: '',
			organize_confirm_password: '',
		},
		validationSchema: OrganizerSignupFormSchema,
		onSubmit: async (values) => {
			// функция для конверсии номера телефона из инпута в формат телефона на сервере
			const getDigitsOnly = (phoneNumber) => phoneNumber.replace(/\D/g, '');
			const formattedPhone = `+${getDigitsOnly(values.organize_phone)}`;

			try {
				const organizationResponse = await createOrganization({
					contact_person: {
						email: values.organize_email,
						first_name: values.organize_firstname,
						last_name: values.organize_thirdname,
						password: values.organize_password,
						second_name: values.organize_secondname,
					},
					title: values.organization,
					ogrn: values.organize_ogrn,
					phone: formattedPhone,
					about: values.about_organization || '',
					city: 1,
				});

				// eslint-disable-next-line no-console
				console.log('Volunteer created:', organizationResponse);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Failed to create user and/or volunteer:', error.message);
			}
		},
	});

	const handleCheckboxClick = () => {
		setIsCheckboxChecked(!isCheckboxChecked);
	};
	return (
		<form
			action="#"
			method="post"
			className="organizer-signup-form"
			name="organizer-auth-form"
			onSubmit={formik.handleSubmit}
			{...restProps}
		>
			<InputGroup title="Общая информация">
				<Input
					name="organization"
					label="Название организации"
					type="text"
					placeholder=""
					inputSize="small"
					error={formik.errors.organization}
					touched={formik.touched.organization}
					value={formik.values.organization}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					name="organize_city"
					label="Город"
					type="text"
					placeholder=""
					inputSize="small"
					error={formik.errors.organize_city}
					touched={formik.touched.organize_city}
					value={formik.values.organize_city}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
			</InputGroup>
			<InputTextArea
				label="Об организации"
				name="about_organization"
				placeholder="Расскажите коротко об организации"
				error={formik.errors.about_organization}
				touched={formik.touched.about_organization}
				value={formik.values.about_organization}
				handleChange={formik.handleChange}
				submitCount={formik.submitCount}
				required
			/>
			<InputGroup title="Контактные данные представителя компании">
				<Input
					name="organize_secondname"
					label="Фамилия"
					type="text"
					placeholder="Иванов"
					inputSize="small"
					error={formik.errors.organize_secondname}
					touched={formik.touched.organize_secondname}
					value={formik.values.organize_secondname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					name="organize_firstname"
					label="Имя"
					type="text"
					placeholder="Пётр"
					inputSize="small"
					error={formik.errors.organize_firstname}
					touched={formik.touched.organize_firstname}
					value={formik.values.organize_firstname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					name="organize_thirdname"
					type="text"
					label="Отчество"
					placeholder="Сергеевич"
					inputSize="small"
					error={formik.errors.organize_thirdname}
					touched={formik.touched.organize_thirdname}
					value={formik.values.organize_thirdname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					name="organize_email"
					label="E-mail"
					type="text"
					placeholder="example@mail.ru"
					inputSize="small"
					error={formik.errors.organize_email}
					touched={formik.touched.organize_email}
					value={formik.values.organize_email}
					handleChange={formik.handleChange}
					required
				/>
				<Input
					name="organize_phone"
					label="Телефон"
					type="organize_phone"
					placeholder="+7 977 000-00-00"
					inputSize="small"
					error={formik.errors.organize_phone}
					touched={formik.touched.organize_phone}
					value={formik.values.organize_phone}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
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
					error={formik.errors.organize_ogrn}
					touched={formik.touched.organize_ogrn}
					value={formik.values.organize_ogrn}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
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
					error={formik.errors.organize_password}
					touched={formik.touched.organize_password}
					value={formik.values.organize_password}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					name="organize_confirm_password"
					label="Повтор пароля"
					type="password"
					placeholder=""
					inputSize="small"
					error={formik.errors.organize_confirm_password}
					touched={formik.touched.organize_confirm_password}
					value={formik.values.organize_confirm_password}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
			</InputGroup>
			<div className=" organizer-signup-form__text-content">
				<Pushbutton
					label="Зарегистрироваться"
					color="white"
					size="medium"
					disabled={!formik.isValid || !isCheckboxChecked}
					type="submit"
				/>
				<p className="organizer-signup-form__text">
					Нажимая кнопку «Отправить данные», я подтверждаю, что мне исполнилось
					18 лет, и соглашаюсь с Политикой конфиденциальности
				</p>
				<label
					htmlFor="organizer-signup-form-checkbox"
					className="organizer-signup-form__text"
				>
					<input
						id="organizer-signup-form-checkbox"
						name="organizer-signup-form"
						type="checkbox"
						className="organizer-signup-form__checkbox"
						onClick={handleCheckboxClick}
					/>
					Даю согласие на обработку моих персональных данных
				</label>
			</div>
		</form>
	);
}

OrganizerSignupForm.propTypes = {
	onSubmit: PropTypes.func,
};

OrganizerSignupForm.defaultProps = {
	onSubmit: () => {},
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import './OrganizerSignupForm.scss';

import { useOutletContext } from 'react-router-dom';

import { InputMask } from '@react-input/mask';
import { phoneMask } from '../../utils/inputsMasks/phoneMask';
import { ogrnMask } from '../../utils/inputsMasks/ogrnMask';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import InputTextArea from '../InputTextArea/InputTextArea';
import UploadFile from '../UploadFile/UploadFile';

import SelectOption from '../SelectOption/SelectOption';
import { OrganizerSignupFormSchema } from '../../utils/validationSchemas/OrganizerSignupFormSchema';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import { createOrganization } from '../../utils/api/signupApi';
import CheckboxConfirm from '../CheckboxConfirm/CheckboxConfirm';

export default function OrganizerSignupForm({ onSubmit, ...restProps }) {
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	const { setModal, cities } = useOutletContext();

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			organization: '',
			about_organization: '',
			organize_city: null,
			organize_firstname: '',
			organize_lastname: '',
			organize_secondname: '',
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
			let formattedPhone = getDigitsOnly(values.organize_phone);
			if (formattedPhone.startsWith('8')) {
				formattedPhone = `7${formattedPhone.slice(1)}`;
			}

			try {
				await createOrganization({
					contact_person: {
						email: values.organize_email,
						first_name: values.organize_firstname,
						last_name: values.organize_lastname,
						password: values.organize_password,
						second_name: values.organize_secondname,
					},
					title: values.organization,
					ogrn: values.organize_ogrn.replace(/-/g, ''),
					phone:
						(formattedPhone.length > 1 && `+${formattedPhone}`) ||
						formattedPhone,
					about: values.about_organization || '' || undefined,
					city: values.organize_city[0].value,
					photo: values.photo || '',
				});

				setModal({
					isOpen: true,
					type: 'email',
					state: 'info',
					title: 'Подтверждение E-mail',
					emailprop: values.organize_email,
					onSubmit: (event) => {
						event.preventDefault();
						// ожидаем  api/auth/resend_activation
					},
				});
			} catch (error) {
				if (Array.isArray(error)) {
					setModal({
						isOpen: true,
						type: 'error',
						state: 'info',
						title: 'Произошла ошибка',
						errorArray: error,
					});
				} else {
					console.error(error);
				}
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
					id="organization"
					name="organization"
					label="Название организации"
					type="text"
					placeholder="ООО «Ромашка»"
					inputSize="small"
					error={formik.errors.organization}
					touched={formik.touched.organization}
					value={formik.values.organization}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<SelectOption
					id="organize_city"
					name="organize_city"
					label="Город"
					placeholder="Выберите город"
					options={cities}
					touched={formik.touched.organize_city}
					value={formik.values.organize_city}
					handleChange={(selectedOption) => {
						formik.setFieldValue('organize_city', [
							{
								label: selectedOption.label,
								value: selectedOption.value,
							},
						]);
					}}
					required
				/>
				<InputMask
					component={Input}
					mask="_-__-__-__-_____-_"
					replacement={{ _: /\d/ }}
					modify={ogrnMask}
					label="ОГРН"
					type="text"
					placeholder="1-02-66-05-60662-0"
					inputSize="small"
					id="organize_ogrn"
					name="organize_ogrn"
					error={formik.errors.organize_ogrn}
					touched={formik.touched.organize_ogrn}
					value={formik.values.organize_ogrn}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
				/>
			</InputGroup>
			<InputTextArea
				id="about_organization"
				name="about_organization"
				label="Об организации"
				placeholder="Расскажите коротко об организации"
				error={formik.errors.about_organization}
				touched={formik.touched.about_organization}
				value={formik.values.about_organization}
				handleChange={formik.handleChange}
				submitCount={formik.submitCount}
			/>
			<InputGroup title="Фото">
				<UploadFile
					id="photo"
					name="photo"
					label=""
					type="file"
					value={formik.values.confirm_password}
					error={formik.errors.photo}
					setFieldValue={formik.setFieldValue}
					setFieldError={formik.setFieldError}
				/>
			</InputGroup>

			<InputGroup title="Контактные данные представителя компании">
				<Input
					id="organize_firstname"
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
					id="organize_secondname"
					name="organize_secondname"
					type="text"
					label="Отчество"
					placeholder="Сергеевич"
					inputSize="small"
					error={formik.errors.organize_secondname}
					touched={formik.touched.organize_secondname}
					value={formik.values.organize_secondname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					id="organize_lastname"
					name="organize_lastname"
					label="Фамилия"
					type="text"
					placeholder="Иванов"
					inputSize="small"
					error={formik.errors.organize_lastname}
					touched={formik.touched.organize_lastname}
					value={formik.values.organize_lastname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					id="organize_email"
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
				<InputMask
					component={Input}
					mask="+_ (___) ___-__-__"
					replacement={{ _: /\d/ }}
					modify={phoneMask}
					id="organize_phone"
					name="organize_phone"
					label="Телефон"
					type="text"
					placeholder="+7 789 000-00-00"
					inputSize="small"
					error={formik.errors.organize_phone}
					touched={formik.touched.organize_phone}
					value={formik.values.organize_phone}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
				/>
			</InputGroup>
			<InputGroup title="Пароль">
				<Input
					id="organize_password"
					name="organize_password"
					label="Пароль"
					type="text"
					placeholder="Пароль"
					inputSize="small"
					error={formik.errors.organize_password}
					touched={formik.touched.organize_password}
					value={formik.values.organize_password}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					id="organize_confirm_password"
					name="organize_confirm_password"
					label="Повторный пароль"
					type="text"
					placeholder="Повторный пароль"
					inputSize="small"
					error={formik.errors.organize_confirm_password}
					touched={formik.touched.organize_confirm_password}
					value={formik.values.organize_confirm_password}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
			</InputGroup>
			<div className="organizer-signup-form__text-content">
				<Pushbutton
					label="Зарегистрироваться"
					color="white"
					backgroundColor="#A6C94F"
					border="1px solid #A6C94F"
					size="pre-large"
					disabled={
						!formik.isValid || !isCheckboxChecked || formik.values.city === null
					}
					type="submit"
				/>
				<CheckboxConfirm
					onClick={handleCheckboxClick}
					name="organizer-signup-form"
					htmlFor="organizer-signup-form-checkbox"
					checked={isCheckboxChecked}
				/>
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import './OrganizerSignupForm.scss';

import { useOutletContext } from 'react-router-dom';
import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import InputTextArea from '../InputTextArea/InputTextArea';
import SelectOption from '../SelectOption/SelectOption';
import { OrganizerSignupFormSchema } from '../../utils/validationSchemas/OrganizerSignupFormSchema';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import { createOrganization, getCities } from '../../utils/api/signupApi';

export default function OrganizerSignupForm({ onSubmit, ...restProps }) {
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [cities, setCities] = useState([]);
	const { setModal } = useOutletContext();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const citiesResponse = await getCities();

				const citiesData = citiesResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));

				setCities(citiesData);
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			}
		};

		fetchData();
	}, []);

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
					about: values.about_organization || '' || undefined,
					city: 1,
				});

				console.log('Volunteer created:', organizationResponse);
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
					placeholder=""
					inputSize="small"
					error={formik.errors.organization}
					touched={formik.touched.organization}
					value={formik.values.organization}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<SelectOption
					id="city"
					name="city"
					label="Город"
					placeholder="Выберите город"
					width={400}
					options={cities}
					touched={formik.touched.city}
					value={formik.values.city}
					handleChange={(selectedOption) => {
						formik.setFieldValue('city', Number(selectedOption.value));
					}}
					required
				/>
				<Input
					id="organize_ogrn"
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
			<InputGroup title="Контактные данные представителя компании">
				<Input
					id="organize_secondname"
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
					id="organize_thirdname"
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
					id="organize_empty"
					name="organize_empty"
					label=""
					type="text"
					className="input_empty"
					placeholder="example@mail.ru"
					inputSize="small"
					error={formik.errors.organize_email}
					touched={formik.touched.organize_email}
					value={formik.values.organize_email}
					handleChange={formik.handleChange}
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
				<Input
					id="organize_phone"
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
			<InputGroup title="Пароль">
				<Input
					id="organize_password"
					name="organize_password"
					label="Введите пароль"
					type="password"
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
					type="password"
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
			<div className=" organizer-signup-form__text-content">
				<Pushbutton
					label="Зарегистрироваться"
					color="white"
					size="medium"
					disabled={
						!formik.isValid || !isCheckboxChecked || formik.values.city === null
					}
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

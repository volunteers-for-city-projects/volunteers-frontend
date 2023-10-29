import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import './ProfileOrganizationForm.scss';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import { ProfileVolunteerFormSchema } from '../../utils/validationSchemas/ProfileVolunteerFormSchema';
import {
	// postPhoto,
	createVolunteer,
	getSkills,
	getCities,
} from '../../utils/api/signupApi';
import SelectOption from '../SelectOption/SelectOption';

export default function ProfileOrganizationForm({ onSubmit, ...restProps }) {
	const [cities, setCities] = useState([]);
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const citiesResponse = await getCities();
				const skillsResponse = await getSkills();

				const citiesData = citiesResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));

				const skillsData = skillsResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));

				setCities(citiesData);
				setSkills(skillsData);
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
			profile_volunteer_firstname: '',
			profile_volunteer_secondname: '',
			profile_volunteer_thirdname: '',
			profile_volunteer_phone: '',
			profile_volunteer_telegram: '',
			profile_volunteer_password: '',
			profile_volunteer_confirm_password: '',
			profile_volunteer_photo: '',
			profile_volunteer_skills: [],
			profile_volunteer_city: null,
		},
		validationSchema: ProfileVolunteerFormSchema,
		onSubmit: async (values) => {
			// конверсия номера телефона из инпута в формат телефона на сервере
			const getDigitsOnly = (phoneNumber) => phoneNumber.replace(/\D/g, '');
			const formattedPhone = `${getDigitsOnly(values.phone)}`;

			try {
				await createVolunteer({
					user: {
						first_name: values.firstname,
						second_name: values.secondname,
						last_name: values.thirdname,
						password: values.password,
						re_password: values.confirm_password,
					},
					telegram: values.telegram,
					photo: values.photo || null || '' || undefined,
					phone:
						(formattedPhone.length > 1 && `+${formattedPhone}`) ||
						formattedPhone,
					skills: values.skills || [],
					city: values.city || [] || null || '',
				});
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Failed to create user and/or volunteer:', error.message);
			}
		},
	});

	return (
		<form
			action="#"
			method="post"
			className="volunteer-signup-form"
			name="volunteer-auth-form"
			onSubmit={formik.handleSubmit}
			encType="multipart/form-data"
			{...restProps}
		>
			<InputGroup title="Общая информация">
				<Input
					id="profile_volunteer_firstname"
					name="profile_volunteer_firstname"
					label="Имя"
					type="text"
					placeholder="Пётр"
					inputSize="small"
					error={formik.errors.firstname}
					touched={formik.touched.firstname}
					value={formik.values.firstname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
					required
				/>
				<Input
					id="profile_volunteer_secondname"
					name="profile_volunteer_secondname"
					label="Фамилия"
					type="text"
					placeholder="Иванов"
					inputSize="small"
					error={formik.errors.secondname}
					touched={formik.touched.secondname}
					value={formik.values.secondname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					required
				/>
				<Input
					id="profile_volunteer_thirdname"
					name="profile_volunteer_thirdname"
					type="text"
					label="Отчество"
					placeholder="Сергеевич"
					inputSize="small"
					error={formik.errors.thirdname}
					touched={formik.touched.thirdname}
					value={formik.values.thirdname}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
					required
				/>
			</InputGroup>
			<InputGroup title="Контактные данные">
				<Input
					id="profile_volunteer_phone"
					name="profile_volunteer_phone"
					label="Телефон"
					type="phone"
					placeholder="+7 977 000-00-00"
					inputSize="small"
					error={formik.errors.phone}
					touched={formik.touched.phone}
					value={formik.values.phone}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
				/>
				<Input
					id="profile_volunteer_telegram"
					name="profile_volunteer_telegram"
					label="Telegram"
					type="text"
					placeholder="@name"
					inputSize="small"
					error={formik.errors.telegram}
					touched={formik.touched.telegram}
					value={formik.values.telegram}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
				/>
			</InputGroup>
			<InputGroup title="Пароль">
				<Input
					id="profile_volunteer_password"
					name="profile_volunteer_password"
					label="Введите пароль"
					type="password"
					placeholder="Пароль"
					inputSize="small"
					error={formik.errors.password}
					touched={formik.touched.password}
					value={formik.values.password}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
					required
				/>
				<Input
					id="profile_volunteer_confirm_password"
					name="profile_volunteer_confirm_password"
					label="Повторный пароль"
					type="password"
					placeholder="Повторный пароль"
					inputSize="small"
					error={formik.errors.confirm_password}
					touched={formik.touched.confirm_password}
					value={formik.values.confirm_password}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
					required
				/>
			</InputGroup>
			<InputGroup title="Дополнительная информация">
				<SelectOption
					id="profile_volunteer_skills"
					name="profile_volunteer_skills"
					label="Навыки"
					placeholder="Выберите навыки"
					width={400}
					options={skills}
					isMulti
					value={formik.values.skills}
					touched={formik.touched.skills}
					handleChange={(selectedOption) => {
						const selectedValues = selectedOption.map((option) => option.value);
						formik.setFieldValue('skills', selectedValues);
					}}
					required
				/>
				<SelectOption
					id="profile_volunteer_city"
					name="profile_volunteer_city"
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
			</InputGroup>
			<div className="profile-form__buttons">
				<div className="profile-form__button">
					<Pushbutton
						label="Сохранить изменения"
						color="white"
						size="medium"
						minWidth={399}
						disabled={
							!formik.isValid ||
							formik.values.city === null ||
							formik.values.skills.length === 0
						}
						type="submit"
					/>
				</div>
				<div className="profile-form__button">
					<Pushbutton
						label="Отменить изменения"
						color="white"
						size="medium"
						minWidth={399}
						disabled={
							!formik.isValid ||
							formik.values.city === null ||
							formik.values.skills.length === 0
						}
						type="submit"
					/>
				</div>
			</div>
		</form>
	);
}

ProfileOrganizationForm.propTypes = {
	onSubmit: PropTypes.func,
};

ProfileOrganizationForm.defaultProps = {
	onSubmit: () => {},
};

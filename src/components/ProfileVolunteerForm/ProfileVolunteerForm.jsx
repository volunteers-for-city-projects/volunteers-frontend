import React from 'react';
import PropTypes from 'prop-types';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { InputMask } from '@react-input/mask';
import { phoneMask } from '../../utils/inputsMasks/phoneMask';

import './ProfileVolunteerForm.scss';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import UploadFile from '../UploadFile/UploadFile';
import ProfilePhoto from '../../images/fotoProfile_2.svg';

import { Pushbutton } from '../Pushbutton/Pushbutton';
import { ProfileVolunteerFormSchema } from '../../utils/validationSchemas/ProfileVolunteerFormSchema';
import { updateVolunteer } from '../../utils/api/signupApi';
import SelectOption from '../SelectOption/SelectOption';

export default function ProfileVolunteerForm({ onSubmit, ...restProps }) {
	const navigate = useNavigate();
	const { currentUser, cities, skills } = useOutletContext();
	const {
		firstName,
		lastName,
		secondName,
		city,
		phone,
		userSkills,
		photo,
		telegram,
		id,
	} = currentUser;

	const selectOptionsSkills = userSkills.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const selectOptionsCity = cities
		.filter((item) => item.value === `${city}`)
		.map((item) => ({
			label: item.label,
			value: item.value,
		}));

	const getPhoneNumberMask = (phoneNumber) =>
		phoneNumber &&
		phoneNumber.startsWith('+7') &&
		phoneNumber.length === 12 &&
		phoneNumber.replace(
			/(\+\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
			'+7 ($2) $3-$4-$5'
		);

	const phoneNumberMask = getPhoneNumberMask(phone);

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			profile_volunteer_firstname: firstName,
			profile_volunteer_secondname: secondName,
			profile_volunteer_lastname: lastName,
			profile_volunteer_phone: phoneNumberMask,
			profile_volunteer_telegram: telegram,
			profile_volunteer_photo: photo,
			profile_volunteer_skills: selectOptionsSkills,
			profile_volunteer_city: selectOptionsCity,
		},
		validationSchema: ProfileVolunteerFormSchema,
		onSubmit: async (values) => {
			// конверсия номера телефона из инпута в формат телефона на сервере
			const getDigitsOnly = (phoneNumber) => phoneNumber.replace(/\D/g, '');
			let formattedPhone = getDigitsOnly(values.profile_volunteer_phone);
			if (formattedPhone.startsWith('8')) {
				formattedPhone = `7${formattedPhone.slice(1)}`;
			}

			try {
				updateVolunteer(id, {
					user: {
						first_name: values.profile_volunteer_firstname,
						second_name: values.profile_volunteer_secondname,
						last_name: values.profile_volunteer_lastname,
					},
					telegram: values.profile_volunteer_telegram,
					date_of_birth: '1900-01-01',
					phone:
						(formattedPhone.length > 1 && `+${formattedPhone}`) ||
						formattedPhone,
					photo: values.photo,
					skills: values.profile_volunteer_skills.map((skill) => skill.value),
					city: values.profile_volunteer_city[0].value,
				});
				navigate('..');
				// await handleIsForm();
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Ошибка в обновлении данных волонтера:', error.message);
			}
		},
	});
	return (
		<form
			action="#"
			method="post"
			className="profile-volunteer-form"
			name="profile-volunteer-form"
			onSubmit={formik.handleSubmit}
			encType="multipart/form-data"
			{...restProps}
		>
			<div className="profile-volunteer-form__form-wrap">
				<div className="profile-volunteer-form__photo-wrap">
					<img
						className="profile-volunteer-form__photo"
						src={photo || ProfilePhoto}
						alt="Фотография пользователя"
					/>
					<div className="profile-volunteer-form__text-wrap">
						<p className="profile-volunteer-form__text">
							Загрузить новую фотографию*
						</p>
						<UploadFile
							id="photo"
							name="photo"
							label=""
							type="file"
							className="profile-volunteer-form__upload-file"
							value={formik.values.photo}
							setFieldValue={formik.setFieldValue}
						/>
					</div>
				</div>
				<div className="profile-volunteer-form__inputs-wrap">
					<InputGroup title="Общая информация">
						<Input
							id="profile_volunteer_firstname"
							name="profile_volunteer_firstname"
							label="Имя"
							type="text"
							placeholder="Пётр"
							inputSize="small"
							error={formik.errors.profile_volunteer_firstname}
							touched={formik.touched.profile_volunteer_firstname}
							value={formik.values.profile_volunteer_firstname}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
						<Input
							id="profile_volunteer_secondname"
							name="profile_volunteer_secondname"
							type="text"
							label="Отчество"
							placeholder="Сергеевич"
							inputSize="small"
							error={formik.errors.profile_volunteer_secondname}
							touched={formik.touched.profile_volunteer_secondname}
							value={formik.values.profile_volunteer_secondname}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
						<Input
							id="profile_volunteer_lastname"
							name="profile_volunteer_lastname"
							label="Фамилия"
							type="text"
							placeholder="Иванов"
							inputSize="small"
							error={formik.errors.profile_volunteer_lastname}
							touched={formik.touched.profile_volunteer_lastname}
							value={formik.values.profile_volunteer_lastname}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							required
						/>
					</InputGroup>
					<InputGroup title="Контактные данные">
						<InputMask
							component={Input}
							mask="+_ (___) ___-__-__"
							replacement={{ _: /\d/ }}
							modify={phoneMask}
							value={formik.values.profile_volunteer_phone}
							handleChange={formik.handleChange}
							id="profile_volunteer_phone"
							name="profile_volunteer_phone"
							label="Телефон"
							type="text"
							placeholder="+7 977 000-00-00"
							inputSize="small"
							error={formik.errors.profile_volunteer_phone}
							touched={formik.touched.profile_volunteer_phone}
						/>
						<Input
							id="profile_volunteer_telegram"
							name="profile_volunteer_telegram"
							label="Telegram"
							type="text"
							placeholder="@name"
							inputSize="small"
							error={formik.errors.profile_volunteer_telegram}
							touched={formik.touched.profile_volunteer_telegram}
							value={formik.values.profile_volunteer_telegram}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
						/>
					</InputGroup>
					<InputGroup title="Дополнительная информация">
						<SelectOption
							id="profile_volunteer_skills"
							name="profile_volunteer_skills"
							label="Навыки"
							placeholder="Выберите навыки"
							options={skills}
							isMulti
							value={formik.values.profile_volunteer_skills}
							touched={formik.touched.profile_volunteer_skills}
							handleChange={(selectedOption) => {
								formik.setFieldValue(
									'profile_volunteer_skills',
									selectedOption.map((option) => ({
										label: option.label,
										value: option.value,
									}))
								);
							}}
							required
						/>
						<SelectOption
							id="profile_volunteer_city"
							name="profile_volunteer_city"
							label="Город"
							placeholder="Выберите город"
							options={cities}
							touched={formik.touched.profile_volunteer_city}
							value={formik.values.profile_volunteer_city}
							handleChange={(selectedOption) => {
								formik.setFieldValue('profile_volunteer_city', [
									{
										label: selectedOption.label,
										value: selectedOption.value,
									},
								]);
							}}
							required
						/>
					</InputGroup>

					<div className="profile-volunteer-form__buttons">
						<div className="profile-volunteer-form__button">
							<Pushbutton
								label="Сохранить изменения"
								color="white"
								backgroundColor="#A6C94F"
								border="1px solid #A6C94F"
								minWidth="100%"
								size="pre-large"
								disabled={
									!formik.isValid ||
									formik.values.profile_volunteer_city === null ||
									formik.values.profile_volunteer_skills.length === 0
								}
								type="submit"
							/>
						</div>
						<div className="profile-volunteer-form__button">
							<Pushbutton
								primary
								color="#333333"
								label="Отменить изменения"
								size="pre-large"
								minWidth="100%"
								border="1px solid #A6C94F"
								type="button"
								onClick={() => {
									formik.handleReset();
									formik.resetForm({});
									navigate('..');
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

ProfileVolunteerForm.propTypes = {
	onSubmit: PropTypes.func,
};

ProfileVolunteerForm.defaultProps = {
	onSubmit: () => {},
};

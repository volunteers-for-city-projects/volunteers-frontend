import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import './ProfileVolunteerForm.scss';

import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import UploadFile from '../UploadFile/UploadFile';
import ProfilePhoto from '../../images/fotoProfile.svg';

import { Pushbutton } from '../Pushbutton/Pushbutton';
import { ProfileVolunteerFormSchema } from '../../utils/validationSchemas/ProfileVolunteerFormSchema';
import {
	// postPhoto,
	createVolunteer,
	getSkills,
	getCities,
} from '../../utils/api/signupApi';
import SelectOption from '../SelectOption/SelectOption';

export default function ProfileVolunteerForm({
	onSubmit,
	handleIsForm,
	...restProps
}) {
	const [cities, setCities] = useState([]);
	const [skills, setSkills] = useState([]);

	const [selectedFile, setSelectedFile] = React.useState(null);

	console.log(selectedFile);

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
						first_name: values.profile_volunteer_firstname,
						second_name: values.profile_volunteer_secondname,
						last_name: values.profile_volunteer_thirdname,
						password: values.profile_volunteer_password,
						re_password: values.profile_volunteer_confirm_password,
					},
					telegram: values.profile_volunteer_telegram,
					photo: values.profile_volunteer_photo || null || '' || undefined,
					phone:
						(formattedPhone.length > 1 && `+${formattedPhone}`) ||
						formattedPhone,
					skills: values.profile_volunteer_skills || [],
					city: values.profile_volunteer_city || [] || null || '',
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
						src={ProfilePhoto}
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
							inputSize="photo"
							value={formik.values.photo}
							setSelectedFile={setSelectedFile}
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
							label="Фамилия"
							type="text"
							placeholder="Иванов"
							inputSize="small"
							error={formik.errors.profile_volunteer_secondname}
							touched={formik.touched.profile_volunteer_secondname}
							value={formik.values.profile_volunteer_secondname}
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
							error={formik.errors.profile_volunteer_thirdname}
							touched={formik.touched.profile_volunteer_thirdname}
							value={formik.values.profile_volunteer_thirdname}
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
							error={formik.errors.profile_volunteer_phone}
							touched={formik.touched.profile_volunteer_phone}
							value={formik.values.profile_volunteer_phone}
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
							error={formik.errors.profile_volunteer_telegram}
							touched={formik.touched.profile_volunteer_telegram}
							value={formik.values.profile_volunteer_telegram}
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
							error={formik.errors.profile_volunteer_password}
							touched={formik.touched.profile_volunteer_password}
							value={formik.values.profile_volunteer_password}
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
							error={formik.errors.profile_volunteer_confirm_password}
							touched={formik.touched.profile_volunteer_confirm_password}
							value={formik.values.profile_volunteer_confirm_password}
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
							value={formik.values.profile_volunteer_skills}
							touched={formik.touched.profile_volunteer_skills}
							handleChange={(selectedOption) => {
								const selectedValues = selectedOption.map(
									(option) => option.value
								);
								formik.setFieldValue(
									'profile_volunteer_skills',
									selectedValues
								);
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
							touched={formik.touched.profile_volunteer_city}
							value={formik.values.profile_volunteer_city}
							handleChange={(selectedOption) => {
								formik.setFieldValue(
									'profile_volunteer_city',
									Number(selectedOption.value)
								);
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
								minWidth={399}
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
								minWidth={399}
								border="1px solid #A6C94F"
								type="button"
								onClick={() => {
									formik.handleReset();
									formik.resetForm({});
									handleIsForm();
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
	handleIsForm: PropTypes.func,
};

ProfileVolunteerForm.defaultProps = {
	onSubmit: () => {},
	handleIsForm: () => {},
};

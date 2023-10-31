import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import './ProfileOrganizationForm.scss';

import Input from '../Input/Input';
import InputTextArea from '../InputTextArea/InputTextArea';
import InputGroup from '../InputGroup/InputGroup';
import UploadFile from '../UploadFile/UploadFile';
import ProfilePhoto from '../../images/fotoProfile.svg';

import { Pushbutton } from '../Pushbutton/Pushbutton';
import { ProfileOrganizationFormSchema } from '../../utils/validationSchemas/ProfileOrganizationFormSchema';
import {
	// postPhoto,
	getCities,
	updateOrganization,
} from '../../utils/api/signupApi';
import SelectOption from '../SelectOption/SelectOption';

export default function ProfileOrganizationForm({
	organizationId,
	onSubmit,
	handleIsForm,
	...restProps
}) {
	const [cities, setCities] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);

	console.log(selectedFile);
	console.log(cities);

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
			profile_organize_organization: '',
			profile_organize_about_organization: '',
			profile_organize_city: null,
			profile_organize_firstname: '',
			profile_organize_secondname: '',
			profile_organize_thirdname: '',
			profile_organize_phone: '',
			profile_organize_ogrn: '',
			profile_organize_password: '',
			profile_organize_confirm_password: '',
		},
		validationSchema: ProfileOrganizationFormSchema,
		onSubmit: async (values) => {
			// конверсия номера телефона из инпута в формат телефона на сервере
			const getDigitsOnly = (phoneNumber) => phoneNumber.replace(/\D/g, '');
			const formattedPhone = `${getDigitsOnly(values.profile_organize_phone)}`;

			try {
				await updateOrganization(1, {
					contact_person: {
						email: values.organize_email,
						first_name: values.profile_organize_firstname,
						last_name: values.profile_organize_thirdname,
						password: values.profile_organize_password,
						second_name: values.profile_organize_secondname,
					},
					title: values.profile_organize_organization,
					ogrn: values.profile_organize_ogrn,
					phone:
						(formattedPhone.length > 1 && `+${formattedPhone}`) ||
						formattedPhone,
					about: values.profile_organize_organization || '' || undefined,
					city: values.profile_organize_city,
				});
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Failed to create user and/or organize:', error.message);
			}
		},
	});

	return (
		<form
			action="#"
			method="post"
			className="organize-signup-form"
			name="organize-auth-form"
			onSubmit={formik.handleSubmit}
			encType="multipart/form-data"
			{...restProps}
		>
			<div className="profile-organize-form__form-wrap">
				<div className="profile-organize-form__photo-wrap">
					<img
						className="profile-organize-form__photo"
						src={ProfilePhoto}
						alt="Фотография пользователя"
					/>
					<div className="profile-organize-form__text-wrap">
						<p className="profile-organize-form__text">
							Загрузить новую фотографию*
						</p>
						<UploadFile
							id="photo"
							name="photo"
							label=""
							type="file"
							value={formik.values.photo}
							setSelectedFile={setSelectedFile}
						/>
					</div>
				</div>
				<div className="profile-organize-form__inputs-wrap">
					<InputGroup title="Общая информация">
						<Input
							id="profile_organize_organization"
							name="profile_organize_organization"
							label="Название организации"
							type="text"
							placeholder="ООО «Ромашка»"
							inputSize="small"
							error={formik.errors.profile_organize_organization}
							touched={formik.touched.profile_organize_organization}
							value={formik.values.profile_organize_organization}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							required
						/>
						<SelectOption
							id="profile_organize_city"
							name="profile_organize_city"
							label="Город"
							placeholder="Выберите город"
							width={400}
							options={cities}
							touched={formik.touched.profile_organize_city}
							value={formik.values.profile_organize_city}
							handleChange={(selectedOption) => {
								formik.setFieldValue(
									'profile_organize_city',
									Number(selectedOption.value)
								);
								console.log(selectedOption.value);
							}}
							required
						/>
					</InputGroup>
					<InputTextArea
						id="profile_organize_about_organization"
						name="profile_organize_about_organization"
						label="Об организации"
						placeholder="Расскажите коротко об организации"
						error={formik.errors.profile_organize_about_organization}
						touched={formik.touched.profile_organize_about_organization}
						value={formik.values.profile_organize_about_organization}
						handleChange={formik.handleChange}
						submitCount={formik.submitCount}
					/>

					<InputGroup title="Контактные данные представителя компании">
						<Input
							id="profile_organize_firstname"
							name="profile_organize_firstname"
							label="Фамилия"
							type="text"
							placeholder="Иванов"
							inputSize="small"
							error={formik.errors.profile_organize_firstname}
							touched={formik.touched.profile_organize_firstname}
							value={formik.values.profile_organize_firstname}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
						<Input
							id="profile_organize_secondname"
							name="profile_organize_secondname"
							label="Имя"
							type="text"
							placeholder="Пётр"
							inputSize="small"
							error={formik.errors.profile_organize_secondname}
							touched={formik.touched.profile_organize_secondname}
							value={formik.values.profile_organize_secondname}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
						<Input
							id="profile_organize_phone"
							name="profile_organize_phone"
							label="Телефон"
							type="phone"
							placeholder="+7 977 000-00-00"
							inputSize="small"
							error={formik.errors.profile_organize_phone}
							touched={formik.touched.profile_organize_phone}
							value={formik.values.profile_organize_phone}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
						<Input
							id="profile_organize_thirdname"
							name="profile_organize_thirdname"
							label="Отчество"
							type="text"
							placeholder="Сергеевич"
							inputSize="small"
							error={formik.errors.profile_organize_thirdname}
							touched={formik.touched.profile_organize_thirdname}
							value={formik.values.profile_organize_thirdname}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
					</InputGroup>
					<InputGroup title="Дополнительная информация">
						<Input
							id="profile_organize_ogrn"
							name="profile_organize_ogrn"
							label="ОГРН"
							type="text"
							placeholder="1-02-66-05-60662-0"
							inputSize="small"
							error={formik.errors.profile_organize_ogrn}
							touched={formik.touched.profile_organize_ogrn}
							value={formik.values.profile_organize_ogrn}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							required
						/>
					</InputGroup>
					<InputGroup title="Пароль">
						<Input
							id="profile_organize_password"
							name="profile_organize_password"
							label="Введите пароль"
							type="password"
							placeholder="Пароль"
							inputSize="small"
							error={formik.errors.profile_organize_password}
							touched={formik.touched.profile_organize_password}
							value={formik.values.profile_organize_password}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
						<Input
							id="profile_organize_confirm_password"
							name="profile_organize_confirm_password"
							label="Повторный пароль"
							type="password"
							placeholder="Повторный пароль"
							inputSize="small"
							error={formik.errors.profile_organize_confirm_password}
							touched={formik.touched.profile_organize_confirm_password}
							value={formik.values.profile_organize_confirm_password}
							handleChange={formik.handleChange}
							submitCount={formik.submitCount}
							autoсomplete="off"
							required
						/>
					</InputGroup>
					<div className="profile-organize-form__buttons">
						<div className="profile-organize-form__button">
							<Pushbutton
								label="Сохранить изменения"
								color="white"
								backgroundColor="#A6C94F"
								border="1px solid #A6C94F"
								minWidth="399px"
								size="pre-large"
								disabled={
									!formik.isValid ||
									formik.values.profile_organize_city === null
								}
								type="submit"
							/>
						</div>
						<div className="profile-organize-form__button">
							<Pushbutton
								primary
								color="#333333"
								label="Отменить изменения"
								size="pre-large"
								minWidth="399px"
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

ProfileOrganizationForm.propTypes = {
	organizationId: PropTypes.string.isRequired,
	onSubmit: PropTypes.func,
	handleIsForm: PropTypes.func,
};

ProfileOrganizationForm.defaultProps = {
	onSubmit: () => {},
	handleIsForm: () => {},
};

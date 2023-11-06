import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useOutletContext } from 'react-router-dom';
import moment from 'moment';

import './VolunteerSignupForm.scss';

import Input from '../Input/Input';
import UploadFile from '../UploadFile/UploadFile';
import InputGroup from '../InputGroup/InputGroup';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import { VolunteerSignupFormSchema } from '../../utils/validationSchemas/VolunteerSignupFormSchema';
import {
	createVolunteer,
	getSkills,
	getCities,
} from '../../utils/api/signupApi';
import SelectOption from '../SelectOption/SelectOption';

export default function VolunteerSignupForm({ onSubmit, ...restProps }) {
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
	const [cities, setCities] = useState([]);
	const [skills, setSkills] = useState([]);

	const { setModal } = useOutletContext();

	const handleCheckboxClick = () => {
		setIsCheckboxChecked(!isCheckboxChecked);
	};

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
			firstname: '',
			secondname: '',
			thirdname: '',
			birthday: '',
			phone: '',
			email: '',
			telegram: '',
			password: '',
			confirm_password: '',
			photo: '',
			skills: [],
			city: null,
		},
		validationSchema: VolunteerSignupFormSchema,
		onSubmit: async (values) => {
			// конверсия даты из инпута в формат даты на сервере
			const formattedDateOfBirth = moment(values.birthday, 'DD.MM.YYYY').format(
				'YYYY-MM-DD'
			);
			// конверсия номера телефона из инпута в формат телефона на сервере
			const getDigitsOnly = (phoneNumber) => phoneNumber.replace(/\D/g, '');
			const formattedPhone = `${getDigitsOnly(values.phone)}`;

			try {
				await createVolunteer({
					user: {
						first_name: values.firstname,
						second_name: values.secondname,
						last_name: values.thirdname,
						email: values.email,
						password: values.password,
						re_password: values.confirm_password,
					},
					telegram: values.telegram,
					photo: values.photo || '',
					date_of_birth: formattedDateOfBirth,
					phone:
						(formattedPhone.length > 1 && `+${formattedPhone}`) ||
						formattedPhone,
					skills: values.skills || [],
					city: values.city || [] || null || '',
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
					id="firstname"
					name="firstname"
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
					id="secondname"
					name="secondname"
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
					id="thirdname"
					name="thirdname"
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
				<Input
					id="birthday"
					name="birthday"
					label="Дата рождения"
					type="text-date"
					placeholder="01.02.2010"
					inputSize="small"
					error={formik.errors.birthday}
					touched={formik.touched.birthday}
					value={formik.values.birthday}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
					required
				/>
			</InputGroup>
			<InputGroup title="Контактные данные">
				<Input
					id="phone"
					name="phone"
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
					id="email"
					name="email"
					label="E-mail"
					type="email"
					placeholder="example@email.ru"
					inputSize="small"
					error={formik.errors.email}
					touched={formik.touched.email}
					value={formik.values.email}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
					required
				/>
				<Input
					id="telegram"
					name="telegram"
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
					id="password"
					name="password"
					label="Пароль"
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
					id="confirm_password"
					name="confirm_password"
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
			<InputGroup title="Дополнительная информация">
				<SelectOption
					id="skills"
					name="skills"
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
			</InputGroup>
			<div className=" volunteer-signup-form__text-content">
				<Pushbutton
					label="Зарегистрироваться"
					color="white"
					backgroundColor="#A6C94F"
					border="1px solid #A6C94F"
					minWidth="399px"
					size="pre-large"
					disabled={
						!formik.isValid ||
						!isCheckboxChecked ||
						formik.values.city === null ||
						formik.values.skills.length === 0
					}
					type="submit"
				/>
				<p className="volunteer-signup-form__text">
					Нажимая кнопку «Отправить данные», я подтверждаю, что мне исполнилось
					18 лет, и соглашаюсь с Политикой конфиденциальности
				</p>
				<label
					htmlFor="volunteer-signup-form-checkbox"
					className="volunteer-signup-form__text"
				>
					<input
						id="volunteer-signup-form-checkbox"
						name="volunteer-signup-form"
						type="checkbox"
						className="volunteer-signup-form__checkbox"
						onClick={handleCheckboxClick}
					/>
					Даю согласие на обработку моих персональных данных
				</label>
			</div>
		</form>
	);
}

VolunteerSignupForm.propTypes = {
	onSubmit: PropTypes.func,
};

VolunteerSignupForm.defaultProps = {
	onSubmit: () => {},
};

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import './AddProject.scss';
import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import InputTextArea from '../InputTextArea/InputTextArea';
import SelectOption from '../SelectOption/SelectOption';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import projectImage from '../../images/city.png';
import { getSkills, getCities } from '../../utils/api/signupApi';
import { getProjectCategories, createProject } from '../../utils/api/organizer';

function AddProject() {
	// const projectNameInput = useRef(null);
	// const [isEditableName, setIsEditableName] = useState(false);
	const [cities, setCities] = useState([]);
	const [skills, setSkills] = useState([]);
	const [projectCategories, setProjectCategories] = useState([]);
	// const [selectedImage, setSelectedImage] = useState(null);

	const initialValues = {
		name: 'Название проекта*',
		// image: null,
		description: '',
		goal: '',
		events: '',
		tasks: '',
		provide: '',
		city: '',
		address: '',
		date: '',
		timeRange: '',
		submissionDate: '',
		categoryProject: [],
		skills: [],
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, 'Длина поля от 2 до 100 символов')
			.max(100, 'Длина поля от 2 до 100 символов')
			.matches(/^[А-Яа-яЁёa-zA-Z\s-]+$/, 'Введите название кириллицей')
			.required('Поле обязательно для заполнения'),
		description: Yup.string()
			.min(10, 'Количество символов от 10 до 750')
			.max(750, 'Количество символов от 10 до 750')
			.required('Поле обязательно для заполнения'),
		goal: Yup.string()
			.min(10, 'Количество символов от 10 до 750')
			.max(750, 'Количество символов от 10 до 750')
			.required('Поле обязательно для заполнения'),
		events: Yup.string()
			.min(10, 'Количество символов от 10 до 750')
			.max(750, 'Количество символов от 10 до 750'),
		tasks: Yup.string()
			.min(2, 'Количество символов от 2 до 750')
			.max(750, 'Количество символов от 2 до 750')
			.required('Поле обязательно для заполнения'),
		provide: Yup.string()
			.min(2, 'Количество символов от 2 до 750')
			.max(750, 'Количество символов от 2 до 750'),
		city: Yup.number().required('Поле обязательно для заполнения'),
		address: Yup.string()
			.matches(
				/^[А-Яа-яЁёa-zA-Z.,\s-]+$/,
				'Допустимы знаки препинания, дефисы и пробелы'
			)
			.min(2, 'Длина поля от 2 до 100 символов')
			.max(100, 'Длина поля от 2 до 100 символов')
			.required('Поле обязательно для заполнения'),
		date: Yup.string()
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
				'Введите корректную дату в формате День.Месяц.Год'
			)
			.test('is-valid-date', 'Нельзя выбрать прошедшую дату', (value) => {
				if (!value || typeof value !== 'string') {
					return false;
				}
				const today = moment();
				const inputDate = moment(value, 'DD.MM.YYYY');
				if (inputDate <= today) {
					return false;
				}
				return true;
			})
			.required('Поле обязательно для заполнения'),
		timeRange: Yup.string()
			.matches(
				/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s-\s([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
				'Введите корректный диапазон времени в формате Часы:Минуты - Часы:Минуты'
			)
			.required('Поле обязательно для заполнения'),
		submissionDate: Yup.string()
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}\s-\s(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
				'Введите корректный диапазон дат в формате День.Месяц.Год - День.Месяц.Год'
			)
			.test('is-valid-date', 'Нельзя выбрать прошедшую дату', (value) => {
				if (!value || typeof value !== 'string') {
					return false;
				}
				const today = moment();
				const beginDate = moment(value.split('-')[0], 'DD.MM.YYYY');
				const endDate = moment(value.split('-')[1], 'DD.MM.YYYY');
				if (beginDate <= today || endDate <= today) {
					return false;
				}
				return true;
			})
			.required('Поле обязательно для заполнения'),
		categoryProject: Yup.array()
			.test('is-empty', 'Выберите категорию проекта', (value) => {
				if (value.length === 0) {
					return false;
				}
				return true;
			})
			.required('Поле обязательно для заполнения'),
		skills: Yup.array()
			.test('is-empty', 'Выберите навыки', (value) => {
				if (value.length === 0) {
					return false;
				}
				return true;
			})
			.required('Поле обязательно для заполнения'),
	});

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			try {
				await createProject({
					contact_person: {
						email: values.organize_email,
						first_name: values.organize_firstname,
						last_name: values.organize_thirdname,
						password: values.organize_password,
						second_name: values.organize_secondname,
					},
					title: values.organization,
					ogrn: values.organize_ogrn,
					// phone: formattedPhone,
					about: values.about_organization || '',
					city: 1,
				});

				// eslint-disable-next-line no-console
				console.log(values);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error.message);
			}
		},
	});

	// function handleChangeName() {
	// 	setIsEditableName(!isEditableName);
	// 	projectNameInput.current.focus();
	// }

	useEffect(() => {
		Promise.all([getSkills(), getCities(), getProjectCategories()])
			.then(([skillsResponce, citiesResponce, projectCategoriesResponce]) => {
				const skillsArray = skillsResponce.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));
				const citiesArray = citiesResponce.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));
				const projectCategoriesArray = projectCategoriesResponce.map(
					(item) => ({
						label: item.name,
						value: item.id.toString(),
					})
				);
				setSkills(skillsArray);
				setCities(citiesArray);
				setProjectCategories(projectCategoriesArray);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}, []);

	return (
		<section className="add-project">
			<form
				name="add-project-form"
				action="#"
				method="post"
				onSubmit={formik.handleSubmit}
			>
				<div className="add-project__name-container">
					<Input
						name="name"
						type="text"
						label=""
						placeholder="Введите название проекта"
						inputSize="large"
						error={formik.errors.name}
						touched={formik.touched.name}
						value={formik.values.name}
						handleChange={formik.handleChange}
						submitCount={formik.submitCount}
					/>
					{/* <input
						className="add-project__button add-project__edit-button"
						type="button"
						aria-label="Редактировать название"
						onClick={handleChangeName}
					/> */}
				</div>
				<div className="add-project__content">
					<div className="add-project__image-wrapper">
						<img alt="Изображение проекта" src={projectImage} />
						<div className="add-project__upload-image-container">
							<span className="add-project__upload-image-label">
								Загрузить новую фотографию*
							</span>
							<input
								name="image"
								className="add-project__button add-project__upload-image-button"
								type="file"
								aria-label="Загрузить новую фотографию"
								accept="image/*"
								onChange={(event) => {
									console.log(event.target.files[0]);
									// formik.setFieldValue('image', event.target.files[0]);
								}}
								value={formik.values.image}
							/>
						</div>
					</div>
					<div className="add-project__form-wrapper">
						<InputGroup title="Общая информация">
							<InputTextArea
								name="description"
								label="Описание проекта"
								placeholder="Расскажите о проекте"
								error={formik.errors.description}
								touched={formik.touched.description}
								value={formik.values.description}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
							<InputTextArea
								name="goal"
								label="Цель проекта"
								placeholder=""
								error={formik.errors.goal}
								touched={formik.touched.goal}
								value={formik.values.goal}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
							<InputTextArea
								name="events"
								label="Мероприятия"
								placeholder="Например: Лекция по экологии; Посадка саженцев;"
								error={formik.errors.events}
								touched={formik.touched.events}
								value={formik.values.events}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
							/>
							<InputTextArea
								name="tasks"
								label="Задачи проекта"
								placeholder="Опишите, какие задачи будут стоять перед волонтёрами: к примеру, «уборка территории» и «высадка деревьев»"
								error={formik.errors.tasks}
								touched={formik.touched.tasks}
								value={formik.values.tasks}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
							<InputTextArea
								name="provide"
								label="Организатор предоставляет:"
								placeholder="Например: саженцы, перчатки, обед"
								error={formik.errors.provide}
								touched={formik.touched.provide}
								value={formik.values.provide}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
							/>
						</InputGroup>
						<InputGroup title="Место проведения">
							<SelectOption
								name="city"
								label="Город"
								placeholder="Выберите город"
								width={400}
								options={cities}
								errorMessage={formik.errors.city}
								touched={formik.touched.city}
								value={formik.values.city}
								handleChange={(selectedOption) => {
									const selectedValues = selectedOption.value;
									console.log(selectedValues);
									formik.setFieldValue('city', selectedValues);
								}}
								required
							/>
							<Input
								name="address"
								type="text"
								label="Адрес"
								placeholder="Улица, дом, корпус, строение"
								inputSize="extra-large"
								error={formik.errors.address}
								touched={formik.touched.address}
								value={formik.values.address}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
						</InputGroup>
						<InputGroup title="Сроки проведения">
							<Input
								name="date"
								type="text"
								label="Дата проведения"
								placeholder="01.02.2023"
								inputSize="small"
								error={formik.errors.date}
								touched={formik.touched.date}
								value={formik.values.date}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
							<Input
								name="timeRange"
								type="text"
								label="Время проведения (местное время)"
								placeholder="10:00 - 16:00"
								inputSize="small"
								error={formik.errors.timeRange}
								touched={formik.touched.timeRange}
								value={formik.values.timeRange}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
							<Input
								name="submissionDate"
								type="text"
								label="Дата подачи заявок"
								placeholder="02.10.2023 - 12.10.2023"
								inputSize="small"
								error={formik.errors.submissionDate}
								touched={formik.touched.submissionDate}
								value={formik.values.submissionDate}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
						</InputGroup>
						<InputGroup title="Дополнительная информация">
							<SelectOption
								label="Категория проекта"
								placeholder="Выберите категорию"
								width={400}
								options={projectCategories}
								errorMessage={formik.errors.categoryProject}
								touched={formik.touched.categoryProject}
								value={formik.values.categoryProject}
								handleChange={(selectedOption) => {
									console.log(selectedOption);
									const selectedValues = selectedOption.map(
										(option) => option.value
									);
									formik.setFieldValue('categoryProject', selectedValues);
								}}
								isMulti
								required
							/>
							<SelectOption
								label="Навыки"
								placeholder="Выберите навыки"
								width={400}
								options={skills}
								errorMessage={formik.errors.skills}
								touched={formik.touched.skills}
								value={formik.values.skills}
								handleChange={(selectedOption) => {
									console.log(selectedOption);
									const selectedValues = selectedOption.map(
										(option) => option.value
									);
									formik.setFieldValue('skills', selectedValues);
								}}
								isMulti
								required
							/>
						</InputGroup>
						<div className="add-project__form-buttons">
							<Pushbutton
								label="Опубликовать проект"
								size="large-var"
								minWidth="380px"
								color="#FDFDFD"
								backgroundColor="#A6C94F"
								border="1px solid #A6C94F"
								disabled={!formik.isValid}
								type="submit"
							/>
							<Pushbutton
								label="Сохранить как черновик"
								size="large-var"
								minWidth="380px"
								color="#333"
								backgroundColor="#FDFDFD"
								border="1px solid #A6C94F"
								type="save"
							/>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
}

export default AddProject;

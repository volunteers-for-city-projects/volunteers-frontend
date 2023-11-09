import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './Project.scss';
import CustomInput from '../CustomInput/CustomInput';
import InputTextArea from '../InputTextArea/InputTextArea';
import SelectOption from '../SelectOption/SelectOption';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import projectImage from '../../images/city.png';
import { getSkills, getCities } from '../../utils/api/signupApi';
import { getProjectCategories, createProject } from '../../utils/api/organizer';

function Project() {
	const [cities, setCities] = useState([]);
	const [skills, setSkills] = useState([]);
	const [projectCategories, setProjectCategories] = useState([]);
	const [image, setImage] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const { currentUser, setModal } = useOutletContext();
	const navigate = useNavigate();

	const projectValues = {
		name: '',
		description: '',
		image: '',
		goal: '',
		events: '',
		tasks: '',
		provide: '',
		city: null,
		address: '',
		date: '',
		timeRange: '',
		submissionDate: '',
		categoryProject: null,
		skills: null,
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, 'Длина поля от 2 до 100 символов')
			.max(100, 'Длина поля от 2 до 100 символов')
			.matches(/^[А-Яа-яЁё0-9\s-]+$/, 'Введите название кириллицей')
			.required('Поле обязательно для заполнения'),
		description: Yup.string()
			.min(10, 'Количество символов от 10 до 750')
			.max(750, 'Количество символов от 10 до 750')
			.required('Поле обязательно для заполнения'),
		image: Yup.string().required('Поле обязательно для заполнения'),
		goal: Yup.string()
			.min(10, 'Количество символов от 10 до 750')
			.max(750, 'Количество символов от 10 до 750')
			.required('Поле обязательно для заполнения'),
		events: Yup.string()
			.min(10, 'Количество символов от 10 до 750')
			.max(750, 'Количество символов от 10 до 750')
			.required('Поле обязательно для заполнения'),
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
				/^[А-Яа-яЁёa-zA-Z0-9.,\s-]+$/,
				'Допустимы знаки препинания, дефисы и пробелы'
			)
			.min(2, 'Длина поля от 2 до 100 символов')
			.max(100, 'Длина поля от 2 до 100 символов')
			.required('Поле обязательно для заполнения'),
		date: Yup.string()
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

	const dateTimeFormatter = (date, time) => {
		const parsePattern = 'DD.MM.YYYY HH:mm';
		const formatPattern = 'YYYY-MM-DDTHH:mm:ss.000Z';
		return moment(`${date} ${time}`, parsePattern).format(formatPattern);
	};
	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: projectValues,
		validationSchema,
		onSubmit: async (values) => {
			try {
				await createProject({
					name: values.name,
					description: values.description,
					picture: image,
					start_datetime: dateTimeFormatter(
						values.date.split('-')[0].trim(),
						values.timeRange.split('-')[0].trim()
					),
					end_datetime: dateTimeFormatter(
						values.date.split('-')[1].trim(),
						values.timeRange.split('-')[1].trim()
					),
					start_date_application: dateTimeFormatter(
						values.submissionDate.split('-')[0].trim(),
						'00:00'
					),
					end_date_application: dateTimeFormatter(
						values.submissionDate.split('-')[1].trim(),
						'23:59'
					),
					event_purpose: values.goal,
					event_address: {
						address_line: values.address,
						street: 'street',
						house: 'house',
						block: '',
						building: '',
					},
					project_tasks: values.tasks,
					project_events: values.events,
					organizer_provides: values.provide,
					organization: currentUser.id,
					city: values.city,
					categories: values.categoryProject,
					skills: values.skills,
				});
				setModal({
					isOpen: true,
					title: 'Проект отправлен на модерацию',
					type: 'project',
					state: 'success',
					onSubmit: (event) => {
						event.preventDefault();
						navigate('/profile');
						setModal({
							isOpen: false,
						});
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

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		if (file) {
			if (file.size >= 20 * (1024 * 1024)) {
				formik.setFieldError('image', 'Размер не более 20 Мбайт');
				// eslint-disable-next-line no-param-reassign
				event.target.value = '';
			} else {
				reader.onload = function handleFileLoad() {
					const base64Data = reader.result;
					formik.setFieldValue('image', base64Data);
					setImage(base64Data);
				};
				reader.readAsDataURL(file);
				setIsFocused(false);
			}
		}
	};

	useEffect(() => {
		Promise.all([getSkills(), getCities(), getProjectCategories()])
			.then(([skillsResponse, citiesResponse, projectCategoriesResponse]) => {
				const skillsArray = skillsResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));
				const citiesArray = citiesResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));
				const projectCategoriesArray = projectCategoriesResponse.map(
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
				className="add-project__form"
				action="#"
				method="post"
				onSubmit={formik.handleSubmit}
			>
				<div className="add-project__name-container">
					<CustomInput
						name="name"
						type="text"
						label=""
						placeholder="Введите название проекта"
						error={formik.errors.name}
						value={formik.values.name}
						handleChange={formik.handleChange}
					/>
				</div>
				<div className="add-project__image-wrapper">
					<div>
						<img
							className="add-project__image"
							alt="Изображение проекта"
							src={image.length > 0 ? image : projectImage}
						/>
						<span className="error-message">
							{isFocused &&
								formik.errors.image?.length > 0 &&
								formik.errors.image}
						</span>
					</div>
					<div className="add-project__upload-image-container">
						<span className="add-project__upload-image-label">
							Загрузить новую фотографию*
						</span>
						<input
							name="image"
							type="file"
							className="add-project__button add-project__upload-image-button"
							accept="image/png, image/jpeg"
							onChange={handleImageChange}
							onClick={() => setIsFocused(true)}
							required
						/>
					</div>
				</div>
				<div className="add-project__form-wrapper">
					<div className="add-project__general-group-wrapper">
						<h2 className="add-project__caption-group">Общая информация</h2>
						<div className="add-project__general-group">
							<InputTextArea
								name="description"
								label="Описание проекта"
								placeholder="Расскажите о проекте"
								error={formik.errors.description}
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
								value={formik.values.events}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
								required
							/>
							<InputTextArea
								name="tasks"
								label="Задачи проекта"
								placeholder="Опишите, какие задачи будут стоять перед волонтёрами: к примеру, «уборка территории» и «высадка деревьев»"
								error={formik.errors.tasks}
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
								value={formik.values.provide}
								handleChange={formik.handleChange}
								submitCount={formik.submitCount}
							/>
						</div>
					</div>
					<div className="add-project__place-group-wrapper">
						<h2 className="add-project__caption-group">Место проведения</h2>
						<div className="add-project__place-group">
							<SelectOption
								name="city"
								label="Город"
								placeholder="Выберите город"
								width={400}
								options={cities}
								error={formik.errors.city}
								value={formik.values.city}
								handleChange={(selectedOption) => {
									formik.setFieldValue('city', selectedOption.value);
								}}
								submitCount={formik.submitCount}
								required
							/>
							<CustomInput
								name="address"
								type="text"
								label="Адрес"
								placeholder="Улица, дом, корпус, строение"
								error={formik.errors.address}
								value={formik.values.address}
								handleChange={formik.handleChange}
								required
							/>
						</div>
					</div>
					<div className="add-project__dates-group-wrapper">
						<h2 className="add-project__caption-group">Сроки проведения</h2>
						<div className="add-project__dates-group">
							<CustomInput
								name="date"
								type="text"
								label="Дата проведения"
								placeholder="01.02.2023 - 12.10.2023"
								error={formik.errors.date}
								value={formik.values.date}
								handleChange={formik.handleChange}
								required
							/>
							<CustomInput
								name="timeRange"
								type="text"
								label="Время проведения (местное время)"
								placeholder="10:00 - 16:00"
								error={formik.errors.timeRange}
								value={formik.values.timeRange}
								handleChange={formik.handleChange}
								required
							/>
							<CustomInput
								name="submissionDate"
								type="text"
								label="Дата подачи заявок"
								placeholder="02.10.2023 - 12.10.2023"
								error={formik.errors.submissionDate}
								value={formik.values.submissionDate}
								handleChange={formik.handleChange}
								required
							/>
						</div>
					</div>
					<div className="add-project__additional-group-wrapper">
						<h2 className="add-project__caption-group">
							Дополнительная информация
						</h2>
						<div className="add-project__additional-group">
							<SelectOption
								label="Категория проекта"
								placeholder="Выберите категорию"
								width={400}
								options={projectCategories}
								error={formik.errors.categoryProject}
								value={formik.values.categoryProject}
								handleChange={(selectedOption) => {
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
								error={formik.errors.skills}
								value={formik.values.skills}
								handleChange={(selectedOption) => {
									const selectedValues = selectedOption.map(
										(option) => option.value
									);
									formik.setFieldValue('skills', selectedValues);
								}}
								isMulti
								required
							/>
						</div>
					</div>
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
			</form>
		</section>
	);
}

export default Project;

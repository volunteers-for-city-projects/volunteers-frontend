import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './Project.scss';
import CustomInput from '../CustomInput/CustomInput';
import SelectOption from '../SelectOption/SelectOption';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import projectImage from '../../images/city.png';
import { createProject } from '../../utils/api/organizer';
import { Crumbs } from '../Crumbs/Crumbs';
import CustomTextarea from '../CustomTextarea/CustomTextarea';

function Project() {
	const { cities, skills, projectCategories, setModal, currentUser } =
		useOutletContext();
	const [image, setImage] = useState('');
	const [isFocused, setIsFocused] = useState(false);
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
		city: Yup.array()
			.of(Yup.object({ label: Yup.string(), value: Yup.number() }))
			.required('Поле обязательно для заполнения'),
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

	const handleSubmit = async (values) => {
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
	};

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: projectValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	const nameRef = useRef(null);

	// При сохранении проекта как черновика обязательное поле только одно - Имя проекта
	// при этом localstorage очищается
	const handleDraftSaveClick = (values, errors) => {
		try {
			console.info(values);
			console.info(errors);
			if (errors?.name) {
				nameRef.current.focus();
			} else {
				setModal({
					isOpen: true,
					title: 'Черновик проекта успешно сохранён',
					type: 'draft',
					state: 'success',
					onSubmit: (event) => {
						event.preventDefault();
						navigate('/profile/organizer');
						setModal({
							isOpen: false,
						});
					},
				});
				localStorage.removeItem('draft');
			}
		} catch (error) {
			console.error(error);
			setModal({
				isOpen: true,
				title: 'Черновик не сохранён',
				type: 'draft',
				state: 'info',
				onSubmit: (event) => {
					event.preventDefault();
					navigate('/profile');
					setModal({
						isOpen: false,
					});
				},
			});
		}
	};

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

	const handleBlur = (e) => {
		formik.handleBlur(e);
	};

	const handleBlurSelectOption = (name) => {
		formik.setFieldTouched(name, true);
	};

	const selectOption = (name, selectedOption) => {
		const selectedItem = [
			{
				label: selectedOption.label,
				value: selectedOption.value,
			},
		];
		formik.setFieldValue(name, selectedItem);
	};

	const selectOptions = (name, selectedOption) => {
		const selectedItems = selectedOption.map((option) => ({
			label: option.label,
			value: option.value,
		}));

		formik.setFieldValue(name, selectedItems);
	};

	return (
		<section className="project">
			<div className="project__menu-container">
				<Crumbs />
			</div>
			<form
				className="project__form"
				name="project-form"
				action="#"
				method="post"
				onSubmit={formik.handleSubmit}
			>
				<div className="project__custom-input">
					<CustomInput
						inputRef={nameRef}
						name="name"
						type="text"
						label=""
						placeholder="Введите название проекта"
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						value={formik.values.name}
						handleChange={formik.handleChange}
						onBlur={(e) => handleBlur(e)}
					/>
				</div>
				<div className="project__image-wrapper">
					<div>
						<img
							className="project__image"
							alt="Изображение проекта"
							src={image.length > 0 ? image : projectImage}
						/>
						<span className="error-message">
							{isFocused &&
								formik.errors.image?.length > 0 &&
								formik.errors.image}
						</span>
					</div>
					<div className="project__upload-image-container">
						<span className="project__upload-image-label">
							Загрузить новую фотографию*
						</span>
						<input
							name="image"
							type="file"
							tabIndex={0}
							className="project__button project__upload-image-button"
							accept="image/png, image/jpeg"
							onChange={handleImageChange}
							onClick={() => setIsFocused(true)}
							required
						/>
					</div>
				</div>
				<div className="project__form-wrapper">
					<div className="project__general-group-wrapper">
						<h2 className="project__caption-group">Общая информация</h2>
						<div className="project__general-group">
							<CustomTextarea
								name="description"
								label="Описание проекта"
								placeholder="Расскажите о проекте"
								error={
									formik.touched.description &&
									Boolean(formik.errors.description)
								}
								helperText={
									formik.touched.description && formik.errors.description
								}
								value={formik.values.description}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
							<CustomTextarea
								name="goal"
								label="Цель проекта"
								placeholder=""
								error={formik.touched.goal && Boolean(formik.errors.goal)}
								helperText={formik.touched.goal && formik.errors.goal}
								value={formik.values.goal}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
							<CustomTextarea
								name="events"
								label="Мероприятия"
								placeholder="Например: Лекция по экологии; Посадка саженцев;"
								error={formik.touched.events && Boolean(formik.errors.events)}
								helperText={formik.touched.events && formik.errors.events}
								value={formik.values.events}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
							<CustomTextarea
								name="tasks"
								label="Задачи проекта"
								placeholder="Опишите, какие задачи будут стоять перед волонтёрами: к примеру, «уборка территории» и «высадка деревьев»"
								error={formik.touched.tasks && Boolean(formik.errors.tasks)}
								helperText={formik.touched.tasks && formik.errors.tasks}
								value={formik.values.tasks}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
							<CustomTextarea
								name="provide"
								label="Организатор предоставляет:"
								placeholder="Например: саженцы, перчатки, обед"
								error={formik.touched.provide && Boolean(formik.errors.provide)}
								helperText={formik.touched.provide && formik.errors.provide}
								value={formik.values.provide}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
							/>
						</div>
					</div>
					<div className="project__place-group-wrapper">
						<h2 className="project__caption-group">Место проведения</h2>
						<div className="project__place-group">
							<SelectOption
								name="city"
								label="Город"
								placeholder="Выберите город"
								options={cities}
								handleChange={(selectedOption) =>
									selectOption('city', selectedOption)
								}
								value={formik.values?.city}
								error={formik.touched.city && Boolean(formik.errors.city)}
								helperText={formik.touched.city && formik.errors.city}
								onBlur={() => handleBlurSelectOption('city')}
								required
							/>
							<CustomInput
								name="address"
								type="text"
								label="Адрес"
								placeholder="Улица, дом, корпус, строение"
								error={formik.touched.address && Boolean(formik.errors.address)}
								helperText={formik.touched.address && formik.errors.address}
								value={formik.values.address}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
						</div>
					</div>
					<div className="project__dates-group-wrapper">
						<h2 className="project__caption-group">Сроки проведения</h2>
						<div className="project__dates-group">
							<CustomInput
								name="date"
								type="text"
								label="Дата проведения"
								placeholder="01.02.2023 - 12.10.2023"
								error={formik.touched.date && Boolean(formik.errors.date)}
								helperText={formik.touched.date && formik.errors.date}
								value={formik.values.date}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
							<CustomInput
								name="timeRange"
								type="text"
								label="Время проведения (местное время)"
								placeholder="10:00 - 16:00"
								error={
									formik.touched.timeRange && Boolean(formik.errors.timeRange)
								}
								helperText={formik.touched.timeRange && formik.errors.timeRange}
								value={formik.values.timeRange}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
							<CustomInput
								name="submissionDate"
								type="text"
								label="Дата подачи заявок"
								placeholder="02.10.2023 - 12.10.2023"
								error={
									formik.touched.submissionDate &&
									Boolean(formik.errors.submissionDate)
								}
								helperText={
									formik.touched.submissionDate && formik.errors.submissionDate
								}
								value={formik.values.submissionDate}
								handleChange={formik.handleChange}
								onBlur={(e) => handleBlur(e)}
								required
							/>
						</div>
					</div>
					<div className="project__additional-group-wrapper">
						<h2 className="project__caption-group">
							Дополнительная информация
						</h2>
						<div className="project__additional-group">
							<SelectOption
								name="categoryProject"
								label="Категория проекта"
								placeholder="Выберите категорию"
								options={projectCategories}
								handleChange={(selectedOption) =>
									selectOptions('categoryProject', selectedOption)
								}
								value={formik.values?.categoryProject}
								error={
									formik.touched.categoryProject &&
									Boolean(formik.errors.categoryProject)
								}
								helperText={
									formik.touched.categoryProject &&
									formik.errors.categoryProject
								}
								onBlur={() => handleBlurSelectOption('categoryProject')}
								isMulti
								required
							/>
							<SelectOption
								name="skills"
								label="Навыки"
								placeholder="Выберите навыки"
								options={skills}
								handleChange={(selectedOption) =>
									selectOptions('skills', selectedOption)
								}
								value={formik.values?.skills}
								error={formik.touched.skills && Boolean(formik.errors.skills)}
								helperText={formik.touched.skills && formik.errors.skills}
								onBlur={() => handleBlurSelectOption('skills')}
								isMulti
								required
							/>
						</div>
					</div>
					<div className="project__form-buttons">
						<Pushbutton
							label="Опубликовать проект"
							size="large-var"
							minWidth="380px"
							color="#FDFDFD"
							backgroundColor="#A6C94F"
							border="1px solid #A6C94F"
							disabled={!formik.isValid}
						/>
						<Pushbutton
							label="Сохранить как черновик"
							size="large-var"
							minWidth="380px"
							color="#333"
							backgroundColor="#FDFDFD"
							border="1px solid #A6C94F"
							onClick={() => handleDraftSaveClick(formik.values, formik.errors)}
						/>
					</div>
				</div>
			</form>
		</section>
	);
}

export default Project;

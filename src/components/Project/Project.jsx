import { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {
	useLocation,
	useNavigate,
	useOutletContext,
	useParams,
} from 'react-router-dom';
import './Project.scss';
import CustomInput from '../CustomInput/CustomInput';
import SelectOption from '../SelectOption/SelectOption';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import projectImage from '../../images/city.png';
import { createProject, createProjectAsDraft } from '../../utils/api/organizer';
import { Crumbs } from '../Crumbs/Crumbs';
import CustomTextarea from '../CustomTextarea/CustomTextarea';
import CustomDateRange from '../CustomDateRange/CustomDateRange';

export default function Project() {
	const {
		cities,
		skills,
		projectCategories,
		setModal,
		currentUser,
		projectsMe,
	} = useOutletContext();

	const [isFocused, setIsFocused] = useState(false);
	const navigate = useNavigate();
	const { IdProject } = useParams();
	const nameRef = useRef(null);
	const location = useLocation();

	const draftLocalstorage = JSON.parse(localStorage.getItem('draft')) || [];

	const currentProject = projectsMe.filter(
		(item) => item.id === Number(IdProject)
	)[0];

	const selectOptionCity = (city) =>
		cities
			.filter((item) => item.label === `${city}`)
			.map((item) => ({
				label: item.label,
				value: item.value,
			}));

	const selectOptionsSkills = (projectSkills) =>
		projectSkills.map((item) => ({
			label: item.name,
			value: item.id,
		}));

	const selectOptionsCategory = (categories) =>
		categories.map(
			(item) =>
				projectCategories.filter(
					(category) => Number(category.value) === item
				)[0]
		);

	const rangeDate = (startDateTime, endDateTime) => {
		let result = null;
		if (startDateTime !== null && endDateTime !== null) {
			const startDate = startDateTime.split(' ')[0];
			const endDate = endDateTime.split(' ')[0];
			result = `${startDate} - ${endDate}`;
		}
		return result;
	};

	const rangeTime = (startDateTime, endDateTime) => {
		let result = null;
		if (startDateTime !== null && endDateTime !== null) {
			const startTime = startDateTime.split(' ')[1];
			const endTime = endDateTime.split(' ')[1];
			result = `${startTime} - ${endTime}`;
		}
		return result;
	};

	// Преобразует указанное изображение в base64
	// const toDataURL = (url) => fetch(url).then((response) => response.blob());
	// .then(
	// 	(blob) =>
	// 		new Promise((resolve, reject) => {
	// 			const a = Object.assign(new FileReader(), {
	// 				onloadend: ({ target }) => resolve(target.result),
	// 				onerror: ({ target }) => reject(target.error),
	// 			}).readAsDataURL(blob);
	// 			console.log(`+++++ ${a}`);
	// 		})
	// );

	// toDataURL(currentProject?.picture)
	// 	.then((data) => {
	// 		console.log(data);
	// 	})
	// 	.catch((error) => console.error(error));

	const project =
		location.pathname === '/profile/organizer/create-project'
			? {
					name: draftLocalstorage?.name || '',
					description: draftLocalstorage?.description || '',
					image: draftLocalstorage?.image || '',
					goal: draftLocalstorage?.goal || '',
					events: draftLocalstorage?.events || '',
					tasks: draftLocalstorage?.tasks || '',
					provide: draftLocalstorage?.provide || '',
					city: draftLocalstorage?.city || null,
					address: draftLocalstorage?.address || '',
					date: draftLocalstorage?.date || '',
					timeRange: draftLocalstorage?.timeRange || '',
					submissionDate: draftLocalstorage?.submissionDate || '',
					categoryProject: draftLocalstorage?.categoryProject || null,
					skills: draftLocalstorage?.skills || null,
			  }
			: {
					name: currentProject?.name || '',
					description: currentProject?.description || '',
					image: currentProject?.picture || '',
					goal: currentProject?.event_purpose || '',
					events: currentProject?.project_events || '',
					tasks: currentProject?.project_tasks || '',
					provide: currentProject?.organizer_provides || '',
					city: selectOptionCity(currentProject?.city) || null,
					address: currentProject?.event_address?.address_line || '',
					date:
						rangeDate(
							currentProject?.start_datetime,
							currentProject?.end_datetime
						) || '',
					timeRange:
						rangeTime(
							currentProject?.start_datetime,
							currentProject?.end_datetime
						) || '',
					submissionDate:
						rangeDate(
							currentProject?.start_date_application,
							currentProject?.end_date_application
						) || '',
					categoryProject:
						selectOptionsCategory(currentProject?.categories) || null,
					skills: selectOptionsSkills(currentProject?.skills) || null,
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

	// Принимает строку диапазона дат и возвращает массив из даты начала и даты окончания
	// Например: DD.MM.YYYY - DD.MM.YYYY => [{DD.MM.YYYY}, {DD.MM.YYYY}]
	const dateRangeParser = (rangeDateString) => {
		let result = null;
		if (rangeDateString?.length > 0) {
			const dateStringArray = rangeDateString.split('-');
			if (dateStringArray.length > 1) {
				const beginDateString = dateStringArray[0].trim();
				const endDateString = dateStringArray[1].trim();
				result = [beginDateString, endDateString];
			}
		}
		return result;
	};

	// Принимает строку временного диапазона и возвращает массив из времени начала и времени окончания
	// Например: HH:mm - HH:mm => [{HH:mm}, {HH:mm}]
	const timeRangeParser = (rangeTimeString) => {
		let result = null;
		if (rangeTimeString?.length > 0) {
			const timeStringArray = rangeTimeString.split('-');
			if (timeStringArray.length > 1) {
				const beginTimeString = timeStringArray[0].trim();
				const endTimeString = timeStringArray[1].trim();
				result = [beginTimeString, endTimeString];
			}
		}
		return result;
	};

	// Возвращает дату и время в указанном формате
	const dateTimeFormatter = (date, time, formatString) => {
		let result = null;
		const parsePattern = 'DD.MM.YYYY HH:mm';
		if (date?.length > 0 && time?.length > 0) {
			result = moment(`${date} ${time}`, parsePattern);
		}
		return result.format(formatString);
	};

	// Преобразует все строки даты и времени в экземпляры datetime
	const startEndDateTimes = (date, timeRange, submissionDate) => {
		const dateTimeFormatPattern = 'YYYY-MM-DD HH:mm:ss';
		const dateRangeArray = dateRangeParser(date);
		console.info(`dateRangeArray`, dateRangeArray);
		const timeRangeArray = timeRangeParser(timeRange);
		console.info(`timeRangeArray`, timeRangeArray);

		let startDatetime;
		let endDatetime;
		if (dateRangeArray === null || timeRangeArray === null) {
			startDatetime = null;
			endDatetime = null;
		} else {
			startDatetime = dateTimeFormatter(
				dateRangeArray[0],
				timeRangeArray[0],
				dateTimeFormatPattern
			);
			endDatetime = dateTimeFormatter(
				dateRangeArray[1],
				timeRangeArray[1],
				dateTimeFormatPattern
			);
		}

		const submissionDateRangeArray = dateRangeParser(submissionDate);
		console.info(`submissionDateRangeArray`, submissionDateRangeArray);

		let startDateApplication;
		let endDateApplication;
		if (submissionDateRangeArray === null) {
			startDateApplication = null;
			endDateApplication = null;
		} else {
			startDateApplication = dateTimeFormatter(
				submissionDateRangeArray[0],
				'00:00',
				dateTimeFormatPattern
			);
			endDateApplication = dateTimeFormatter(
				submissionDateRangeArray[1],
				'23:59',
				dateTimeFormatPattern
			);
		}
		return {
			startDatetime,
			endDatetime,
			startDateApplication,
			endDateApplication,
		};
	};

	const handleSubmit = async (values) => {
		try {
			const {
				startDatetime,
				endDatetime,
				startDateApplication,
				endDateApplication,
			} = startEndDateTimes(
				values.date,
				values.timeRange,
				values.submissionDate
			);
			await createProject({
				name: values.name,
				description: values.description,
				picture: values.image,
				start_datetime: startDatetime,
				end_datetime: endDatetime,
				start_date_application: startDateApplication,
				end_date_application: endDateApplication,
				event_purpose: values.goal,
				event_address: {
					address_line: values.address,
					street: 'Улица',
					house: 'Дом',
					block: '',
					building: '',
				},
				project_tasks: values.tasks,
				project_events: values.events,
				organizer_provides: values.provide,
				organization: currentUser.id,
				city: values.city[0].value,
				categories: values.categoryProject.map((options) => options.value),
				skills: values.skills.map((options) => options.value),
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
			localStorage.removeItem('draft');
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
		initialValues: project,
		validationSchema,
		onSubmit: handleSubmit,
	});

	// При сохранении проекта как черновика обязательное поле только одно - Имя проекта
	// при этом localstorage очищается
	const handleDraftSaveClick = async (values, errors) => {
		try {
			if (errors?.name) {
				nameRef.current.focus();
			} else {
				const {
					startDatetime,
					endDatetime,
					startDateApplication,
					endDateApplication,
				} = startEndDateTimes(
					values.date,
					values.timeRange,
					values.submissionDate
				);

				await createProjectAsDraft({
					name: values.name,
					description: values.description || '',
					picture: values.image || null,
					start_datetime: startDatetime,
					end_datetime: endDatetime,
					start_date_application: startDateApplication,
					end_date_application: endDateApplication,
					event_purpose: values.goal || '',
					event_address:
						values.address?.length > 0
							? {
									address_line: values.address,
									street: 'улицв',
									house: '10',
									block: '',
									building: '',
							  }
							: null,
					project_tasks: values.tasks || '',
					project_events: values.events || '',
					organizer_provides: values.provide || '',
					organization: currentUser.id,
					city: values.city !== null ? values.city[0].value : null,
					categories:
						values.categoryProject?.map((options) => options.value) || [],
					skills: values.skills?.map((options) => options.value) || [],
				});
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
				type: 'error',
				state: 'info',
				title: 'Черновик не сохранён',
				errorArray: error,
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
				};
				const dataUrl = reader.readAsDataURL(file);
				console.log(dataUrl);
				setIsFocused(false);
			}
		}
	};

	const handleBlur = (e) => {
		formik.handleBlur(e);
		const currentDraft = JSON.parse(localStorage.getItem('draft')) || [];
		localStorage.setItem(
			'draft',
			JSON.stringify({ ...currentDraft, [e.target.name]: e.target.value })
		);
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
		const currentDraft = JSON.parse(localStorage.getItem('draft')) || [];
		localStorage.setItem(
			'draft',
			JSON.stringify({ ...currentDraft, [name]: selectedItem })
		);
	};

	const selectOptions = (name, selectedOption) => {
		const selectedItems = selectedOption.map((option) => ({
			label: option.label,
			value: option.value,
		}));
		formik.setFieldValue(name, selectedItems);
		const currentDraft = JSON.parse(localStorage.getItem('draft')) || [];
		localStorage.setItem(
			'draft',
			JSON.stringify({ ...currentDraft, [name]: selectedItems })
		);
	};

	// Валидация при загрузке проекта, если он был сохранен как черновик
	useEffect(() => {
		if (location.pathname !== '/profile/organizer/create-project') {
			formik.setFieldTouched('name');
			formik.setFieldTouched('description');
			formik.setFieldTouched('image');
			formik.setFieldTouched('goal');
			formik.setFieldTouched('events');
			formik.setFieldTouched('tasks');
			formik.setFieldTouched('provide');
			formik.setFieldTouched('city');
			formik.setFieldTouched('address');
			formik.setFieldTouched('date');
			formik.setFieldTouched('timeRange');
			formik.setFieldTouched('submissionDate');
			formik.setFieldTouched('categoryProject');
			formik.setFieldTouched('skills');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
							src={
								formik.values.image.length > 0
									? formik.values.image
									: projectImage
							}
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
								id="city"
								name="city"
								label="Город"
								placeholder="Выберите город"
								options={cities}
								handleChange={(selectedOption) =>
									selectOption('city', selectedOption)
								}
								value={formik.values?.city || []}
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
							<CustomDateRange
								name="date"
								label="Дата проведения"
								placeholder="01.02.2023 - 12.10.2023"
								error={formik.touched.date && Boolean(formik.errors.date)}
								helperText={formik.touched.date && formik.errors.date}
								dateValue={dateRangeParser(formik.values.date)}
								handleChange={formik.handleChange}
								onBlur={(e) => {
									formik.handleBlur(e);
									formik.handleChange(e.target.name)(e.target.value.trim());
								}}
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
							<CustomDateRange
								name="submissionDate"
								label="Дата подачи заявок"
								placeholder="02.10.2023 - 12.10.2023"
								error={
									formik.touched.submissionDate &&
									Boolean(formik.errors.submissionDate)
								}
								helperText={
									formik.touched.submissionDate && formik.errors.submissionDate
								}
								dateValue={dateRangeParser(formik.values.submissionDate)}
								handleChange={formik.handleChange}
								onBlur={(e) => {
									formik.handleBlur(e);
									formik.handleChange(e.target.name)(e.target.value.trim());
								}}
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
								id="categoryProject"
								name="categoryProject"
								label="Категория проекта"
								placeholder="Выберите категорию"
								options={projectCategories}
								handleChange={(selectedOption) =>
									selectOptions('categoryProject', selectedOption)
								}
								value={formik.values?.categoryProject || []}
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
								id="skills"
								name="skills"
								label="Навыки"
								placeholder="Выберите навыки"
								options={skills}
								handleChange={(selectedOption) =>
									selectOptions('skills', selectedOption)
								}
								value={formik.values?.skills || []}
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
							type="submit"
						/>
						<Pushbutton
							label="Сохранить как черновик"
							size="large-var"
							minWidth="380px"
							color="#333"
							backgroundColor="#FDFDFD"
							border="1px solid #A6C94F"
							onClick={() => handleDraftSaveClick(formik.values, formik.errors)}
							type="button"
						/>
					</div>
				</div>
			</form>
		</section>
	);
}

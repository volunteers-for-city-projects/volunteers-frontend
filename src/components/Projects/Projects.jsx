import './Projects.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useFormik } from 'formik';
// import { InputMask } from '@react-input/mask';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import SelectOption from '../SelectOption/SelectOption';
// import Input from '../Input/Input';
import InputDateRange from '../InputDateRange/InputDateRange';
import { Crumbs } from '../Crumbs/Crumbs';

import cardsProjectsPreview from '../../utils/cardsProjectsPreview';
import CardProject from '../CardProject/CardProject';
import Button from '../Button/Button';
import { getAllProjects } from '../../utils/api/organizer';
import { PROJECT_CARD_DISPLAY_LIMIT } from '../../utils/constants';

function Projects() {
	const [projectsOffset, setProjectsOffset] = useState(
		PROJECT_CARD_DISPLAY_LIMIT
	);
	const [projects, setProjects] = useState([]);
	const [projectsNextUrl, setProjectsNextUrl] = useState(null);

	const {
		isLoggedIn,
		setIsLoading,
		skills,
		cities,
		projectCategories,
		currentUser,
	} = useOutletContext();

	const navigate = useNavigate();
	const { role } = currentUser;

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			date: '',
			city: '',
			categories: '',
			skills: '',
		},
	});

	useEffect(() => {
		setIsLoading(true);
		getAllProjects(`?limit=${PROJECT_CARD_DISPLAY_LIMIT}&offset=0`, isLoggedIn)
			.then((dataProjects) => {
				setProjectsNextUrl(dataProjects.next);
				setProjects(dataProjects.results);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	useEffect(() => {
		setIsLoading(true);
		setProjectsOffset(6);
		let filterQuery = `?limit=${PROJECT_CARD_DISPLAY_LIMIT}`;

		if (formik.values.city) {
			const cityFilter = formik.values.city;
			filterQuery += `&city=${encodeURIComponent(cityFilter[0].value)}`;
		}
		if (formik.values.skills) {
			const skillsFilter = formik.values.skills;
			filterQuery += `&skills=${encodeURIComponent(skillsFilter[0].value)}`;
		}

		if (formik.values.categories) {
			const categoriesFilter = formik.values.categories;
			filterQuery += `&categories=${encodeURIComponent(
				categoriesFilter[0].value
			)}`;
		}

		if (formik.values.date) {
			const [startDate, endDate] = formik.values.date.split(' - ');
			filterQuery += `&start_datetime=${encodeURIComponent(startDate)} 00:00`;
			filterQuery += `&end_datetime=${encodeURIComponent(endDate)} 23:59`;
		}

		getAllProjects(filterQuery)
			.then((dataProjects) => {
				setProjectsNextUrl(dataProjects.next);
				setProjects(dataProjects.results);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(setIsLoading(false));
	}, [
		formik.values.city,
		formik.values.categories,
		formik.values.skills,
		formik.values.date,
		setIsLoading,
		setProjectsNextUrl,
	]);

	const filterProjects = async (startDate, endDate) => {
		setIsLoading(true);
		let filterQuery = `?limit=${PROJECT_CARD_DISPLAY_LIMIT}`;
		filterQuery += `&start_datetime=${encodeURIComponent(
			startDate.toISOString()
		)}`;
		filterQuery += `&end_datetime=${encodeURIComponent(endDate.toISOString())}`;

		try {
			const dataProjects = await getAllProjects(filterQuery);
			setProjects(dataProjects.results);
			setProjectsNextUrl(dataProjects.next);
		} catch (err) {
			console.log(`Ошибка: ${err}`);
		} finally {
			setIsLoading(false);
		}
	};

	function handleClickNext() {
		if (projectsNextUrl) {
			setIsLoading(true);
			setProjectsOffset(projectsOffset + PROJECT_CARD_DISPLAY_LIMIT);

			let filterQuery = `?limit=${PROJECT_CARD_DISPLAY_LIMIT}&offset=${projectsOffset}`;

			if (formik.values.city) {
				const cityFilter = formik.values.city;
				filterQuery += `&city=${encodeURIComponent(cityFilter[0].value)}`;
			}
			if (formik.values.skills) {
				const skillsFilter = formik.values.skills;
				filterQuery += `&skills=${encodeURIComponent(skillsFilter[0].value)}`;
			}

			if (formik.values.categories) {
				const categoriesFilter = formik.values.categories;
				filterQuery += `&categories=${encodeURIComponent(
					categoriesFilter[0].value
				)}`;
			}

			if (formik.values.date) {
				const [startDate, endDate] = formik.values.date.split(' - ');
				filterQuery += `&start_datetime=${encodeURIComponent(startDate)} 00:00`;
				filterQuery += `&end_datetime=${encodeURIComponent(endDate)} 23:59`;
			}

			getAllProjects(filterQuery, isLoggedIn)
				.then((data) => {
					setProjects([...projects, ...data.results]);
					setProjectsNextUrl(data.next);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
					// здесь можно подключить модалку
				})
				.finally(setIsLoading(false));
		}
	}

	return (
		<section className="projects">
			<div className="projects__container">
				<div className="projects__menu">
					<Crumbs />
				</div>
				<div className="projects__label">
					<h2 className="projects__label-title">Проекты</h2>
					<div className="projects__label-btn">
						{role === 'organizer' ? (
							<Pushbutton
								label="Создать новый проект"
								color="white"
								size="large-var"
								backgroundColor="#A6C94F"
								border="none"
								onClick={() => navigate('/profile/organizer/create-project')}
							/>
						) : (
							''
						)}
					</div>
				</div>

				<div className="projects__selects">
					<InputDateRange
						id="date"
						name="date"
						label="Дата или период"
						inputSize="small"
						placeholder="15.05.2023 – 20.05.2023"
						width={400}
						handleChange={formik.handleChange}
						value={formik.values.date}
						filterData={filterProjects}
					/>
					<SelectOption
						id="city"
						name="city"
						label="Город"
						placeholder="Выберите город"
						options={cities}
						touched={formik.touched.city}
						value={formik.values.city || []}
						handleClear={() => {
							formik.setFieldValue('city', '');
						}}
						handleChange={(option) => {
							formik.setFieldValue('city', [
								{
									label: option.label,
									value: option.value,
								},
							]);
						}}
						addCloseButton
					/>
					<SelectOption
						id="categories"
						name="categories"
						label="Категории"
						placeholder="Выберите категории"
						options={projectCategories}
						// isMulti
						width={400}
						value={formik.values.categories || []}
						touched={formik.touched.categories}
						handleClear={() => {
							formik.setFieldValue('categories', '');
						}}
						handleChange={(option) => {
							formik.setFieldValue('categories', [
								{
									label: option.label,
									value: option.value,
								},
							]);
						}}
						addCloseButton
					/>
					<SelectOption
						id="skills"
						name="skills"
						label="Навыки"
						placeholder="Выберите навыки"
						options={skills}
						// isMulti
						width={400}
						value={formik.values.skills || []}
						touched={formik.touched.skills}
						handleClear={() => {
							formik.setFieldValue('skills', '');
						}}
						handleChange={(option) => {
							formik.setFieldValue('skills', [
								{
									label: option.label,
									value: option.value,
								},
							]);
						}}
						addCloseButton
					/>
				</div>

				<div className="projects__cards">
					{projects.length > 0 &&
						projects.map((item) => (
							<Link
								key={item.id}
								className="projects__link"
								to={`/projects/${item.id}`}
							>
								<CardProject cardProject={item} />
							</Link>
						))}
				</div>
				{projectsNextUrl ? (
					<div className="projects__button">
						<Button
							className="projects__button-item"
							size="xs"
							onClick={() => handleClickNext()}
						>
							Показать еще
						</Button>
					</div>
				) : null}
			</div>
		</section>
	);
}

Projects.defaultProps = {
	projects: cardsProjectsPreview,
};

export default Projects;

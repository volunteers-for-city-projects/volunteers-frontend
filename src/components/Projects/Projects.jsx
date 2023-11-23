import './Projects.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useFormik } from 'formik';
// import { InputMask } from '@react-input/mask';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import SelectOption from '../SelectOption/SelectOption';
// import Input from '../Input/Input';
import InputDateRange from '../InputDateRange/InputDateRange';
import { Crumbs } from '../Crumbs/Crumbs';

import cardsProjectsPreview from '../../utils/cardsProjectsPreview';
import CardProject from '../CardProject/CardProject';
import { getAllProjects } from '../../utils/api/organizer';
import Button from '../Button/Button';

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

	useEffect(() => {
		setIsLoading(true);
		getAllProjects(`?limit=${PROJECT_CARD_DISPLAY_LIMIT}`, isLoggedIn)
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

	function handleClickNext() {
		if (projectsNextUrl) {
			setIsLoading(true);
			setProjectsOffset(projectsOffset + PROJECT_CARD_DISPLAY_LIMIT);
			getAllProjects(
				`?limit=${PROJECT_CARD_DISPLAY_LIMIT}&offset=${projectsOffset}`,
				isLoggedIn
			)
				.then((data) => {
					setProjects([...projects, ...data.results]);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
					// здесь можно подключить модалку
				})
				.finally(setIsLoading(false));
		}
	}

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
	function handleProject(evt, id) {
		if (!evt.target.className.includes('like')) navigate(`/projects/${id}`);
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
					/>
					<SelectOption
						id="city"
						name="city"
						label="Город"
						placeholder="Выберите город"
						options={cities}
						touched={formik.touched.city}
						value={formik.values.city || []}
						handleChange={(selectedOption) => {
							formik.setFieldValue('city', [
								{
									label: selectedOption.label,
									value: selectedOption.value,
								},
							]);
						}}
						required
					/>
					<SelectOption
						id="categories"
						name="categories"
						label="Категории"
						placeholder="Выберите категории"
						options={projectCategories}
						isMulti
						width={400}
						value={formik.values.categories || []}
						touched={formik.touched.categories}
						handleChange={(selectedOption) => {
							formik.setFieldValue(
								'categories',
								selectedOption.map((option) => ({
									label: option.label,
									value: option.value,
								}))
							);
						}}
						required
					/>
					<SelectOption
						id="skills"
						name="skills"
						label="Навыки"
						placeholder="Выберите навыки"
						options={skills}
						isMulti
						width={400}
						value={formik.values.skills || []}
						touched={formik.touched.skills}
						handleChange={(selectedOption) => {
							formik.setFieldValue(
								'skills',
								selectedOption.map((option) => ({
									label: option.label,
									value: option.value,
								}))
							);
						}}
						required
					/>
				</div>

				<div className="projects__cards">
					{projects.length > 0 &&
						projects.map((item) => (
							<div
								role="presentation"
								key={item.id}
								className="projects__link"
								onClick={(evt) => {
									handleProject(evt, item.id);
								}}
							>
								<CardProject cardProject={item} />
							</div>
						))}
				</div>
				<div className="projects__button">
					<Button
						className="projects__button-item"
						size="xs"
						onClick={() => handleClickNext()}
					>
						Показать еще
					</Button>
				</div>
			</div>
		</section>
	);
}

Projects.defaultProps = {
	projects: cardsProjectsPreview,
};

export default Projects;

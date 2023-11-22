import './Projects.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { useFormik } from 'formik';
// import { InputMask } from '@react-input/mask';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import SelectOption from '../SelectOption/SelectOption';
// import Input from '../Input/Input';
import InputDateRange from '../InputDateRange/InputDateRange';
import { Crumbs } from '../Crumbs/Crumbs';

import cardsProjectsPreview from '../../utils/cardsProjectsPreview';
import CardProject from '../CardProject/CardProject';

import { getNextPrev, getAllProjects } from '../../utils/api/organizer';

function Projects() {
	const limitAddingProjects = 6;
	const [projectsOffset, setProjectsOffset] = useState(limitAddingProjects);
	const [projects, setProjects] = useState([]);
	const [projectsNextUrl, setProjectsNextUrl] = useState(null);

	const { setIsLoading, skills, cities, projectCategories } =
		useOutletContext();

	useEffect(() => {
		setIsLoading(true);
		getAllProjects(`?limit=${limitAddingProjects}`)
			.then((dataProjects) => {
				setProjectsNextUrl(dataProjects.next);
				setProjects(dataProjects.results);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();

	function handleClickNext() {
		if (projectsNextUrl) {
			setIsLoading(true);
			setProjectsOffset(projectsOffset + limitAddingProjects);
			getNextPrev(`?limit=${limitAddingProjects}&offset=${projectsOffset}`)
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

	return (
		<section className="projects">
			<div className="projects__container">
				<div className="projects__menu">
					<Crumbs />
				</div>
				<div className="projects__label">
					<h2 className="projects__label-title">Проекты</h2>
					<div className="projects__label-btn">
						<Pushbutton
							label="Создать новый проект"
							color="white"
							size="large-var"
							minWidth="400px"
							backgroundColor="#A6C94F"
							border="none"
							onClick={() => navigate('/profile/organizer/create-project')}
						/>
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
						value={formik.values.city}
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
						value={formik.values.categories}
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
						value={formik.values.skills}
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
							<Link
								key={item.id}
								className="projects__link"
								to={`/projects/${item.id}`}
							>
								<CardProject cardProject={item} />
							</Link>
						))}
				</div>
				<div className="projects__button">
					<button className="profile__pagination-btn" onClick={handleClickNext}>
						&#62;
					</button>
				</div>
			</div>
		</section>
	);
}

Projects.defaultProps = {
	projects: cardsProjectsPreview,
};

export default Projects;

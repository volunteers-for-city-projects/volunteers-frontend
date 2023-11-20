import './Projects.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Crumbs } from '../Crumbs/Crumbs';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import SelectOption from '../SelectOption/SelectOption';
import cardsProjectsPreview from '../../utils/cardsProjectsPreview';
import CardProject from '../CardProject/CardProject';
import Button from '../Button/Button';

import { getNextPrev, getAllProjects } from '../../utils/api/organizer';

function Projects() {
	const limitAddingProjects = 6;
	const [projectsOffset, setProjectsOffset] = useState(limitAddingProjects);
	const [projects, setProjects] = useState([]);
	const [projectsNextUrl, setProjectsNextUrl] = useState(null);
	const { setIsLoading, skills, cities, projectCategories, currentUser } =
		useOutletContext();
	const navigate = useNavigate();
	const { role } = currentUser;

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
					<SelectOption
						id="date"
						name="date"
						label="Дата и время"
						placeholder="15.05.2023 – 20.05.2023"
						width={400}
						options={[]}
					/>

					<SelectOption
						id="city"
						name="city"
						label="Город"
						placeholder="Выберите город"
						width={400}
						options={cities}
					/>

					<SelectOption
						id="categories"
						name="categories"
						label="Категории"
						placeholder="Выберите категории"
						width={400}
						options={projectCategories}
					/>

					<SelectOption
						id="skills"
						name="skills"
						label="Выберите навыки"
						placeholder="Введите имя"
						width={400}
						options={skills}
					/>
				</div>

				<div className="projects__cards">
					{projects.length > 0 &&
						projects.map((item) => (
							<CardProject cardProject={item} key={item.id} />
						))}
				</div>

				<div className="projects__button">
					<Button size="sx" onClick={() => handleClickNext()}>
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

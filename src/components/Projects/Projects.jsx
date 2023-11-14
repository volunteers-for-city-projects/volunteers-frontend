import './Projects.scss';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Crumbs } from '../Crumbs/Crumbs';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import SelectOption from '../SelectOption/SelectOption';
import cardsProjectsPreview from '../../utils/cardsProjectsPreview';
import CardProject from '../CardProject/CardProject';

import { getNextPrev } from '../../utils/api/organizer';

function Projects() {
	const {
		projects,
		setProjects,
		setIsLoading,
		skills,
		cities,
		projectCategories,
	} = useOutletContext();

	const navigate = useNavigate();

	function getNewBatchProjects(url) {
		if (url) {
			setIsLoading(true);
			getNextPrev(url)
				.then((data) => {
					setProjects(data);
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
					// здесь можно подключить модалку
				})
				.finally(setIsLoading(false));
		}
	}

	function handleClickNext() {
		getNewBatchProjects(projects.next);
	}

	function handleClickPrev() {
		getNewBatchProjects(projects.previous);
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
					{projects &&
						projects.results.length > 0 &&
						projects.results.map((item) => (
							<CardProject cardProject={item} key={item.id} />
						))}
				</div>

				<div className="projects__button">
					<button className="profile__pagination-btn" onClick={handleClickPrev}>
						&#60;
					</button>
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

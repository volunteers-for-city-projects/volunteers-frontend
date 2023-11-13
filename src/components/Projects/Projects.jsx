import './Projects.scss';
import { useNavigate } from 'react-router-dom';
import { Crumbs } from '../Crumbs/Crumbs';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import SelectOption from '../SelectOption/SelectOption';
import cardsProjectsPreview from '../../utils/cardsProjectsPreview';
import CardProject from '../CardProject/CardProject';
import ProfilePagination from '../ProfilePagination/ProfilePagination';

function Projects() {
	const navigate = useNavigate();
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
						options={[]}
					/>

					<SelectOption
						id="categories"
						name="categories"
						label="Категории"
						placeholder="Выберите категории"
						width={400}
						options={[]}
					/>

					<SelectOption
						id="skills"
						name="skills"
						label="Выберите навыки"
						placeholder="Введите имя"
						width={400}
						options={[]}
					/>
				</div>

				<div className="projects__cards">
					{cardsProjectsPreview.map((item) => (
						<CardProject cardProject={item} key={item.id} />
					))}
				</div>

				<div>
					<ProfilePagination />
				</div>
			</div>
		</section>
	);
}

export default Projects;

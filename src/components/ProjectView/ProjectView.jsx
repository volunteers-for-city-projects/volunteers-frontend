import { useEffect, useState } from 'react';
import {
	useParams,
	Link,
	useOutletContext,
	useNavigate,
} from 'react-router-dom';
import arrow from '../../images/icon-strelka.svg';
import projectNull from '../../images/project-null.png';
import '../Crumbs/Crumbs.scss';
import './ProjectView.scss';
import '../../routes/router.scss';
import { getProjectById } from '../../utils/api/organizer';
import { getOrganizationInformation } from '../../utils/api/profile';
import Button from '../Button/Button';
import NotFound from '../NotFound/NotFound';

function ProjectView() {
	const { projectCategories, currentUser, isLoggedIn, setModal } =
		useOutletContext();
	const { role, id } = currentUser;
	const navigate = useNavigate();
	const { idProject } = useParams();
	const [project, setProject] = useState({
		name: '',
		event_address: {
			address_line: '',
		},
		start_date_application: '',
		end_date_application: '',
		picture: null,
		skills: [
			{
				id: null,
				name: '',
			},
		],
		categories: [],
		description: '',
		event_purpose: '',
		project_events: '',
		project_tasks: '',
		organizer_provides: '',
		organization: null,
	});
	const [organization, setOrganization] = useState({
		title: '',
	});
	const [error, setError] = useState(null);

	const crumbs = [
		{
			id: 1,
			text: 'Главная',
			path: '/',
		},
		{
			id: 2,
			text: 'Проекты',
			path: '/projects',
		},
		{
			id: 3,
			text: `Проект «${project.name.trim()}»`,
			path: `/projects/${idProject}`,
		},
	];

	const infoProject = [
		{
			id: 1,
			text: project.event_address.address_line.trim(),
		},
		{
			id: 2,
			text: `${project.start_date_application.split(' ')[0]} - ${
				project.end_date_application.split(' ')[0]
			}`,
		},
		{
			id: 3,
			text: `${project.start_date_application.split(' ')[1]} - ${
				project.end_date_application.split(' ')[1]
			}`,
		},
	];

	const matchedItems =
		project.categories.length > 0 &&
		projectCategories.filter((item) =>
			project.categories.includes(Number(item.value))
		);

	useEffect(() => {
		getProjectById(idProject)
			.then((res) => {
				setProject(res);
				getOrganizationInformation(res.organization)
					.then((result) => {
						setOrganization(result);
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => {
				console.error(err);
				setError(err);
			});
	}, [idProject]);

	const openImageEnlarge = () => {
		setModal({
			isOpen: true,
			children: (
				<img
					className="project-view__image project-view__image_enlarge"
					src={project.picture ? project.picture : projectNull}
					alt="Увеличенное фото проекта"
				/>
			),
			type: 'init',
			state: 'info',
			typeStyle: 'enlarge-image',
		});
	};

	if (error) {
		return <NotFound />;
	}

	return (
		<section className="project-view">
			<div className="project-view__container">
				<div className="project-view__container-crumbs">
					<ul className="crumbs">
						{crumbs.map((item) => (
							<li key={item.id} className="crumbs__item">
								<Link to={item.path} className="router__link">
									{item.text}
								</Link>
								{item.id !== 3 && (
									<img
										className="crumbs__separator"
										src={arrow}
										alt="стрелка"
									/>
								)}
							</li>
						))}
					</ul>
					<div className="project-view__container-icons">
						<button
							className="project-view__btn project-view__btn_type_share"
							type="button"
						>
							{' '}
						</button>
						<button
							className="project-view__btn project-view__btn_type_like"
							type="button"
						>
							{' '}
						</button>
					</div>
				</div>
				<div className="project-view__container-name-place-date">
					<div className="project-view__container-name-place">
						<h2 className="project-view__title">{`«${project.name.trim()}»`}</h2>
						<ul className="project-view__list-place">
							{infoProject.map((item) => (
								<li key={item.id} className="project-view__item">
									<p className="project-view__place">{item.text}</p>
								</li>
							))}
						</ul>
					</div>
					<p>Тут будет вычисляться статус и задаваться цвет</p>
				</div>
				<div className="project-view__container-info">
					<div className="project-view__container-image-info">
						<div className="project-view__container-image">
							<img
								className="project-view__image"
								src={project.picture ? project.picture : projectNull}
								alt="Фото проекта"
							/>
							<button
								className="project-view__btn project-view__btn_type_enlarge"
								type="button"
								onClick={openImageEnlarge}
							>
								{' '}
							</button>
						</div>
						{project.skills.length > 0 && (
							<div className="project-view__container-skills-categories">
								<p className="project-view__subtitle">
									Навыки, необходимые на проекте:
								</p>
								<ul className="project-view__list-skills-categories">
									{project.skills.map((item) => (
										<li className="project-view__skill-category" key={item.id}>
											{item.name}
										</li>
									))}
								</ul>
							</div>
						)}
						{project.categories.length > 0 && (
							<div className="project-view__container-skills-categories">
								<p className="project-view__subtitle">Категории проекта:</p>
								<ul className="project-view__list-skills-categories">
									{matchedItems.map((item) => (
										<li
											className="project-view__skill-category"
											key={item.value}
										>
											{item.label}
										</li>
									))}
								</ul>
							</div>
						)}
						{!isLoggedIn && (
							<Button
								theme="default"
								size="l"
								onClick={() =>
									// eslint-disable-next-line no-alert
									alert(
										'открывается модалка для того чтобы войти в аккаунт или зарегистрироваться'
									)
								}
								type="button"
							>
								Подать заявку на участие в проекте
							</Button>
						)}
						{isLoggedIn && role === 'volunteer' && (
							<Button
								theme="default"
								size="l"
								onClick={() =>
									// eslint-disable-next-line no-alert
									alert('открывается модалка для заполнения заявки')
								}
								type="button"
							>
								Подать заявку на участие в проекте
							</Button>
						)}
						{isLoggedIn &&
							role === 'organizer' &&
							id === project.organization && (
								<>
									<Button
										theme="default"
										size="l"
										// eslint-disable-next-line no-alert
										onClick={() => alert('открывается страничка с участниками')}
										type="button"
									>
										Участники проекта
									</Button>
									<Button
										theme="default"
										size="l"
										// eslint-disable-next-line no-alert
										onClick={() => alert('открывается страничка с заявками')}
										type="button"
									>
										Посмотреть заявки
									</Button>
									<Button
										theme="opposite"
										size="l"
										// eslint-disable-next-line no-alert
										onClick={() => alert('отменить проект')}
										type="button"
									>
										Отменить проект
									</Button>
								</>
							)}
						{isLoggedIn &&
							role === 'organizer' &&
							id !== project.organization && (
								<Button
									theme="default"
									size="l"
									onClick={() => navigate('/profile/organizer/create-project')}
									type="button"
								>
									Создать новый проект
								</Button>
							)}
					</div>
					<div className="project-view__container-common-info">
						<ul className="project-view__list-common-info">
							<li className="project-view__subtitle">{`Организатор: ${organization.title}`}</li>
							<li className="project-view__subtitle">
								Описание:
								<p className="project-view__text">{project.description}</p>
							</li>
							<li className="project-view__subtitle">
								Цель проекта:
								<p className="project-view__text">{project.event_purpose}</p>
							</li>
						</ul>
						<ul className="project-view__list-common-info">
							<li className="project-view__subtitle">
								Мероприятия:
								<p className="project-view__text">{project.project_events}</p>
							</li>
							<li className="project-view__subtitle">
								Задачи на проекте:
								<p className="project-view__text">{project.project_tasks}</p>
							</li>
							<li className="project-view__subtitle">
								Организатор предоставляет:
								<p className="project-view__text">
									{project.organizer_provides}
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProjectView;

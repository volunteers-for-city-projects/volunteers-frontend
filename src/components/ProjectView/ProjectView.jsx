import { useEffect, useState } from 'react';
import {
	Link,
	useNavigate,
	useOutletContext,
	useParams,
} from 'react-router-dom';
import arrow from '../../images/icon-strelka.svg';
import projectNull from '../../images/project-null.png';
import '../Crumbs/Crumbs.scss';
import './ProjectView.scss';
import '../../routes/router.scss';
import { getProjectById } from '../../utils/api/organizer';
import { getOrganizationInformation } from '../../utils/api/profile';
// import { editProject } from '../../utils/api/projects';
import Button from '../Button/Button';
import NotFound from '../NotFound/NotFound';
import ProjectLikeButton from '../ProjectLikeButton/ProjectLikeButton';
import FormIncome from '../FormIncome/FormIncome';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';
import ModalContent from '../ModalContent/ModalContent';
import ProjectEditButton from '../ProjectEditButton/ProjectEditButton';
import ProjectIncome from '../../classes/ProjectIncome';
import Project from '../../classes/Project';

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
		start_datetime: '',
		start_date_application: '',
		end_datetime: '',
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
		{ id: 1, text: `г. ${project.city}` },
		{
			id: 2,
			text: project.event_address.address_line.trim(),
		},
		{
			id: 3,
			text: `${project.start_datetime.split(' ')[0]} - ${
				project.end_datetime.split(' ')[0]
			}`,
		},
		{
			id: 4,
			text: `${project.start_datetime.split(' ')[1]} - ${
				project.end_datetime.split(' ')[1]
			}`,
		},
	];

	const matchedItems =
		project.categories.length > 0 &&
		projectCategories.filter((item) =>
			project.categories.includes(Number(item.value))
		);

	const [income, setIncome] = useState();

	useEffect(() => {
		getProjectById(idProject, isLoggedIn)
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
	}, [idProject, isLoggedIn]);
	useEffect(() => {
		if (role === 'volunteer') {
			ProjectIncome.load().then((incomes) => {
				if (Array.isArray(incomes)) {
					const volunteerIncome = incomes.find(
						(item) => item.volunteer.id === id && item.project.id === project.id
					);
					setIncome(volunteerIncome);
				}
			});
		}
	}, [role, id, project.id]);

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
	const openIncomeForm = () => {
		const onSubmit = (createdIncome) => {
			setModal({
				isOpen: true,
				type: 'init',
				state: 'info',
				children: (
					<ModalContent
						text="Ваша заявка принята, организатор в скором времени свяжется с вами"
						icon="success"
					/>
				),
			});
			setIncome(createdIncome);
		};
		setModal({
			isOpen: true,
			title: 'Заявка на участие в проекте',
			children: (
				<FormIncome
					currentUser={currentUser}
					onSubmit={onSubmit}
					projectId={idProject}
				/>
			),
			type: 'init',
			state: 'info',
		});
	};
	const openLoginForm = () => {
		const login = (link) => {
			setModal({ isOpen: false });
			navigate(link);
		};
		setModal({
			isOpen: true,
			children: (
				<ModalContent
					icon="key"
					text="Для подачи заявки необходимо авторизоваться"
				>
					<Button theme="default" size="s" onClick={() => login('/login')}>
						Войти
					</Button>
					<Button
						theme="neutral"
						size="s"
						onClick={() => login('/registration/volunteer')}
					>
						Регистрация
					</Button>
				</ModalContent>
			),
			type: 'init',
			state: 'info',
		});
	};

	const handleCancelProject = () => {
		// eslint-disable-next-line no-alert
		alert('измеение статуса проекта');
		// editProject(idProject, {
		// 	status: 'canceled_by_organizer',
		// })
		// 	.then(() => {
		// 		project.status = "canceled_by_organizer'";
		// 	})
		// 	.catch((err) => console.log * err);
	};

	if (error) {
		return <NotFound />;
	}
	/** @type {Project} objProject */
	const objProject = project ? Project.createByData(project) : null;
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
						{isLoggedIn && (
							<ProjectLikeButton
								parent="project-view"
								projectId={project.id}
								isFavorited={project.is_favorited}
							/>
						)}
					</div>
				</div>
				<div className="project-view__container-name-place-date">
					<h2 className="project-view__title">
						{`«${project.name.trim()}»`}
						{isLoggedIn &&
							role === 'organizer' &&
							id === project.organization && (
								<ProjectEditButton
									parent="project-view"
									projectId={project.id}
								/>
							)}
					</h2>
					<ShowProjectStatus
						cardProject={project}
						className={`project-view__status ${
							project.status === 'editing' ? 'project-view__status_hovered' : ''
						}`}
					/>
					<p className="project-view__status-push-message">
						{`Время начала заявок начнется в ${project.start_date_application
							.split(' ')
							.reverse()
							.join(' ')}`}{' '}
						<br />
						{`время окончания подачи заявок ${project.end_date_application
							.split(' ')
							.reverse()
							.join(' ')}`}
					</p>
					<ul className="project-view__list-place">
						{infoProject.map((item) => (
							<li key={item.id} className="project-view__item">
								<p className="project-view__place">{item.text}</p>
							</li>
						))}
					</ul>
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

						{objProject &&
							role !== 'organizer' &&
							objProject.isInIncomesPeriod() && (
								<Button
									theme={income ? 'neutral' : 'default'}
									size="l"
									onClick={isLoggedIn ? openIncomeForm : openLoginForm}
									type="button"
									disabled={income !== undefined}
								>
									{income
										? 'Заявка на участие подана'
										: 'Подать заявку на участие в проекте'}
								</Button>
							)}
						{isLoggedIn &&
							role === 'organizer' &&
							id === project.organization && (
								<>
									{project.status.includes('closed') && (
										<>
											<p className="project-view__photo-message">
												Вы можете добавить фото мероприятий завершённого проекта
											</p>
											<Button
												theme="default"
												size="l"
												// eslint-disable-next-line no-alert
												onClick={() => alert('Добавить Фотографии')}
												type="button"
											>
												Добавить Фотографии
											</Button>
										</>
									)}
									<Button
										theme="default"
										size="l"
										// eslint-disable-next-line no-alert
										onClick={() => navigate('participants')}
										type="button"
									>
										Участники проекта
									</Button>
									{!project.status.includes('closed') && (
										<Button
											theme="default"
											size="l"
											// eslint-disable-next-line no-alert
											onClick={() => navigate('incomes')}
											type="button"
										>
											Посмотреть заявки
										</Button>
									)}
									{!project.status.includes('closed') && (
										<Button
											theme="opposite"
											size="l"
											// eslint-disable-next-line no-alert
											onClick={handleCancelProject}
											type="button"
										>
											Отменить проект
										</Button>
									)}
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

import { useEffect, useState } from 'react';
import {
	useNavigate,
	useOutletContext,
	useParams,
	useRouteLoaderData,
} from 'react-router-dom';
import projectNull from '../../images/project-null.png';
import './ProjectView.scss';
import '../../routes/router.scss';
import { getOrganizationInformation } from '../../utils/api/profile';
// import { editProject } from '../../utils/api/projects';
import Button from '../Button/Button';
import FormIncome from '../FormIncome/FormIncome';
import ModalContent from '../ModalContent/ModalContent';
import ProjectIncome from '../../classes/ProjectIncome';

function ProjectView() {
	const project = useRouteLoaderData('project');

	const context = useOutletContext();
	const { projectCategories, currentUser, isLoggedIn, setModal } = context;
	const { role, id } = currentUser;
	const navigate = useNavigate();
	const { idProject } = useParams();

	const [organization, setOrganization] = useState({
		title: '',
	});

	const matchedItems =
		project.categories.length > 0 &&
		projectCategories.filter((item) =>
			project.categories.includes(Number(item.value))
		);

	const [income, setIncome] = useState();

	useEffect(() => {
		getOrganizationInformation(project.organization)
			.then((result) => {
				setOrganization(result);
			})
			.catch((err) => console.error(err));
	}, [project]);
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

	return (
		<div className="project-view">
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
								<li className="project-view__skill-category" key={item.value}>
									{item.label}
								</li>
							))}
						</ul>
					</div>
				)}

				{!isLoggedIn ||
					(role === 'volunteer' && (
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
					))}
				{isLoggedIn && role === 'organizer' && id === project.organization && (
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
				{isLoggedIn && role === 'organizer' && id !== project.organization && (
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
						<p className="project-view__text">{project.organizer_provides}</p>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ProjectView;

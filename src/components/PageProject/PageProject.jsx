import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { Crumbs } from '../Crumbs/Crumbs';
import '../Crumbs/Crumbs.scss';
import './PageProject.scss';
import '../../routes/router.scss';

import ProjectLikeButton from '../ProjectLikeButton/ProjectLikeButton';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';
import ProjectEditButton from '../ProjectEditButton/ProjectEditButton';

function PageProject() {
	const project = useLoaderData();
	const context = useOutletContext();
	const { currentUser, isLoggedIn } = context;
	const { role, id } = currentUser;

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

	return (
		<section className="page-project">
			<div className="page-project__container-crumbs">
				<Crumbs />
				<div className="page-project__container-icons">
					<button
						className="page-project__btn page-project__btn_type_share"
						type="button"
					>
						{' '}
					</button>
					{isLoggedIn && (
						<ProjectLikeButton
							parent="page-project"
							projectId={project.id}
							isFavorited={project.is_favorited}
						/>
					)}
				</div>
			</div>
			<div className="page-project__container-name-place-date">
				<h2 className="page-project__title">
					{`«${project.name.trim()}»`}
					{isLoggedIn &&
						role === 'organizer' &&
						id === project.organization && (
							<ProjectEditButton parent="page-project" projectId={project.id} />
						)}
				</h2>
				<ShowProjectStatus
					cardProject={project}
					className={`page-project__status ${
						project.status === 'editing' ? 'page-project__status_hovered' : ''
					}`}
				/>
				<p className="page-project__status-push-message">
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
				<ul className="page-project__list-place">
					{infoProject.map((item) => (
						<li key={item.id} className="page-project__item">
							<p className="page-project__place">{item.text}</p>
						</li>
					))}
				</ul>
			</div>
			<Outlet context={{ ...context }} />
		</section>
	);
}

export default PageProject;

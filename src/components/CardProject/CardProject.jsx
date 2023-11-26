import PropTypes from 'prop-types';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import './CardProject.scss';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';
import ProjectDeleteButton from '../ProjectDeleteButton/ProjectDeleteButton';
import ProjectLikeButton from '../ProjectLikeButton/ProjectLikeButton';
import ProjectEditButton from '../ProjectEditButton/ProjectEditButton';

function CardProject({ cardProject }) {
	const navigate = useNavigate();
	const { isLoggedIn } = useOutletContext();

	const {
		name: nameProject,
		city,
		start_datetime: day,
		end_datetime: time,
		picture: image,
		id: projectId,
		is_favorited: isFavorited,
	} = cardProject;

	const location = useLocation();
	const pageProfile = location.pathname === '/profile/organizer';
	function handleProject(evt) {
		if (!/edit|like|delete/.test(evt.target.className))
			navigate(`/projects/${cardProject.id}`);
	}
	return (
		<article
			role="presentation"
			onClick={handleProject}
			className="card__project"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="card__container">
				<div className="card__overlay" />
				<div className="card__info">
					<div className="card__status">
						<ShowProjectStatus cardProject={cardProject} />
						<div className="card__status-buttons">
							{isLoggedIn && (
								<ProjectLikeButton
									parent="card"
									projectId={projectId}
									isFavorited={isFavorited}
								/>
							)}

							{pageProfile ? <ProjectDeleteButton projectId={projectId} /> : ''}
							{pageProfile ? (
								// <button className="card__status-btn"> </button>
								<ProjectEditButton projectId={projectId} parent="card" />
							) : (
								''
							)}
							{pageProfile ? (
								<ProjectLikeButton
									parent="profile-org"
									projectId={projectId}
									isFavorited={isFavorited}
								/>
							) : (
								''
							)}
						</div>
					</div>
					<div className="card__description">
						<div className="card__name">
							<p className="card__name-title">{nameProject}</p>
						</div>
						<div className="card__data">
							<p className="card__data-city">{`г. ${city}`}</p>
							<p className="card__data-day">{day?.split(' ')[0]}</p>
							<p className="card__data-time">{`${day?.split(' ')[1]} - ${
								time?.split(' ')[1]
							}`}</p>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default CardProject;

CardProject.propTypes = {
	cardProject: PropTypes.shape({
		status: PropTypes.string,
		name: PropTypes.string,
		city: PropTypes.string,
		start_datetime: PropTypes.string,
		end_datetime: PropTypes.string,
		isModeration: PropTypes.bool,
		picture: PropTypes.string,
		id: PropTypes.number,
		is_favorited: PropTypes.bool,
	}),
};

CardProject.defaultProps = {
	cardProject: PropTypes.shape({
		status: '',
		name: '',
		city: '',
		start_datetime: '',
		end_datetime: '',
		isModeration: true,
		image: '',
		cityName: '',
	}),
};

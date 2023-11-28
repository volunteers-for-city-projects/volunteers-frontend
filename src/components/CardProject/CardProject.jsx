import PropTypes from 'prop-types';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import './CardProject.scss';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';
import ProjectLikeButton from '../ProjectLikeButton/ProjectLikeButton';
import {
	EDITING,
	REJECTED,
	PROJECT_COMPLETED,
	ROLE_ORGANIZER,
} from '../../utils/constants';

function CardProject({ cardProject, onCardDelete, onCardDisliked }) {
  const navigate = useNavigate();
	const { isLoggedIn, currentUser } = useOutletContext();

	const {
		name: nameProject,
		city,
		start_datetime: day,
		end_datetime: time,
		picture: image,
		status,
		status_approve: statusApprove,
		organization,
	} = cardProject;

	const location = useLocation();

	const pageProfileOrg = location.pathname === '/profile/organizer';
	const pageProfileVol = location.pathname === '/profile/volunteer';
	const editFlag =
		currentUser.role === ROLE_ORGANIZER &&
		currentUser.id === organization &&
		status !== PROJECT_COMPLETED;
	const deleteFlag =
		currentUser.role === ROLE_ORGANIZER &&
		currentUser.id === organization &&
		(statusApprove === EDITING || statusApprove === REJECTED);

	function handleProject(evt) {
		if (!/edit|like|delete/.test(evt.target.className))
			navigate(`/projects/${cardProject.id}`);
	}

	function handleClickDelete() {
		onCardDelete(cardProject);
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
									cardProject={cardProject}
									onCardDisliked={onCardDisliked}
								/>
							)}

							{pageProfileOrg && deleteFlag ? (
								<button
									className="project__delete-button"
									onClick={handleClickDelete}
									type="button"
								>
									{' '}
								</button>
							) : (
								''
							)}

							{pageProfileOrg && editFlag ? (
								<button className="card__status-btn"> </button>
							) : (
								''
							)}
							{pageProfileOrg || pageProfileVol ? (
								<ProjectLikeButton
									parent="profile-org"
									cardProject={cardProject}
									onCardDisliked={onCardDisliked}
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
		status_approve: PropTypes.string,
		name: PropTypes.string,
		city: PropTypes.string,
		start_datetime: PropTypes.string,
		end_datetime: PropTypes.string,
		isModeration: PropTypes.bool,
		picture: PropTypes.string,
		id: PropTypes.number,
		is_favorited: PropTypes.bool,
		organization: PropTypes.number,
	}),
	onCardDelete: PropTypes.func,
	onCardDisliked: PropTypes.func,
};

CardProject.defaultProps = {
	cardProject: PropTypes.shape({
		status: '',
		status_approve: '',
		name: '',
		city: '',
		start_datetime: '',
		end_datetime: '',
		isModeration: true,
		picture: '',
		cityName: '',
	}),
	onCardDelete: undefined,
	onCardDisliked: undefined,
};

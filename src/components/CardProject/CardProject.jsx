import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './CardProject.scss';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';
import ProjectDeleteButton from '../ProjectDeleteButton/ProjectDeleteButton';

function CardProject({ cardProject }) {
	const {
		name: nameProject,
		city,
		start_datetime: day,
		end_datetime: time,
		picture: image,
		id: projectId,
	} = cardProject;

	const location = useLocation();
	const pageProfile = location.pathname === '/profile/organizer';

	return (
		<article
			className="card__project"
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="card__container">
				<div className="card__overlay" />
				<div className="card__info">
					<div className="card__status">
						<ShowProjectStatus cardProject={cardProject} />
						<div className="card__status-buttons">
							{/*  блок для трёх кнопок: редактировать, удалить, лайк */}
							{pageProfile ? <ProjectDeleteButton projectId={projectId} /> : ''}
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

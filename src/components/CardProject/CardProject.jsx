import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './CardProject.scss';
import basket from '../../images/basket.svg';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';

function CardProject({ cardProject }) {
	const location = useLocation();
	const pageProfile = location.pathname === '/profile/organizer';
	const {
		// status,
		name: nameProject,
		city,
		start_datetime: day,
		//	end_datetime: time,
		// isModeration,
		picture: image,
	} = cardProject;

	/* 	const baseStatusClassName = 'card__status-count';
	const moderStatusClassName = 'card__status-count_moder'; */

	// const statusClassName = `${baseStatusClassName} ${isModeration ? moderStatusClassName : ''
	// 	}`;

	return (
		<article
			className="card__project"
			style={{ backgroundImage: `url(${image})` }}
		>
			<ul className="card__info">
				<div className="card__overlay" />
				<li className="card__status">
					{/* <p className={statusClassName}>{status}</p> */}
					<ShowProjectStatus cardProject={cardProject} />
					{pageProfile ? (
						<img
							className="card__status-icon"
							src={basket}
							alt="редактировать"
						/>
					) : null}
				</li>
				<li className="card__name">
					<p className="card__name-title">{nameProject}</p>
				</li>
				<li className="card__data">
					<p className="card__data-city">{city}</p>
					<p className="card__data-day">{day}</p>
					<p className="card__data-time">{/* time */}</p>
				</li>
			</ul>
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

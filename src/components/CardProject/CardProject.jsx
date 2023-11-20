import PropTypes from 'prop-types';
import { useOutletContext, useLocation } from 'react-router-dom'; //
import './CardProject.scss';
// import basket from '../../images/basket.svg'; // иконка корзинки
import like from '../../images/like.svg';
import ShowProjectStatus from '../ShowProjectStatus/ShowProjectStatus';

function CardProject({ cardProject }) {
	const { isLoggedIn } = useOutletContext();
	const location = useLocation();
	const pageProfile = location.pathname === '/profile/organizer';
	const {
		name: nameProject,
		city,
		start_datetime: day,
		end_datetime: time,
		picture: image,
	} = cardProject;

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

						{isLoggedIn || pageProfile ? (
							<button
								className="card__status-btn"
								style={{ backgroundImage: `url(${like})` }}
							>
								{' '}
							</button>
						) : null}
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

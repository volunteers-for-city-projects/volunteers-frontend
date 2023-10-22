import PropTypes from 'prop-types';
import './CardProject.scss';
import pensil from '../../images/pensil.svg';

function CardProject({ cardProject }) {
	const { status, nameProject, city, day, time } = cardProject;
	return (
		<article className="card__project">
			<ul className="card__info">
				<li className="card__status">
					<p className="card__status-count">{status}</p>
					<img className="card__status-icon" src={pensil} alt="редактировать" />
				</li>
				<li className="card__name">
					<p className="card__name-title">{nameProject}</p>
				</li>
				<li className="card__data">
					<p className="card__data-city">{city}</p>
					<p className="card__data-day">{day}</p>
					<p className="card__data-time">{time}</p>
				</li>
			</ul>
		</article>
	);
}

export default CardProject;

CardProject.propTypes = {
	cardProject: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			status: PropTypes.string.isRequired,
			nameProject: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			day: PropTypes.string.isRequired,
			time: PropTypes.string.isRequired,
		})
	).isRequired,
};

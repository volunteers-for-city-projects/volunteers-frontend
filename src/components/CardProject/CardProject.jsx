import PropTypes from 'prop-types';
import './CardProject.scss';
import pensil from '../../images/pensil.svg';

function CardProject({ cardProject }) {
	const { status, nameProject, city, day, time, isModeration, image } =
		cardProject;
	const baseStatusClassName = 'card__status-count';
	const moderStatusClassName = 'card__status-count_moder';

	const statusClassName = `${baseStatusClassName} ${
		isModeration ? moderStatusClassName : ''
	}`;

	return (
		<article
			className="card__project"
			style={{ backgroundImage: `url(${image})` }}
		>
			<ul className="card__info">
				<div className="card__overlay" />
				<li className="card__status">
					<p className={statusClassName}>{status}</p>
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
	cardProject: PropTypes.shape({
		status: PropTypes.string,
		nameProject: PropTypes.string,
		city: PropTypes.string,
		day: PropTypes.string,
		time: PropTypes.string,
		isModeration: PropTypes.bool,
		image: PropTypes.string,
	}),
};

CardProject.defaultProps = {
	cardProject: PropTypes.shape({
		status: '',
		nameProject: '',
		city: '',
		day: '',
		time: '',
		isModeration: true,
		image: '',
	}),
};

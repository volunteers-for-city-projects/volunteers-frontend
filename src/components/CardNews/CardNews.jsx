import PropTypes from 'prop-types';
import './CardNews.scss';

function CardNews({ card }) {
	return (
		<article className="news__cards-item">
			<div className="news__card-image">
				<button className="news__card-button">{card.tag}</button>
			</div>
			<h3 className="news__card-description">{card.title}</h3>
			<p className="news__card-date">{card.date}</p>
		</article>
	);
}

CardNews.propTypes = {
	card: PropTypes.shape({
		tag: PropTypes.string,
		title: PropTypes.string,
		date: PropTypes.string,
	}),
};

CardNews.defaultProps = {
	card: PropTypes.shape({
		tag: '',
		title: '',
		date: '',
	}),
};

export default CardNews;

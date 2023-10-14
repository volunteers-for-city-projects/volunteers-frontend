import PropTypes from 'prop-types';
import './CardValues.scss';

function CardValues({ cardValues }) {
	const { title, description } = cardValues;
	return (
		<article className="our-values__item">
			<h3 className="our-values__item-title">{title}</h3>
			<p className="our-values__item-subtitle">{description}</p>
		</article>
	);
}

CardValues.propTypes = {
	cardValues: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
	}),
};

CardValues.defaultProps = {
	cardValues: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
	}),
};

export default CardValues;

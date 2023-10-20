import PropTypes from 'prop-types';
import './News.scss';
import Slider from '../Slider/Slider';
import { cardsArray } from '../../utils/data';

function News({ news }) {
	return (
		<section className="news" id="news">
			<div className="news__container">
				<div className="news__wrapper">
					<h2 className="news__wrapper-title">Новости</h2>
					<button className="news__wrapper-button">Смотреть все новости</button>
				</div>
				<div className="news__cards">
					<Slider news={news} />
				</div>
			</div>
		</section>
	);
}

News.propTypes = {
	news: PropTypes.arrayOf(
		PropTypes.shape({
			tags: PropTypes.arrayOf(PropTypes.string),
			title: PropTypes.string,
			date: PropTypes.string,
		})
	),
};

News.defaultProps = {
	news: cardsArray,
};

export default News;

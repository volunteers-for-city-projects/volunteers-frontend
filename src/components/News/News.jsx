// import PropTypes from 'prop-types';
import './News.scss';
import Slider from '../Slider/Slider';

function News(card) {
	return (
		<section className="news">
			<div className="news__container">
				<div className="news__wrapper">
					<h2 className="news__wrapper-title">Новости</h2>
					<button className="news__wrapper-button">Смотреть все новости</button>
				</div>
				<div className="news__cards">
					<Slider card={card} />
				</div>
			</div>
		</section>
	);
}

export default News;

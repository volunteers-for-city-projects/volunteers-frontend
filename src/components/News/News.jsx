import PropTypes from 'prop-types';
import './News.scss';
import Slider from '../Slider/Slider';
import { cardsArray } from '../../utils/data';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function News({ news }) {
	return (
		<section className="news" id="news">
			<div className="news__container">
				<div className="news__container-block">
					<div className="news__wrapper">
						<h2 className="news__wrapper-title">Новости</h2>
						<Pushbutton
							label="Смотреть все новости"
							backgroundColor="#A6C94F"
							size="large-var"
							border="none"
							color="#FFF"
							minWidth="277px"
						/>
					</div>
					<div className="news__cards">
						<Slider news={news} />
					</div>
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

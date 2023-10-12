import './News.scss';
import Slider from '../slider';

function News() {
	return (
		<section className="news">
			<div className="news__container">
				<div className="news__wrapper">
					<h2 className="news__wrapper-title">Новости</h2>
					<button className="news__wrapper-button">Смотреть все новости</button>
				</div>
				<ul className="news__cards">
					<Slider />
				</ul>
			</div>
		</section>
	);
}

export default News;

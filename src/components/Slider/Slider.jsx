import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';
// import cardsArray from '../../utils/cardsArray';
import CardNews from '../CardNews/CardNews';
import cardsArray from '../../utils/cardsArray';

function Slider({ news }) {
	return (
		<Swiper
			spaceBetween={20}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			{news &&
				news.map((card) => (
					<SwiperSlide key={card.cardId}>
						<CardNews card={card} />
					</SwiperSlide>
				))}
		</Swiper>
	);
}

Slider.propTypes = {
	news: PropTypes.arrayOf(
		PropTypes.shape({
			tags: PropTypes.arrayOf(PropTypes.string),
			title: PropTypes.string,
			date: PropTypes.string,
		})
	),
};

Slider.defaultProps = {
	news: cardsArray,
};

export default Slider;

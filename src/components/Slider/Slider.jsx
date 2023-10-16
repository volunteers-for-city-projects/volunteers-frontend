// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';
import cardsArray from '../../utils/cardsArray';
import CardNews from '../CardNews/CardNews';

function Slider() {
	return (
		<Swiper
			spaceBetween={20}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			{cardsArray.map((card) => (
				<SwiperSlide key={card.cardId}>
					<CardNews card={card} />
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export default Slider;

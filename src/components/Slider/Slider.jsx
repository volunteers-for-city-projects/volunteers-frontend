// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';

function Slider() {
	return (
		<Swiper
			spaceBetween={50}
			slidesPerView={3}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			<SwiperSlide>
				<li className="news__cards-item">
					<div className="news__card-image">
						<button className="news__card-button">#ЛучшеВмecте</button>
					</div>
					<h3 className="news__card-description">
						Молодёжь Южного Урала помогает семьям военнослужащих в сёлах и
						деревнях
					</h3>
					<p className="news__card-date">23.04.23</p>
				</li>
			</SwiperSlide>
			<SwiperSlide>
				<li className="news__cards-item">
					<div className="news__card-image">
						<button className="news__card-button">#ЛучшеВмecте</button>
					</div>
					<h3 className="news__card-description">
						Обновление закона «О благотворительной деятельности и
						добровольчестве»
					</h3>
					<p className="news__card-date">12.06.23</p>
				</li>
			</SwiperSlide>
			<SwiperSlide>
				<li className="news__cards-item">
					<div className="news__card-image">
						<button className="news__card-button">#ЛучшеВмecте</button>
					</div>
					<h3 className="news__card-description">
						Более 500 уникальных проектов из 95 стран представлены на
						Международной Премии
					</h3>
					<p className="news__card-date">23.04.23</p>
				</li>
			</SwiperSlide>
			<SwiperSlide>
				<li className="news__cards-item">
					<div className="news__card-image">
						<button className="news__card-button">#ЛучшеВмecте</button>
					</div>
					<h3 className="news__card-description">
						Молодёжь Южного Урала помогает семьям военнослужащих в сёлах и
						деревнях
					</h3>
					<p className="news__card-date">23.04.23</p>
				</li>
			</SwiperSlide>

			<SwiperSlide>
				<li className="news__cards-item">
					<div className="news__card-image">
						<button className="news__card-button">#ЛучшеВмecте</button>
					</div>
					<h3 className="news__card-description">
						Обновление закона «О благотворительной деятельности и
						добровольчестве»
					</h3>
					<p className="news__card-date">12.06.23</p>
				</li>
			</SwiperSlide>
		</Swiper>
	);
}

export default Slider;

import './News.css';

function News() {
	return (
		<section className="news">
			<div className="news__container">
				<h2 className="news__title">Новости</h2>
				<ul className="news__cards">
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
				</ul>
			</div>
		</section>
	);
}

export default News;

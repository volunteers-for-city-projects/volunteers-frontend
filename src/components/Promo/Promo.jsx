import './Promo.scss';

function Promo() {
	return (
		<section className="promo">
			<div className="promo__container">
				<h1 className="promo__title">ЛучшеВместе</h1>
				<p className="promo__subtitle">Слоган платформы?</p>
				<ul className="promo__list">
					<li className="promo__item">
						<h2 className="promo__item-title">864</h2>
						<p className="promo__item-subtitle">проекта</p>
					</li>
					<li className="promo__item">
						<h2 className="promo__item-title">18 567</h2>
						<p className="promo__item-subtitle">волонтеров</p>
					</li>
					<li className="promo__item">
						<h2 className="promo__item-title">1372</h2>
						<p className="promo__item-subtitle">организации</p>
					</li>
				</ul>
			</div>
		</section>
	);
}

export default Promo;

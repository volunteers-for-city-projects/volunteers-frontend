import PropTypes from 'prop-types';
import './Promo.scss';

function Promo({ plarformPromo }) {
	const { projectCount, volunteersCount, organizersCount } = plarformPromo;
	return (
		<section className="promo">
			<div className="promo__container">
				<h1 className="promo__title">ЛучшеВместе</h1>
				<p className="promo__subtitle">
					Городские инициативы - шаг к переменам
				</p>
				<ul className="promo__list">
					<li className="promo__item">
						<h2 className="promo__item-title">{projectCount}</h2>
						<p className="promo__item-subtitle">проекта</p>
					</li>
					<li className="promo__item">
						<h2 className="promo__item-title">{volunteersCount}</h2>
						<p className="promo__item-subtitle">волонтеров</p>
					</li>
					<li className="promo__item">
						<h2 className="promo__item-title">{organizersCount}</h2>
						<p className="promo__item-subtitle">организации</p>
					</li>
				</ul>
			</div>
		</section>
	);
}

Promo.propTypes = {
	plarformPromo: PropTypes.shape({
		projectCount: PropTypes.number,
		volunteersCount: PropTypes.number,
		organizersCount: PropTypes.number,
	}),
};

Promo.defaultProps = {
	plarformPromo: {
		projectCount: 0,
		volunteersCount: 0,
		organizersCount: 0,
	},
};

export default Promo;

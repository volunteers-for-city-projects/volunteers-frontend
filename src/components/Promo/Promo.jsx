import PropTypes from 'prop-types';
import { useNavigate, useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import './Promo.scss';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import nounsDeclension from '../../utils/declension';

function Promo({ plarformPromo }) {
	const { projectCount, volunteersCount, organizersCount } = plarformPromo;
	const { isLoggedIn } = useOutletContext();
	const navigate = useNavigate();

	return (
		<section className="promo">
			<div className="promo__container">
				<h1 className="promo__title">ЛучшеВместе</h1>
				<p className="promo__subtitle">
					Городские инициативы — шаг к переменам
				</p>
				{!isLoggedIn && (
					<div className="promo__buttons">
						<Pushbutton
							label="Стать оранизатором"
							backgroundColor="#A6C94F"
							size="pre-large-var"
							border="none"
							color="#FFF"
							minWidth="286px"
							onClick={() => navigate('/registration/organizer')}
						/>
						<Pushbutton
							label="Стать волонтёром"
							backgroundColor="#FFF"
							size="pre-large-var"
							border="1px solid #A6C94F"
							color="#3F3F3F"
							minWidth="286px"
							onClick={() => navigate('/registration/volunteer')}
						/>
					</div>
				)}
				<ul
					className={clsx('promo__list', {
						promo__list_type_login: isLoggedIn,
					})}
				>
					<li className="promo__item">
						<h2 className="promo__item-title">{projectCount}</h2>
						<p className="promo__item-subtitle">
							{nounsDeclension(projectCount, ['проект', 'проекта', 'проектов'])}
						</p>
					</li>
					<li className="promo__item">
						<h2 className="promo__item-title">{volunteersCount}</h2>
						<p className="promo__item-subtitle">
							{nounsDeclension(volunteersCount, [
								'волонтер',
								'волонтера',
								'волонтеров',
							])}
						</p>
					</li>
					<li className="promo__item">
						<h2 className="promo__item-title">{organizersCount}</h2>
						<p className="promo__item-subtitle">
							{nounsDeclension(organizersCount, [
								'организация',
								'организации',
								'организаций',
							])}
						</p>
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

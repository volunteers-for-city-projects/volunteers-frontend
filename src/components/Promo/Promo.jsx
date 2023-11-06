import PropTypes from 'prop-types';
import {
	useNavigate,
	useOutletContext,
	useSearchParams,
} from 'react-router-dom';
import clsx from 'clsx';
import './Promo.scss';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function Promo({ plarformPromo }) {
	const { projectCount, volunteersCount, organizersCount } = plarformPromo;
	const { isLoggedIn } = useOutletContext();
	const navigate = useNavigate();
	const [searchParam, setSearchParam] = useSearchParams();

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
							onClick={() => {
								navigate('/registration');
								searchParam.set('role', 'organizer');
								setSearchParam(searchParam);
							}}
						/>
						<Pushbutton
							label="Стать волонтёром"
							backgroundColor="transparent"
							size="pre-large-var"
							border="1px solid #A6C94F"
							color="#3F3F3F"
							minWidth="286px"
							onClick={() => {
								navigate('/registration');
								searchParam.set('role', 'volunteer');
								setSearchParam(searchParam);
							}}
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

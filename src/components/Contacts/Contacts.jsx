import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Contacts.scss';
import telegram from '../../images/icon-tg.svg';
import vkontakte from '../../images/icon-vk.svg';

function Contacts({ type }) {
	return (
		<div className="contacts">
			{type === 'main' && <h2 className="contacts__title">Контакты</h2>}
			<ul className={`contacts__list contacts__list_type_${type}`}>
				<li className="contacts__item">
					<p className={`contacts__subtitle contacts__subtitle_type_${type}`}>
						Почта тех. поддержки
					</p>
					<p className={`contacts__info contacts__info_type_${type}`}>
						info@bettertogether.ru
					</p>
				</li>
				<li className="contacts__item">
					<p className={`contacts__subtitle contacts__subtitle_type_${type}`}>
						Лучше вместе в соц. сетях
					</p>
					<ul className="contacts__icon-list">
						<li>
							<Link className="contacts__link" to="/#">
								<img className="contacts__icon" src={telegram} alt="telegram" />
							</Link>
						</li>
						<li>
							<Link className="contacts__link" to="/#">
								<img
									className="contacts__icon"
									src={vkontakte}
									alt="vkontakte"
								/>
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}

Contacts.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Contacts;

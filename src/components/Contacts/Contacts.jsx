import PropTypes from 'prop-types';
import './Contacts.scss';
import telegram from '../../images/icon-tg.svg';
import vkontakte from '../../images/icon-vk.svg';

function Contacts({ type, platformEmail }) {
	return (
		<div className="contacts">
			{type === 'main' && <h2 className="contacts__title">Контакты</h2>}
			<ul className={`contacts__list contacts__list_type_${type}`}>
				<li className="contacts__item">
					<p className={`contacts__subtitle contacts__subtitle_type_${type}`}>
						Почта тех. поддержки
					</p>
					<a
						className={`contacts__info contacts__info_type_${type}`}
						href={`mailto:${platformEmail}`}
					>
						{platformEmail}
					</a>
				</li>
				<li className="contacts__item">
					<p className={`contacts__subtitle contacts__subtitle_type_${type}`}>
						Лучше вместе в соц. сетях
					</p>
					<ul className="contacts__icon-list">
						<li>
							<a
								className="contacts__link"
								href="https://web.telegram.org/k/"
								target="_blank"
								rel="noreferrer"
							>
								<img className="contacts__icon" src={telegram} alt="telegram" />
							</a>
						</li>
						<li>
							<a
								className="contacts__link"
								href="https://vk.com/"
								target="_blank"
								rel="noreferrer"
							>
								<img
									className="contacts__icon"
									src={vkontakte}
									alt="vkontakte"
								/>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}

Contacts.propTypes = {
	type: PropTypes.string.isRequired,
	platformEmail: PropTypes.string.isRequired,
};

export default Contacts;

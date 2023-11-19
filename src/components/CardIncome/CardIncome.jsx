import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import './CardIncome.scss';
import { bemClassHelper } from '../../utils/utils';

import imgProfile from '../../images/fotoProfile.svg';
import imgOnRemoveWindow from '../../images/modals/wood.png';

const handleError = (e) => {
	console.error(e); // TODO display error
};
const handleSuccess = (e) => {
	console.log(e); // TODO display message
};
/**
 * @typedef {import('../../classes/ProjectIncome').default} ProjectIncome
 * @param {Object} obj
 * @param {ProjectIncome} obj.income
 * @param {''|'accepted'} obj.layout
 * @returns
 */
function CardIncome({ income, layout }) {
	const [modal, setModal] = useState();
	if (!income) return '';

	/* Вспомогательная функция для формирования классов */
	const baseClass = 'card-income';
	const bem = bemClassHelper(baseClass);

	const { volunteer } = income;

	const fio = volunteer.user.getFullName();
	const modalParam = {
		isOpen: true,
		type: 'init',
		state: 'info',
		title: '',
		children: '',
	};

	/* переменные для работы с модалкми */
	const closeModal = () => setModal();
	const openModal = (modalTitle, modalContent) =>
		setModal({ ...modalParam, children: modalContent, title: modalTitle });

	/* actions */
	const handleReject = () => {
		income.reject().then(handleSuccess).catch(handleError);
	};
	const handleAccept = () => {
		income.accept().then(handleSuccess).catch(handleError);
	};
	const handleRemoveParticipant = () => {
		income
			.delete()
			.then(() => closeModal())
			.catch((e) => handleError(e))
			.finally(() => closeModal());
	};
	/* Элементы вьюшек */
	const title = <h2 className={bem('#__title')}>{fio}</h2>;
	const photo = (
		<img
			className={bem('#__photo')}
			alt={fio}
			src={volunteer.photo ?? imgProfile}
		/>
	);
	const desc = (
		<div className={bem('#__desc')}>
			<h3>Навыки</h3>
			<p>{volunteer.getSkillsAsString()}</p>
		</div>
	);
	const actionDecline = (
		<Button
			size="s"
			theme="opposite"
			className={bem('#__action')}
			onClick={handleReject}
		>
			Отклонить заявку
		</Button>
	);
	const actionAccept = (
		<Button
			size="s"
			theme="default"
			className={bem('#__action')}
			onClick={handleAccept}
		>
			Принять заявку
		</Button>
	);
	const about = (
		<div className={bem('#__about')}>
			<h4>Город: </h4>
			<span>{volunteer.city.name}</span>

			<h4>Контактные данные:</h4>
			<span>{volunteer.phone}</span>
			<spa>{volunteer.user.email}</spa>
		</div>
	);

	// TODO: запрос сопроводительного письма из API
	const coverLetter = (
		<p className={bem('#__letter')}>
			"Меня зовут ***, я сильно мотивированный волонтер из Москвы. Ваш проект
			выглядит очень интересным, и я хотела бы в нём участвовать. У меня есть
			опыт координации больших мероприятий, и я занимаюсь урбанистикой. Для меня
			этот проект это большая возможность для улучшения моих профессиональных
			навыков, получения потрясающего опыта и возможность улучшить мой город.
			Пожалуйста, примите мою заявку. С уважением, ***"
		</p>
	);

	/* открыть анкету в модальном окне */
	const handleOpenQuestionnaire = () => {
		const modalTitle = 'Заявка волонтера';
		const modalContent = (
			<div className={bem(baseClass, '#_layout_popup')}>
				{photo} {coverLetter} {title} {about} {actionDecline} {actionAccept}
			</div>
		);
		openModal(modalTitle, modalContent);
	};

	/* открыть модальное окно подтверждения удаления участника */
	const openConfirmRemove = () => {
		const modalTitle = 'Удаление участника проекта';
		const modalContent = (
			<div className={bem('#__modal-remove')}>
				<img src={imgOnRemoveWindow} alt="Вы уверенны?" />
				<h4>Вы уверены, что хотите удалить участника проекта?</h4>
				<div className={bem('#__modal-buttons')}>
					<Button size="s" theme="opposite" onClick={closeModal}>
						Отменить
					</Button>
					<Button size="s" onClick={handleRemoveParticipant}>
						Удалить участника
					</Button>
				</div>
			</div>
		);
		openModal(modalTitle, modalContent);
	};
	/* Кнопки */
	const buttonAnket = (
		<Button
			size="s"
			theme="neutral"
			className={`${baseClass}__button`}
			onClick={handleOpenQuestionnaire}
		>
			Анкета
		</Button>
	);
	const buttonAbout = (
		<Button
			size="s"
			theme="default"
			className={bem(`#__button`)}
			onClick={handleOpenQuestionnaire}
		>
			О волонтере
		</Button>
	);
	const buttonRemove = (
		<button
			className={bem(`#__button-remove`)}
			onClick={openConfirmRemove}
			title="remove"
		>
			{}
		</button>
	);

	/* Формирование отображаемого содержимого */
	let view = '';
	let viewLayout = '';
	switch (layout) {
		case 'accepted':
			viewLayout = 'accepted';
			view = (
				<>
					{' '}
					{title} {photo} {buttonRemove} {desc} {buttonAbout}
				</>
			);
			break;

		default:
			viewLayout = 'default';
			view = (
				<>
					{title} {photo} {buttonAnket} {desc} {actionDecline} {actionAccept}{' '}
				</>
			);
	}
	const modalView = modal
		? createPortal(
				<Modal modal={modal} closeModal={closeModal} />,
				document.body
		  )
		: '';

	return (
		<>
			<div className={bem('#', `#_layout_${viewLayout}`)}>{view}</div>
			{modalView}
		</>
	);
}
CardIncome.propTypes = {
	income: PropTypes.objectOf(CardIncome).isRequired,
	layout: PropTypes.oneOf(['accepted', 'default']),
};
CardIncome.defaultProps = {
	layout: 'default',
};
export default CardIncome;

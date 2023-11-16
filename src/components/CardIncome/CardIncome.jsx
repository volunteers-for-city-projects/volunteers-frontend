import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import './CardIncome.scss';
import { bemClassHelper } from '../../utils/utils';

import imgProfile from '../../images/fotoProfile.svg';

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
 * @returns
 */
function CardIncome({ income }) {
	const [modal, setModal] = useState();

	if (!income) return '';

	/* Вспомогательная функция для формирования классов */
	const baseClass = 'card-income';
	const bem = bemClassHelper(baseClass);

	const layout = 'default'; // TODO: вынести в пропсы
	const { volunteer } = income;

	const fio = volunteer.user.getFullName();
	const modalParam = {
		isOpen: true,
		type: 'init',
		state: 'info',
		title: '',
		children: '',
	};

	/* actions */
	const handleReject = () => {
		income.reject().then(handleSuccess).catch(handleError);
	};
	const handleAccept = () => {
		income.accept().then(handleSuccess).catch(handleError);
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
			{' '}
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
			Принять заявку{' '}
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

	// TODO: запрос сопровидиловки из API
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

	/* переменные для рабты с модалкми */
	const closeModal = () => setModal();
	const openModal = (modalTitle, modalContent) =>
		setModal({ ...modalParam, children: modalContent, title: modalTitle });
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
	/* открыть сопроводительное письмо в модальном окне */
	const nandleOpenCoverLetter = () => {
		const modalTitle = 'Заявка волонтера';
		const modalContent = (
			<div className={clsx(baseClass, layout && `${baseClass}_layout_popup`)}>
				{photo} {coverLetter} {actionDecline} {actionAccept}
			</div>
		);
		openModal(modalTitle, modalContent);
	};
	/* Кнопки открытия модалок */
	const mail = (
		<Button
			size="s"
			theme="neutral"
			className={`${baseClass}__button`}
			onClick={nandleOpenCoverLetter}
		>
			Сопроводительно письмо
		</Button>
	);
	const anket = (
		<Button
			size="s"
			theme="neutral"
			className={`${baseClass}__button`}
			onClick={handleOpenQuestionnaire}
		>
			Анкета{' '}
		</Button>
	);

	/* Формирование отображаемого содержимого */
	let view = null;
	switch (layout) {
		default:
			view = (
				<div
					className={clsx(baseClass, layout && `${baseClass}_layout_${layout}`)}
				>
					{title} {photo} {mail} {anket} {desc} {actionDecline} {actionAccept}
				</div>
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
			{view}
			{modalView}
		</>
	);
}
CardIncome.propTypes = {
	income: PropTypes.objectOf(CardIncome).isRequired,
};
export default CardIncome;

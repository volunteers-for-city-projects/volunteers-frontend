// import { useState } from 'react';

import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './CardIncome.scss';
import { bemClassHelper } from '../../utils/utils';

import imgProfile from '../../images/fotoProfile.svg';
import ModalContent from '../ModalContent/ModalContent';

/**
 * @typedef {import('../../classes/ProjectIncome').default} ProjectIncome
 * @param {Object} obj
 * @param {ProjectIncome} obj.income
 * @param {''|'accepted'} obj.layout
 * @returns
 */
function CardIncome({
	income,
	layout,
	handleAccept,
	handleRemove,
	handleReject,
	setModal,
}) {
	if (!income) return '';

	const baseClass = 'card-income';
	const bem =
		bemClassHelper(
			baseClass
		); /* Вспомогательная функция для формирования классов */
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
	const closeModal = () => setModal({ ...modalParam, isOpen: false });
	const openModal = (modalTitle, modalContent) =>
		setModal({ ...modalParam, children: modalContent, title: modalTitle });

	/* Элементы вьюшек */
	const title = (
		<h2 className={bem('#__title')}>
			{fio} --- {income.statusIncomes} --- {income.id}
		</h2>
	);
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
	const about = (
		<div className={bem('#__about')}>
			<h4>Город: </h4>
			<span>{volunteer.city.name}</span>

			<h4>Контактные данные:</h4>
			<span>{volunteer.phone}</span>
			<span>{volunteer.user.email}</span>
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

	/* открыть модальное окно подтверждения удаления участника */
	const openConfirmRemove = () => {
		const modalTitle = 'Удаление участника проекта';
		const modalContent = (
			<ModalContent
				text="Вы уверены, что хотите удалить участника проекта?"
				icon="remove"
			>
				<Button size="s" theme="opposite" onClick={closeModal}>
					Отменить
				</Button>
				<Button size="s" onClick={() => handleRemove(income)}>
					Удалить участника
				</Button>
			</ModalContent>
		);
		openModal(modalTitle, modalContent);
	};

	/* Кнопки */
	const buttonRemove = (
		<button
			className={bem(`#__button-remove`)}
			onClick={openConfirmRemove}
			title="remove"
		>
			{}
		</button>
	);
	const buttonReject = (
		<Button
			size="s"
			theme="opposite"
			className={bem('#__action')}
			onClick={() => handleReject(income)}
		>
			Отклонить заявку
		</Button>
	);
	const buttonAccept = (
		<Button
			size="s"
			theme="default"
			className={bem('#__action')}
			onClick={() => handleAccept(income)}
		>
			Принять заявку
		</Button>
	);

	/* открыть анкету в модальном окне */
	const handleOpenQuestionnaire = () => {
		const modalTitle = 'Заявка волонтера';
		const modalContent = (
			<div className={bem(baseClass, '#_layout_modal')}>
				{photo} {coverLetter} {title} {about}
				<div className={bem('#__buttons')}>
					{buttonReject} {buttonAccept}
				</div>
			</div>
		);
		openModal(modalTitle, modalContent);
	};
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
					{title} {photo} {buttonAnket} {desc} {buttonReject} {buttonAccept}{' '}
				</>
			);
	}

	return <div className={bem('#', `#_layout_${viewLayout}`)}>{view}</div>;
}
CardIncome.propTypes = {
	income: PropTypes.objectOf(CardIncome).isRequired,
	layout: PropTypes.oneOf(['application_submitted', 'accepted', 'default']),
	handleAccept: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleReject: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired,
};
CardIncome.defaultProps = {
	layout: 'default',
};
export default CardIncome;

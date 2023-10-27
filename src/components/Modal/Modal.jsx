import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Modal.scss';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import modalExit from '../../images/modals/exit.png';
import modalSend from '../../images/modals/send.png';
import modalSuccess from '../../images/modals/success.png';

function Modal({ modal, closeModal }) {
	const stopPropagation = (event) => {
		event.stopPropagation();
	};

	const { isOpen, type, state, title, onSubmit } = modal;

	const contentText = {
		confirm: {
			info: {
				title: 'Вы действительно хотите выйти из личного кабинета?',
				textButton: '',
				image: modalExit,
			},
		},
		password: {
			info: {
				title:
					'На почту example@mail.ru отправлено письмо со ссылкой. Перейдите по ссылке в письме для сброса пароля.',
				textButton: 'Письмо не пришло, отправить еще раз',
				image: modalSend,
			},
			success: {
				title: 'Пароль успешно изменён!',
				textButton: 'Войти',
				image: modalSuccess,
			},
			error: {
				title:
					'Мы не смогли найти пользователя с почтой example@email.ru. Проверьте правильность адреса или обратитесь в техподдержку.',
				textButton: '',
				image: modalSend,
			},
		},
		email: {
			info: {
				title:
					'На email examplemail.ru отправлено письмо. Перейдите по ссылке в письме для подтверждения всего email.',
				textButton: 'Письмо не пришло, отправить еще раз',
				image: modalSend,
			},
			success: {
				title: 'Ура! Адрес электронной почты подтвержден!',
				textButton: 'Войти в личный кабинет',
				image: modalSuccess,
			},
		},
		init: {
			info: {
				title: 'Стартовое модальное окно',
				textButton: '',
			},
		},
	};

	const contentMap = {
		confirm: {
			info: (
				<>
					<p className="modal__text modal__text_type_confirm">
						{contentText[type][state].title}
					</p>
					<div className="modal__buttons">
						<Pushbutton
							label="Да"
							color="#000"
							backgroundColor="transparent"
							size="pre-large"
							type="submit"
							minWidth="198px"
							border="1px solid #A6C94F"
						/>
						<Pushbutton
							label="Нет"
							color="#FFF"
							backgroundColor="#A6C94F"
							size="pre-large"
							onClick={closeModal}
							type="button"
							minWidth="198px"
							border="none"
						/>
					</div>
				</>
			),
		},
		password: {
			info: (
				<>
					<p className="modal__text">{contentText[type][state].title}</p>
					<button className="modal__button-resend" type="submit">
						{contentText[type][state].textButton}
					</button>
				</>
			),
			success: (
				<>
					<p className="modal__text">{contentText[type][state].title}</p>
					<Pushbutton
						label={contentText[type][state].textButton}
						color="#333"
						backgroundColor="#A6C94F"
						size="pre-large"
						onClick={closeModal}
						type="submit"
						minWidth="399px"
						border="none"
					/>
				</>
			),
			error: <p className="modal__text">{contentText[type][state].title}</p>,
		},
		email: {
			info: (
				<>
					<p className="modal__text">{contentText[type][state].title}</p>
					<button className="modal__button-resend" type="submit">
						{contentText[type][state].textButton}
					</button>
				</>
			),
			success: (
				<>
					<p className="modal__text">{contentText[type][state].title}</p>
					<Pushbutton
						label={contentText[type][state].textButton}
						color="#333"
						backgroundColor="#A6C94F"
						size="pre-large"
						onClick={closeModal}
						type="submit"
						minWidth="399px"
						border="none"
					/>
				</>
			),
		},
		init: {
			info: <div>Стартовое модальное окно</div>,
		},
	};

	return (
		<div
			className={clsx('modal', { modal_opened: isOpen })}
			onClick={closeModal}
			onKeyDown={closeModal}
			role="button"
			tabIndex="0"
		>
			<div
				onClick={stopPropagation}
				onKeyDown={stopPropagation}
				role="button"
				tabIndex="0"
			>
				<div className="modal__container">
					<div className="modal__title-container">
						<h2 className="modal__title">{title}</h2>
						<button className="modal__exit" type="button" onClick={closeModal}>
							⠀
						</button>
					</div>
					<form
						className="modal__form"
						name={`${type}-${state}`}
						onSubmit={onSubmit}
					>
						<img
							className={clsx('modal__image', {
								modal__image_type_confirm: type === 'confirm',
								modal__image_type_success: state === 'success',
							})}
							src={contentText[type][state].image}
							alt={`${type} ${state}`}
						/>
						{contentMap[type][state]}
					</form>
				</div>
			</div>
		</div>
	);
}

Modal.propTypes = {
	modal: PropTypes.shape({
		isOpen: PropTypes.bool.isRequired,
		type: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		onSubmit: PropTypes.func,
	}).isRequired,
	closeModal: PropTypes.func.isRequired,
};

Pushbutton.defaultProps = {
	onSubmit: undefined,
};

export default Modal;

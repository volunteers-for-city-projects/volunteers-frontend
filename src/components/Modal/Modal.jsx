import PropTypes from 'prop-types';
import clsx from 'clsx';
import './Modal.scss';

function Modal({ modal, closeModal }) {
	const stopPropagation = (event) => {
		event.stopPropagation();
	};

	const { isOpen, type, state, title, imageLink, onSubmit } = modal;

	const contentMap = {
		confirm: {
			info: (
				<form
					className="modal__form"
					name={`${type}-${state}`}
					onSubmit={onSubmit}
				>
					<img
						className="modal__image"
						src={imageLink}
						alt={`${type} ${state}`}
					/>
					<p className="modal__text">
						Вы действительно хотите выйти из личного кабинета?
					</p>
					<div className="modal__buttons">
						<button
							className="modal__button modal__button_type_ok"
							type="submit"
						>
							Да
						</button>
						<button
							className="modal__button modal__button_type_no"
							type="button"
							onClick={closeModal}
						>
							Нет
						</button>
					</div>
				</form>
			),
		},
		password: {
			info: (
				<form
					className="modal__form"
					name={`${type}-${state}`}
					onSubmit={onSubmit}
				>
					<img
						className="modal__image"
						src={imageLink}
						alt={`${type} ${state}`}
					/>
					<p className="modal__text modal__text_type_info">
						На почту example@mail.ru отправлено письмо со ссылкой. Перейдите по
						ссылке в письме для сброса пароля.
					</p>
					<button className="modal__button-resend" type="submit">
						Письмо не пришло, отправить еще раз
					</button>
				</form>
			),
			success: (
				<form
					className="modal__form"
					name={`${type}-${state}`}
					onSubmit={onSubmit}
				>
					<img
						className="modal__image"
						src={imageLink}
						alt={`${type} ${state}`}
					/>
					<p className="modal__text">Пароль успешно изменён!</p>
					<button
						className="modal__button modal__button_type_success"
						type="submit"
					>
						Войти
					</button>
				</form>
			),
			error: (
				<div className="modal__form">
					<img
						className="modal__image"
						src={imageLink}
						alt={`${type} ${state}`}
					/>
					<p className="modal__text modal__text_type_info">
						Мы не смогли найти пользователя с почтой example@email.ru. Проверьте
						правильность адреса или обратитесь в техподдержку.
					</p>
				</div>
			),
		},
		email: {
			info: (
				<form
					className="modal__form"
					name={`${type}-${state}`}
					onSubmit={onSubmit}
				>
					<img
						className="modal__image"
						src={imageLink}
						alt={`${type} ${state}`}
					/>
					<p className="modal__text modal__text_type_info">
						На email examplemail.ru отправлено письмо. Перейдите по ссылке в
						письме для подтверждения всего email.
					</p>
					<button className="modal__button-resend" type="submit">
						Письмо не пришло, отправить еще раз
					</button>
				</form>
			),
			success: (
				<form
					className="modal__form"
					name={`${type}-${state}`}
					onSubmit={onSubmit}
				>
					<img
						className="modal__image"
						src={imageLink}
						alt={`${type} ${state}`}
					/>
					<p className="modal__text">Адрес электронной почты подтвержден!</p>
					<button
						className="modal__button modal__button_type_success"
						type="submit"
					>
						Вернуться на главную
					</button>
				</form>
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
					{contentMap[type][state]}
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
		imageLink: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
	}).isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default Modal;

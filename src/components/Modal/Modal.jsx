import { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import './Modal.scss';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import modalExit from '../../images/modals/exit.png';
import modalSend from '../../images/modals/send.png';
import modalSuccess from '../../images/modals/success.png';
import modalError from '../../images/modals/error.png';
import modalCity from '../../images/modals/city.png';
import modalPasswordSuccess from '../../images/modals/key-image.png';

function Modal({ modal, closeModal }) {
	const {
		isOpen,
		type,
		state,
		title,
		onSubmit,
		errorArray,
		emailprop,
		children,
		typeStyle,
	} = modal;

	const errorsData = useMemo(() => {
		if (errorArray && Array.isArray(errorArray)) {
			return errorArray.map(({ textError }) => ({
				textError,
				id: uuidv4(),
			}));
		}
		return [];
	}, [errorArray]);

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
				title: `На почту ${emailprop} отправлено письмо со ссылкой. Перейдите по ссылке в письме для сброса пароля.`,
				textButton: 'Письмо не пришло, отправить еще раз',
				image: modalSend,
			},
			success: {
				title: 'Пароль успешно изменён!',
				textButton: 'Войти',
				image: modalSuccess,
			},
			error: {
				title: `Мы не смогли найти пользователя с почтой ${emailprop}. Проверьте правильность адреса или обратитесь в техподдержку.`,
				textButton: '',
				image: modalSend,
			},
		},
		email: {
			info: {
				title: `На ${emailprop} отправлено письмо. Перейдите по ссылке в письме для подтверждения email.`,
				textButton: 'Письмо не пришло, отправить еще раз',
				image: modalSend,
			},
			success: {
				title: 'Ура! Адрес электронной почты подтвержден!',
				textButton: 'Войти',
				image: modalSuccess,
			},
		},
		init: {
			info: {
				title: 'Стартовое модальное окно',
				textButton: '',
			},
		},
		error: {
			info: {
				errorsArray: errorsData,
				textButton: '',
				image: modalError,
			},
			notActiveEmail: {
				errorsArray: errorArray,
				textButton: 'Отправить ссылку на активацию повторно',
				image: modalError,
			},
			notExistEmail: {
				errorsArray: errorArray,
				textButton: 'Зарегистрироваться',
				image: modalError,
			},
		},
		project: {
			success: {
				title:
					'Проект отправлен на модерацию администратору. Он будет отображен в личном кабинете после одобрения или отклонения',
				textButton: 'Перейти в личный кабинет',
				image: modalCity,
			},
		},
		changePassword: {
			success: {
				title: '',
				textButton: 'Вернуться в личный кабинет',
				image: modalPasswordSuccess,
			},
		},
		draft: {
			success: {
				title:
					'Информация о вашем проекте сохранена! Он будет доступен в личном кабинете',
				textButton: '',
				image: modalCity,
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
							color="#fff"
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
						color="#fff"
						backgroundColor="#A6C94F"
						size="pre-large"
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
						color="#fff"
						backgroundColor="#A6C94F"
						size="pre-large"
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
		error: {
			info: (
				<ul className="modal__list-errors">
					{contentText[type][state].errorsArray &&
						contentText[type][state].errorsArray.map((item) => (
							<li key={item.id}>
								<p className="modal__text">{item.textError}</p>
							</li>
						))}
				</ul>
			),
			notActiveEmail: (
				<>
					<p className="modal__text">
						{contentText[type][state].errorsArray &&
							contentText[type][state].errorsArray[0]?.notActiveEmail}
					</p>
					<button className="modal__button-resend" type="submit">
						{contentText[type][state].textButton}
					</button>
				</>
			),
			notExistEmail: (
				<>
					<p className="modal__text">
						{contentText[type][state].errorsArray &&
							contentText[type][state].errorsArray[0]?.notExistEmail}
					</p>
					<Pushbutton
						label={contentText[type][state].textButton}
						color="#fff"
						backgroundColor="#A6C94F"
						size="pre-large"
						type="submit"
						minWidth="399px"
						border="none"
					/>
				</>
			),
		},
		project: {
			success: (
				<>
					<p className="modal__text">{contentText[type][state].title}</p>
					<Pushbutton
						label={contentText[type][state].textButton}
						color="#fff"
						backgroundColor="#A6C94F"
						size="pre-large"
						type="submit"
						minWidth="399px"
						border="none"
					/>
				</>
			),
		},
		changePassword: {
			success: (
				<Pushbutton
					label={contentText[type][state].textButton}
					color="#fff"
					backgroundColor="#A6C94F"
					size="pre-large"
					type="submit"
					minWidth="399px"
					border="none"
				/>
			),
		},
		draft: {
			success: (
				<>
					<p className="modal__text modal__text_type_confirm">
						{contentText[type][state].title}
					</p>
					<div className="modal__buttons">
						<Pushbutton
							label="Вернуться к редактированию"
							color="#000"
							backgroundColor="transparent"
							size="pre-large"
							type="button"
							minWidth="198px"
							border="1px solid #A6C94F"
							onClick={closeModal}
						/>
						<Pushbutton
							label="Перейти в личный кабинет"
							color="#fff"
							backgroundColor="#A6C94F"
							size="pre-large"
							type="submit"
							minWidth="198px"
							border="none"
						/>
					</div>
				</>
			),
		},
	};

	return (
		<div className={clsx('modal', { modal_opened: isOpen })}>
			<div
				className={clsx('modal__container', {
					'modal__container_type_change-password':
						typeStyle === 'change-password',
					'modal__container_type_enlarge-image': typeStyle === 'enlarge-image',
				})}
			>
				<div className="modal__title-container">
					<h2 className="modal__title">{title}</h2>
					<button className="modal__exit" type="button" onClick={closeModal}>
						⠀
					</button>
				</div>
				{children || (
					<form
						className="modal__form"
						name={`${type}-${state}`}
						onSubmit={onSubmit}
					>
						<img
							className={clsx('modal__image', {
								modal__image_type_confirm: type === 'confirm',
								modal__image_type_success: state === 'success',
								modal__image_type_project:
									type === 'project' || type === 'draft',
								'modal__image_type_change-password': type === 'changePassword',
							})}
							src={contentText[type][state].image}
							alt={`${type} ${state}`}
						/>
						{contentMap[type][state]}
					</form>
				)}
			</div>
		</div>
	);
}

Modal.propTypes = {
	modal: PropTypes.shape({
		isOpen: PropTypes.bool.isRequired,
		type: PropTypes.string,
		state: PropTypes.string,
		title: PropTypes.string,
		emailprop: PropTypes.string,
		onSubmit: PropTypes.func,
		errorArray: PropTypes.arrayOf(
			PropTypes.shape({
				textError: PropTypes.string,
				notActiveEmail: PropTypes.string,
				notExistEmail: PropTypes.string,
			})
		),
		children: PropTypes.node,
		typeStyle: PropTypes.string,
	}).isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default Modal;

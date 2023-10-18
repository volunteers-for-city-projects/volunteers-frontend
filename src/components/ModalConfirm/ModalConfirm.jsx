import PropTypes from 'prop-types';
import './ModalConfirm.scss';

function ModalConfirm({ onSubmitOk, onClickExit, isOpen, closeConfirm }) {
	const stopPropagation = (event) => {
		event.stopPropagation();
	};

	return (
		<div
			className={`confirm ${isOpen ? 'confirm_opened' : ''}`}
			onClick={closeConfirm}
			onKeyDown={closeConfirm}
			role="button"
			tabIndex="0"
		>
			<div
				onClick={stopPropagation}
				onKeyDown={stopPropagation}
				role="button"
				tabIndex="0"
			>
				<form
					className="confirm__container"
					name="confirm"
					onSubmit={onSubmitOk}
				>
					<button className="confirm__exit" type="button" onClick={onClickExit}>
						⠀
					</button>
					<p className="confirm__text">
						Вы действительно хотите выйти из личного кабинета?
					</p>
					<div className="confirm__buttons">
						<button
							className="confirm__button confirm__button_type_ok"
							type="submit"
						>
							Да
						</button>
						<button
							className="confirm__button confirm__button_type_no"
							type="button"
							onClick={onClickExit}
						>
							Нет
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

ModalConfirm.propTypes = {
	onSubmitOk: PropTypes.func.isRequired,
	onClickExit: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	closeConfirm: PropTypes.func.isRequired,
};

export default ModalConfirm;

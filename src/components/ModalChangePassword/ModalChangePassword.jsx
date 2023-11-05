import PropTypes from 'prop-types';
import './ModalChangePassword.scss';
import Input from '../Input/Input';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function ModalChangePassword({ isOpen, onClose, onSubmit }) {
	return (
		<div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
			<form onSubmit={onSubmit} className="modal__container" noValidate>
				<button className="modal__close" type="button" onClick={onClose}>
					{' '}
				</button>
				<div className="modal__title-container">
					<h2 className="modal__title">Изменение пароля</h2>
				</div>

				<div className="modal__inputs">
					<Input
						type="text"
						label="Старый пароль*"
						placeholder=""
						inputSize="mini"
					/>
					<div className="modal__inputs-group">
						<Input
							type="text"
							label="Новый пароль*"
							placeholder=""
							inputSize="mini"
						/>
						<Input
							type="text"
							label="Повтор нового пароля*"
							placeholder=""
							inputSize="mini"
						/>
					</div>
				</div>
				<Pushbutton
					label="Изменить пароль"
					color="white"
					size="pre-large"
					minWidth="400px"
					backgroundColor="#A6C94F"
					border="none"
					type="submit"
				/>
			</form>
		</div>
	);
}

export default ModalChangePassword;

ModalChangePassword.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

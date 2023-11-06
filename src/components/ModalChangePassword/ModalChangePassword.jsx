import PropTypes from 'prop-types';
import './ModalChangePassword.scss';
import Input from '../Input/Input';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function ModalChangePassword({ isOpen, onClose, onSubmit }) {
	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<form onSubmit={onSubmit} className="popup__container" noValidate>
				<button className="popup__close" type="button" onClick={onClose}>
					{' '}
				</button>
				<div className="popup__title-container">
					<h2 className="popup__title">Изменение пароля</h2>
				</div>

				<div className="popup__inputs">
					<Input
						name="oldpassword"
						type="text"
						label="Старый пароль*"
						placeholder=""
						inputSize="mini"
					/>
					<div className="popup__inputs-group">
						<Input
							name="newpassword"
							type="text"
							label="Новый пароль*"
							placeholder=""
							inputSize="mini"
						/>
						<Input
							name="repeatnewpassword"
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

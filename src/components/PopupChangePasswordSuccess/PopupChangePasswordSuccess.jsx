import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import './PopupChangePasswordSuccess.scss';
import keyImage from '../../images/key-image.png';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function PopupChangePasswordSuccess({ isOpen, onClose }) {
	// const navigate = useNavigate();
	return (
		<div className={`popup-success ${isOpen ? 'popup-success_opened' : ''}`}>
			<div className="popup-success__container" noValidate>
				<button
					className="popup-success__close"
					type="button"
					onClick={onClose}
				>
					{' '}
				</button>
				<div className="popup-success__title-container">
					<h2 className="popup-success__title">Изменение пароля</h2>
				</div>

				<img className="popup-success__image" src={keyImage} alt="ключ" />
				<Pushbutton
					label="Вернуться в личный кабинет"
					color="white"
					size="pre-large"
					minWidth="400px"
					backgroundColor="#A6C94F"
					border="none"
					onClick={onClose}
				/>
			</div>
		</div>
	);
}

export default PopupChangePasswordSuccess;

PopupChangePasswordSuccess.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

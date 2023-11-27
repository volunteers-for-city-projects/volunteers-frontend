import PropTypes from 'prop-types';

import { bemClassHelper } from '../../utils/utils';
import iconRemove from '../../images/modals/remove.png';
import iconSuccess from '../../images/modals/success.png';
import iconKey from '../../images/modals/key-image.png';
import iconSend from '../../images/modals/send.png';
import iconError from '../../images/modals/error.png';
import iconCity from '../../images/modals/city.png';
import iconExit from '../../images/modals/exit.png';
import './ModalContent.scss';

const bem = bemClassHelper('modal-content');
/**
 * Формирует содержимое для модального окна с иконкой
 * @param {Object} obj
 * @param {'remove'|'success'|'key'|'send'|'error'|'city'|'exit'|''} obj.icon
 * @param {String} obj.text
 */
export default function ModalContent({ icon, text, children }) {
	console.log(icon, text, children);
	const icons = {
		remove: iconRemove,
		success: iconSuccess,
		key: iconKey,
		send: iconSend,
		error: iconError,
		city: iconCity,
		exit: iconExit,
	};

	const elementIcon = icon ? (
		<img src={icons[icon]} alt={text} className={bem('#__icon')} />
	) : (
		''
	);
	const elementText = text ? <p className={bem('#__text')}>{text}</p> : '';

	return (
		<div className={bem('#')}>
			{elementIcon}
			{elementText}
			<div className={bem('#__additional')}>{children}</div>
		</div>
	);
}

ModalContent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, null]),
	icon: PropTypes.oneOf([
		'remove',
		'success',
		'key',
		'send',
		'error',
		'city',
		'exit',
		'',
	]),
	text: PropTypes.string,
};
ModalContent.defaultProps = {
	children: '',
	icon: '',
	text: '',
};

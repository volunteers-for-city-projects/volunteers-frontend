import React from 'react';
import PropTypes from 'prop-types';
import './PopupWindow.scss';
import clsx from 'clsx';
import successIcon from '../../images/popup-window/success.svg';
import errorIcon from '../../images/popup-window/error.svg';

export default function PopupWindow({ text, type, isOpen, styleType }) {
	const mapContent = {
		success: successIcon,
		error: errorIcon,
	};

	return (
		<div
			className={clsx(`popup-window popup-window_type_${type}`, {
				'popup-window_type_modal': styleType === 'modal',
				'popup-window_opened': isOpen,
			})}
		>
			<img className="popup-window__icon" src={mapContent[type]} alt={type} />
			<p className="popup-window__text">{text}</p>
		</div>
	);
}

PopupWindow.propTypes = {
	text: PropTypes.string,
	type: PropTypes.string,
	styleType: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
};

PopupWindow.defaultProps = {
	text: '',
	type: '',
	styleType: '',
};

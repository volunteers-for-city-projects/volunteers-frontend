import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './PopupWindow.scss';
import clsx from 'clsx';
import successIcon from '../../images/popup-window/success.svg';
import errorIcon from '../../images/popup-window/error.svg';

export default function PopupWindow({
	text,
	type,
	isOpen,
	styleType,
	errorArray,
}) {
	const mapContent = {
		success: successIcon,
		error: errorIcon,
	};

	const errorsData = useMemo(() => {
		if (errorArray && Array.isArray(errorArray)) {
			return errorArray.map(({ textError }) => ({
				textError,
				id: uuidv4(),
			}));
		}
		return [];
	}, [errorArray]);

	return (
		<div
			className={clsx(`popup-window popup-window_type_${type}`, {
				'popup-window_type_modal': styleType === 'modal',
				'popup-window_opened': isOpen,
			})}
		>
			<img className="popup-window__icon" src={mapContent[type]} alt={type} />
			{type === 'success' ? (
				<p className="popup-window__text">{text}</p>
			) : (
				<ul className="popup-window__list-errors">
					{errorsData &&
						errorsData.map((item) => (
							<li key={item.id}>
								<p className="popup-window__text">{item.textError}</p>
							</li>
						))}
				</ul>
			)}
		</div>
	);
}

PopupWindow.propTypes = {
	text: PropTypes.string,
	type: PropTypes.string,
	styleType: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
	errorArray: PropTypes.arrayOf(
		PropTypes.shape({
			textError: PropTypes.string,
			notActiveEmail: PropTypes.string,
			notExistEmail: PropTypes.string,
		})
	),
};

PopupWindow.defaultProps = {
	text: '',
	type: '',
	styleType: '',
	errorArray: [{ textError: '' }],
};

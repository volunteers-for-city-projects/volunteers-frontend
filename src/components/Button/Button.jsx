import './Button.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * @param {Object} obj
 * @param {'default'|'opposite'|'neutral'} obj.theme default - основной цвет(зеленый), opposite - противоположный основному(оранжевый), neutral - нейтральный (белый)
 * @param {"l"|"m"|"s"|"sx"|null} obj.size Размер кнопки. null - без размера, растянется на ширину контенера
 * @param {String} obj.className Класс, который нужно подмиксовать к кнопке
 * @param {(JSX|String)} obj.children Содержимое кнопки
 * @param {Function} obj.onClick Функция
 * @param {Boolean} obj.disabled Доступность кнопки
 * @param {"button" | "reset" | "submit"}
 */
function Button({ theme, size, className, children, onClick, disabled, type }) {
	const classes = [
		'button',
		theme && `button_theme_${theme}`,
		size && `button_size_${size}`,
		className,
	];
	return (
		<button
			className={clsx(classes)}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
}
Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
		.isRequired,
	theme: PropTypes.oneOf(['default', 'opposite', 'neutral']),
	size: PropTypes.oneOf(['xs', 's', 'm', 'l', '']),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'reset', 'submit']),
};
Button.defaultProps = {
	theme: 'default',
	size: '',
	className: '',
	disabled: false,
	onClick: () => {},
	type: 'button',
};

export default Button;

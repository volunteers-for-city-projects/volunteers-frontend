import PropTypes from 'prop-types';
import './Button.scss';

function Button({ label, type, onClick }) {
	return (
		<button
			type="button"
			className={`header__button header__button_type_${type}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Button;

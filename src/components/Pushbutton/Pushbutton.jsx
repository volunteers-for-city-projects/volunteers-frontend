import React from 'react';
import PropTypes from 'prop-types';
import './pushbutton.scss';

export const Pushbutton = ({
	primary,
	backgroundColor,
	color,
	size,
	label,
	disabled,
	onClick,
	minWidth,
	border,
	...option
}) => {
	const mode = primary
		? 'pushbutton__type_primary'
		: 'pushbutton__type_secondary';
	const props = { disabled, onClick };
	let styleObject = {};
	if (backgroundColor) {
		styleObject = { backgroundColor, minWidth, color, border };
	} else {
		styleObject = { minWidth, color };
	}
	return (
		<button
			{...props}
			type="button"
			className={['pushbutton', `pushbutton__size_${size}`, mode].join(' ')}
			style={styleObject}
			{...option}
		>
			{' '}
			{label}
		</button>
	);
};

Pushbutton.propTypes = {
	primary: PropTypes.bool,
	backgroundColor: PropTypes.string,
	color: PropTypes.string,
	minWidth: PropTypes.string,
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	label: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	border: PropTypes.string,
};

Pushbutton.defaultProps = {
	color: '#000000',
	backgroundColor: null,
	minWidth: 'auto',
	primary: false,
	size: 'large',
	disabled: false,
	onClick: undefined,
	border: 'none',
};

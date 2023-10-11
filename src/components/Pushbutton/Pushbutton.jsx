import React from 'react';
import PropTypes from 'prop-types';
import './pushbutton.css';

export const Pushbutton = ({
	primary,
	backgroundColor,
	color,
	size,
	label,
	disabled,
	onClick,
	minWidth,
	...option
}) => {
	const mode = primary
		? 'pushbutton__type_primary'
		: 'pushbutton__type_secondary';
	const props = { disabled, onClick };
	let styleObject = {};
	if (backgroundColor) {
		styleObject = { backgroundColor, minWidth, color };
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
};

Pushbutton.defaultProps = {
	color: '#000000',
	backgroundColor: null,
	minWidth: 'auto',
	primary: false,
	size: 'large',
	disabled: false,
	onClick: undefined,
};

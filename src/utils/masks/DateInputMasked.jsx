import PropTypes from 'prop-types';
import React from 'react';
import { InputMask } from '@react-input/mask';

const DateInputMasked = ({ value, handleChange, ...restProps }) => (
	<InputMask
		mask="99.99.9999"
		value={value}
		onChange={handleChange}
		{...restProps}
	/>
);

DateInputMasked.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default DateInputMasked;

import PropTypes from 'prop-types';
import React from 'react';
import { InputMask } from '@react-input/mask';

const PhoneInputMasked = ({ value, handleChange, ...restProps }) => (
	<InputMask
		mask="+7 999 999-99-99"
		value={value}
		onChange={handleChange}
		{...restProps}
	/>
);

PhoneInputMasked.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default PhoneInputMasked;

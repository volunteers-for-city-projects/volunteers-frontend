import PropTypes from 'prop-types';
import './InputRequest.scss';

function InputRequest({ type, htmlFor, label, placeholder }) {
	return (
		<label className="input-request" htmlFor={htmlFor}>
			{label}
			<input
				className="input-request__input"
				type={type}
				id={htmlFor}
				placeholder={placeholder}
			/>
		</label>
	);
}

InputRequest.propTypes = {
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
	htmlFor: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

InputRequest.defaultProps = {
	label: '',
};

export default InputRequest;

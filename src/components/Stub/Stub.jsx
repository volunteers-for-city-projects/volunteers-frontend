import './stub.scss';
import PropTypes from 'prop-types';

function Stub({ text }) {
	return <p className="stub-text">{text}</p>;
}
export default Stub;
Stub.propTypes = {
	text: PropTypes.string,
};

Stub.defaultProps = {
	text: '',
};

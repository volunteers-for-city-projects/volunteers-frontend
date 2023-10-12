import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../images/logo.svg';
import './Logo.scss';

function Logo({ label }) {
	return (
		<Link className="logo-container" to="/">
			<img className="logo" src={logo} alt="logo" />
			<p className="logo-text">{label}</p>
		</Link>
	);
}

Logo.propTypes = {
	label: PropTypes.string,
};

Logo.defaultProps = {
	label: 'ЛучшеВместе',
};

export default Logo;

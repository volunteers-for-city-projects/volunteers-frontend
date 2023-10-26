import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../images/header/logo-design.svg';
import './Logo.scss';

function Logo({ label, sublabel }) {
	return (
		<Link className="logo" to="/">
			<img className="logo__image" src={logo} alt="logo" />
			<div className="logo__container-text">
				<p className="logo__label">{label}</p>
				<p className="logo__sublabel">{sublabel}</p>
			</div>
		</Link>
	);
}

Logo.propTypes = {
	label: PropTypes.string,
	sublabel: PropTypes.string,
};

Logo.defaultProps = {
	label: 'ЛучшеВместе',
	sublabel: 'ЛучшеВместе',
};

export default Logo;

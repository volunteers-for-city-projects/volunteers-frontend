import PropTypes from 'prop-types';
import NavBar from '../NavBar/NavBar';
import Logo from '../Logo/Logo';
import Contacts from '../Contacts/Contacts';
import dataNavArray from '../../utils/dataNavArray';
import './Footer.scss';

function Footer({ platformEmail }) {
	return (
		<footer className="footer">
			<div className="footer__container">
				<Logo />
				<NavBar dataNavArray={dataNavArray} />
				<Contacts type="footer" platformEmail={platformEmail} />
			</div>
		</footer>
	);
}

Footer.propTypes = {
	platformEmail: PropTypes.string.isRequired,
};

export default Footer;

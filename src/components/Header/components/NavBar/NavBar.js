import PropTypes from 'prop-types';
import './NavBar.scss';
import HeaderLink from '../HeaderLink/HeaderLink';

function NavBar({ dataNavArray }) {
	return (
		<nav>
			<ul className="header__nav">
				{dataNavArray.map((link) => (
					<li>
						<HeaderLink label={link.label} path={link.path} />
					</li>
				))}
			</ul>
		</nav>
	);
}

NavBar.propTypes = {
	dataNavArray: PropTypes.isRequired,
};

export default NavBar;

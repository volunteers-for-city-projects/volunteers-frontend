import PropTypes from 'prop-types';
import './NavBar.scss';
import NavigationLink from '../NavigationLink/NavigationLink';

function NavBar({ dataNavArray }) {
	return (
		<nav>
			<ul className="nav">
				{dataNavArray.map((link) => (
					<li>
						<NavigationLink label={link.label} path={link.path} />
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

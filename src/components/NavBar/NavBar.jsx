import PropTypes from 'prop-types';
import './NavBar.scss';
import NavigationLink from '../NavigationLink/NavigationLink';

function NavBar({ dataNavArray }) {
	return (
		<nav>
			<ul className="nav">
				{dataNavArray.map((link) => (
					<li key={link.id}>
						<NavigationLink
							label={link.label}
							path={link.path}
							isAnchor={link.isAnchor}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}

NavBar.propTypes = {
	dataNavArray: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
			isAnchor: PropTypes.bool.isRequired,
		})
	).isRequired,
};

export default NavBar;

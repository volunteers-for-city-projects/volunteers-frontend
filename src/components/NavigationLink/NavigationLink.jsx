import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';
import './NavigationLink.scss';

function NavigationLink({ label, path, isAnchor }) {
	return !isAnchor ? (
		<NavLink
			to={path}
			className={({ isActive }) => {
				if (isActive) {
					return 'nav__link nav__link_active';
				}

				return 'nav__link';
			}}
		>
			{label}
		</NavLink>
	) : (
		<Link className="nav__link" to={path} smooth>
			{label}
		</Link>
	);
}

NavigationLink.propTypes = {
	label: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	isAnchor: PropTypes.bool.isRequired,
};

export default NavigationLink;

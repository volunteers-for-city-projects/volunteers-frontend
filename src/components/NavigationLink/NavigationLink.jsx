import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavigationLink.scss';

function NavigationLink({ label, path }) {
	return (
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
	);
}

NavigationLink.propTypes = {
	label: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
};

export default NavigationLink;

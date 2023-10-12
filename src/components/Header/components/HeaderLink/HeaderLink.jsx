import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './HeaderLink.scss';

function HeaderLink({ label, path }) {
	return (
		<NavLink
			to={path}
			className={({ isActive }) => {
				if (isActive) {
					return 'header__link header__link_active';
				}

				return 'header__link';
			}}
		>
			{label}
		</NavLink>
	);
}

HeaderLink.propTypes = {
	label: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
};

export default HeaderLink;

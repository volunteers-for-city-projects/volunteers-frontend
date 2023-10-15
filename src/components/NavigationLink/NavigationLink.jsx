import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { scroller } from 'react-scroll';
import './NavigationLink.scss';

function NavigationLink({ label, path, anchor }) {
	const scrollToAnchor = () => {
		scroller.scrollTo(anchor, {
			smooth: true,
		});
	};

	return (
		<NavLink
			to={path}
			onClick={anchor && scrollToAnchor}
			className={({ isActive }) => {
				if (isActive && !anchor) {
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
	anchor: PropTypes.string.isRequired,
};

export default NavigationLink;

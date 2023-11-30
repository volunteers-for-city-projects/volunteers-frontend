import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuHamburger.scss';

const MenuHamburger = ({ isOpen, onClose }) => {
	const links = [
		{ id: 0, title: 'Проекты', path: '/projects' },
		{ id: 1, title: 'Новости', path: '/' },
		{ id: 2, title: 'Связаться с нами', path: '/' },
	];

	const { pathname } = useLocation();
	const isActive = (path) => pathname === path;

	return (
		<div className={`menu-popup ${isOpen ? 'menu-popup_opened' : ''}`}>
			<div
				className={`menu-popup__content ${
					isOpen ? 'menu-popup__content_active' : ''
				}`}
			>
				<button className="menu-popup__close-btn" onClick={onClose}>
					{' '}
				</button>
				<ul className="menu-popup__links">
					{links.map((link) => (
						<li key={link.id}>
							<NavLink
								to={link.path}
								className={`menu-popup__link ${
									isActive(link.path) ? 'menu-popup__link_active' : ''
								}`}
							>
								{link.title}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

MenuHamburger.propTypes = {
	isOpen: PropTypes.bool.isRequired,

	onClose: PropTypes.func.isRequired,
};

export default MenuHamburger;

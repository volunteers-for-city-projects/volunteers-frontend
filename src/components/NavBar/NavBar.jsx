import PropTypes from 'prop-types';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavigationLink from '../NavigationLink/NavigationLink';
import iconProfile from '../../images/main-page/icon-profile.svg';
import hamburgerMenu from '../../images/main-page/hamburger.png';
import MenuHamburger from '../MenuHamburger/MenuHamburger';

function NavBar({ dataNavArray }) {
	const [showPopup, setShowPopup] = useState(false);
	return (
		<nav>
			<ul className="nav">
				{dataNavArray.map((link) => (
					<li key={link.id}>
						<NavigationLink
							label={link.label}
							path={link.path}
							anchor={link.anchor}
						/>
					</li>
				))}
			</ul>
			<Link to="/profile">
				<img
					className="nav__image"
					src={iconProfile}
					alt="Переход на страницу профиля"
				/>
			</Link>

			<div className="nav__buttons">
				<button onClick={setShowPopup} type="button" className="nav__button">
					<img
						src={hamburgerMenu}
						alt="Открыть меню"
						className="nav__button-burger"
					/>
				</button>
			</div>
			<MenuHamburger isOpen={showPopup} onClose={() => setShowPopup(false)} />
		</nav>
	);
}

NavBar.propTypes = {
	dataNavArray: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
			anchor: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default NavBar;

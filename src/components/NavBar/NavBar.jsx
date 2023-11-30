import PropTypes from 'prop-types';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import NavigationLink from '../NavigationLink/NavigationLink';
import iconProfile from '../../images/main-page/icon-profile.svg';
import hamburgerMenu from '../../images/main-page/hamburger.png';
import MenuHamburger from '../MenuHamburger/MenuHamburger';

function NavBar({ dataNavArray, isLoggedIn, handleConfirmLogout }) {
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

			<div className="nav__wrapper">
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
				<MenuHamburger
					isLoggedIn={isLoggedIn}
					handleConfirmLogout={handleConfirmLogout}
					dataNavArray={dataNavArray}
					isOpen={showPopup}
					onClose={() => setShowPopup(false)}
				/>
			</div>
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
	isLoggedIn: PropTypes.bool.isRequired,
	handleConfirmLogout: PropTypes.func.isRequired,
};

export default NavBar;

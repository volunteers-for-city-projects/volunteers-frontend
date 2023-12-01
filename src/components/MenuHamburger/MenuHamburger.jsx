import PropTypes from 'prop-types';
import './MenuHamburger.scss';
import { useNavigate } from 'react-router-dom';
import NavigationLink from '../NavigationLink/NavigationLink';
import { Pushbutton } from '../Pushbutton/Pushbutton';

function MenuHamburger({
	isOpen,
	onClose,
	dataNavArray,
	isLoggedIn,
	handleConfirmLogout,
}) {
	const navigate = useNavigate();
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
					{dataNavArray.map((link) => (
						<li key={link.id}>
							<NavigationLink
								label={link.label}
								path={link.path}
								anchor={link.anchor}
							>
								{link.title}
							</NavigationLink>
						</li>
					))}

					<div className="menu-popup__buttons">
						{!isLoggedIn ? (
							<>
								<Pushbutton
									label="Регистрация"
									backgroundColor="#A6C94F"
									size="medium-large"
									border="none"
									color="#FFF"
									onClick={() => navigate('/registration')}
									minWidth="150px"
								/>
								<Pushbutton
									label="Вход"
									backgroundColor="#FFF"
									size="medium-large"
									border="1px solid #A6C94F"
									color="#3F3F3F"
									onClick={() => navigate('/login')}
									minWidth="150px"
								/>
							</>
						) : (
							<>
								<Pushbutton
									label="ЛК"
									backgroundColor="#A6C94F"
									size="medium-large"
									border="none"
									color="#FFF"
									onClick={() => navigate('/profile')}
									minWidth="150px"
								/>
								<Pushbutton
									label="Выход"
									backgroundColor="#FFF"
									size="medium-large"
									onClick={handleConfirmLogout}
									border="1px solid #A6C94F"
									color="#3F3F3F"
									minWidth="150px"
								/>
							</>
						)}
					</div>
				</ul>
			</div>
		</div>
	);
}

MenuHamburger.propTypes = {
	isOpen: PropTypes.bool,
	dataNavArray: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
			anchor: PropTypes.string.isRequired,
		})
	).isRequired,
	onClose: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool,
	handleConfirmLogout: PropTypes.func,
};

MenuHamburger.defaultProps = {
	isOpen: false,
	isLoggedIn: true,
	handleConfirmLogout: () => {},
};

export default MenuHamburger;

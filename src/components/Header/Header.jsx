import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import Logo from '../Logo/Logo';
import InputSearch from '../InputSearch/InputSearch';
import NavBar from '../NavBar/NavBar';
import Button from './Button/Button';

const dataNavArray = [
	{
		id: 0,
		label: 'проекты',
		path: '/projects',
		isAnchor: false,
	},
	{
		id: 1,
		label: 'новости',
		path: 'news',
		isAnchor: true,
	},
	{
		id: 2,
		label: 'связаться с нами',
		path: 'request',
		isAnchor: true,
	},
];

function Header({ isLoggedIn, handleConfirmLogout }) {
	return (
		<header className="header">
			<div className="header__container">
				<Logo label="ЛучшеВместе" />
				<InputSearch placeholder="Поиск" />
				<NavBar dataNavArray={dataNavArray} />
				<div className="header__buttons">
					{!isLoggedIn ? (
						<>
							<Link
								to="/registration"
								className="header__link header__link_type_registration"
							>
								Регистрация
							</Link>
							<Link
								to="/login"
								className="header__link header__link_type_login"
							>
								Войти
							</Link>
						</>
					) : (
						<>
							<Link
								to="/profile"
								className="header__link header__link_type_profile"
							>
								ЛК
							</Link>
							<Button
								label="Выход"
								type="logout"
								onClick={handleConfirmLogout}
							/>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	handleConfirmLogout: PropTypes.func.isRequired,
};

export default Header;

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import Logo from '../Logo/Logo';
import InputSearch from '../InputSearch/InputSearch';
import NavBar from '../NavBar/NavBar';
import dataNavArray from '../../utils/dataNavArray';
import { Pushbutton } from '../Pushbutton/Pushbutton';

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
							<Pushbutton
								label="Выход"
								color="#FFF"
								size="small"
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

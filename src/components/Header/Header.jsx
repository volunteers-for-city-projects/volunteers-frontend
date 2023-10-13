import './Header.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
		path: '/news',
		isAnchor: false,
	},
	{
		id: 2,
		label: 'связаться с нами',
		path: 'request',
		isAnchor: true,
	},
];

function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	const handleRegistration = () => {
		navigate('/reg');
	};

	const handleLogin = () => {
		navigate('/login');
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// TODO: всплывающее окно подтверждения выхода
		navigate('/');
		setIsLoggedIn(false);
	};

	const handleProfile = () => {
		navigate('/profile');
	};

	return (
		<header className="header">
			<div className="header__container">
				<Logo label="ЛучшеВместе" />
				<InputSearch placeholder="Поиск" />
				<NavBar dataNavArray={dataNavArray} />
				<div className="header__buttons">
					{!isLoggedIn ? (
						<>
							<Button
								label="Регистрация"
								type="registration"
								onClick={handleRegistration}
							/>
							<Button label="Войти" type="login" onClick={handleLogin} />
						</>
					) : (
						<>
							<Button label="ЛК" type="profile" onClick={handleProfile} />
							<Button label="Выход" type="logout" onClick={handleLogout} />
						</>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;

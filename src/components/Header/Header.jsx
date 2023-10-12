import './Header.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import InputSearch from './components/InputSearch/InputSearch';
import NavBar from './components/NavBar/NavBar';
import Button from './components/Button/Button';

const dataNavArray = [
	{
		label: 'проекты',
		path: '/projects',
	},
	{
		label: 'новости',
		path: '/news',
	},
	{
		label: 'контакты',
		path: '/contacts',
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
				<InputSearch placeholder="Поиск инициатив" />
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

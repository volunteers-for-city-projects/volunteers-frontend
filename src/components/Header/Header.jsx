import PropTypes from 'prop-types';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
// import InputSearch from '../InputSearch/InputSearch';
import NavBar from '../NavBar/NavBar';
import { dataNavArray } from '../../utils/data';
import { Pushbutton } from '../Pushbutton/Pushbutton';
// import iconSearch from '../../images/header/search.svg';

function Header({ isLoggedIn, handleConfirmLogout }) {
	const navigate = useNavigate();

	return (
		<header className="header">
			<div className="header__container">
				<Logo
					label="ЛучшеВместе"
					sublabel="Городские инициативы — шаг к переменам"
				/>
				{/* <InputSearch
					placeholder="Поиск"
					border="1px solid #9BC1F9"
					icon={iconSearch}
					// width="450px"
				/> */}
				<NavBar
					isLoggedIn={isLoggedIn}
					handleConfirmLogout={handleConfirmLogout}
					dataNavArray={dataNavArray}
				/>
				<div className="header__buttons">
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
								backgroundColor="transparent"
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
								backgroundColor="transparent"
								size="medium-large"
								onClick={handleConfirmLogout}
								border="1px solid #A6C94F"
								color="#3F3F3F"
								minWidth="150px"
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

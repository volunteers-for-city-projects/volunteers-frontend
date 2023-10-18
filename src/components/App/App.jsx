import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FormRequest from '../FormRequest/FormRequest';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [isOpenConfirmLogout, setIsOpenConfirmLogout] = useState(false);
	const navigate = useNavigate();

	const handleConfirmLogout = () => {
		setIsOpenConfirmLogout(!isOpenConfirmLogout);
	};

	const closeConfirm = () => {
		setIsOpenConfirmLogout(!isOpenConfirmLogout);
	};

	const handleLogout = (event) => {
		event.preventDefault();
		setIsOpenConfirmLogout(!isOpenConfirmLogout);
		navigate('/');
		setIsLoggedIn(false);
	};

	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				handleConfirmLogout={handleConfirmLogout}
			/>
			<div>
				<p>App component</p>
			</div>
			<Main />
			<FormRequest />
			<Outlet />
			<Footer />
			<ModalConfirm
				isOpen={isOpenConfirmLogout}
				onSubmitOk={handleLogout}
				onClickExit={closeConfirm}
				closeConfirm={closeConfirm}
			/>
		</>
	);
}

export default App;

import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [modal, setModal] = useState({
		isOpen: false,
		type: 'init',
		state: 'info',
		title: 'init',
		onSubmit: () => {},
	});
	const [platformEmail, setPlatformEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogout = (event) => {
		event.preventDefault();
		setModal((prevModal) => ({
			...prevModal,
			isOpen: false,
		}));
		navigate('/');
		setIsLoggedIn(false);
	};

	const handleConfirmLogout = () => {
		setModal({
			isOpen: true,
			type: 'confirm',
			state: 'info',
			title: 'Выход',
			onSubmit: handleLogout,
		});
	};

	const closeModal = () => {
		setModal((prevModal) => ({
			...prevModal,
			isOpen: false,
		}));
	};

	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				handleConfirmLogout={handleConfirmLogout}
			/>
			<Outlet
				context={{ setPlatformEmail, isLoading, setIsLoading, isLoggedIn }}
			/>
			<Footer platformEmail={platformEmail} />
			<Modal modal={modal} closeModal={closeModal} />
		</>
	);
}

export default App;

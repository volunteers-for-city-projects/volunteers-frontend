import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Outlet } from 'react-router-dom';
import { getUserInformation, logOut } from '../../utils/api/login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		Boolean(localStorage.getItem('token'))
	);
	const [modal, setModal] = useState({
		isOpen: false,
		type: 'init',
		state: 'info',
		title: 'init',
	});
	const [platformEmail, setPlatformEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState({
		first_name: '',
		second_name: '',
		last_name: '',
		role: '',
		id: null,
		email: '',
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			getUserInformation()
				.then((user) => {
					console.log(user);
					setIsLoggedIn(true);
					setCurrentUser(user);
				})
				.catch((err) => {
					setIsLoggedIn(false);
					localStorage.removeItem('token');
					console.error(err);
				});
		}
	}, [isLoggedIn]);

	const closeModal = () => {
		setModal({
			isOpen: false,
			type: 'init',
			state: 'info',
			title: 'init',
		});
	};

	const handleLogout = (event) => {
		event.preventDefault();
		closeModal();
		logOut()
			.then(() => {
				localStorage.removeItem('token');
				navigate('/');
				setIsLoggedIn(false);
			})
			.catch((err) => console.error(err));
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

	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				handleConfirmLogout={handleConfirmLogout}
			/>
			<Outlet
				context={{
					setPlatformEmail,
					isLoading,
					setIsLoading,
					currentUser,
					setCurrentUser,
					isLoggedIn,
					setIsLoggedIn,
					setModal,
				}}
			/>
			<Footer platformEmail={platformEmail} />
			{modal.isOpen &&
				createPortal(
					<Modal modal={modal} closeModal={closeModal} />,
					document.body
				)}
		</>
	);
}

export default App;

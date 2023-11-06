import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Outlet } from 'react-router-dom';
import { getUserInformation, logOut } from '../../utils/api/login';
import {
	getVolunteerInformation,
	getOrganizationInformation,
} from '../../utils/api/profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import ModalChangePassword from '../ModalChangePassword/ModalChangePassword';

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
		firstName: '',
		secondName: '',
		lastName: '',
		role: '',
		userId: null,
		email: '',
		id: null,
		city: null,
		dateOfBirth: '',
		phone: '',
		photo: '',
		userSkills: [],
		telegram: '',
		about: '',
		ogrn: '',
		title: '',
	});
	const [modalChangePassword, setModalChangePassword] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			getUserInformation()
				.then((user) => {
					setIsLoggedIn(true);
					if (user.role === 'volunteer') {
						getVolunteerInformation(user.id_organizer_or_volunteer).then(
							(volunteer) => {
								setCurrentUser({
									firstName: user.first_name,
									secondName: user.second_name,
									lastName: user.last_name,
									role: user.role,
									userId: user.id,
									email: user.email,
									id: user.id_organizer_or_volunteer,
									city: volunteer.city,
									dateOfBirth: volunteer.date_of_birth,
									phone: volunteer.phone || '',
									photo: volunteer.photo || '',
									userSkills: volunteer.skills,
									telegram: volunteer.telegram || '',
								});
							}
						);
					} else {
						getOrganizationInformation(user.id_organizer_or_volunteer).then(
							(organizer) => {
								setCurrentUser({
									firstName: user.first_name,
									secondName: user.second_name,
									lastName: user.last_name,
									role: user.role,
									userId: user.id,
									email: user.email,
									id: user.id_organizer_or_volunteer,
									about: organizer.about || '',
									city: organizer.city,
									ogrn: organizer.ogrn,
									phone: organizer.phone,
									photo: organizer.photo || '',
									title: organizer.title,
								});
							}
						);
					}
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

	const handleChangePassword = () => {
		setModalChangePassword(true);
	};

	const closeModalPassword = () => {
		setModalChangePassword(false);
	};

	const handleChangePasswordSubmit = (e) => {
		e.preventDefault();
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
					handleChangePassword,
				}}
			/>
			<Footer platformEmail={platformEmail} />
			{modal.isOpen &&
				createPortal(
					<Modal modal={modal} closeModal={closeModal} />,
					document.body
				)}

			<ModalChangePassword
				isOpen={modalChangePassword}
				onClose={closeModalPassword}
				onSubmit={handleChangePasswordSubmit}
			/>
		</>
	);
}

export default App;

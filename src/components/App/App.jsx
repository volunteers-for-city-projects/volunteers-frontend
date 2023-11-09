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
import { getNews, getPlatformAbout } from '../../utils/api/main-page';
import { getSkills, getCities } from '../../utils/api/signupApi';
import { getProjectCategories } from '../../utils/api/organizer';

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
	const [cities, setCities] = useState([]);
	const [skills, setSkills] = useState([]);
	const [projectCategories, setProjectCategories] = useState([]);
	const [plarformAbout, setPlatformAbout] = useState({});
	const [plarformPromo, setPlatformPromo] = useState({});
	const [news, setNews] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			getUserInformation()
				.then((user) => {
					setIsLoggedIn(true);
					if (user.role === 'volunteer') {
						getVolunteerInformation(user.id_organizer_or_volunteer)
							.then((volunteer) => {
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
							})
							.catch((err) => console.error(err));
					} else {
						getOrganizationInformation(user.id_organizer_or_volunteer)
							.then((organizer) => {
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
							})
							.catch((err) => console.error(err));
					}
				})
				.catch((err) => {
					setIsLoggedIn(false);
					localStorage.removeItem('token');
					console.error(err);
				});
		}
	}, [isLoggedIn]);

	useEffect(() => {
		Promise.all([getNews(), getPlatformAbout()])
			.then(([dataNews, dataPlatformAbout]) => {
				setNews(dataNews.results);
				const { about_us: aboutUs, valuations } = dataPlatformAbout;
				const { platform_email: email } = dataPlatformAbout;
				const {
					projects_count: projectCount,
					volunteers_count: volunteersCount,
					organizers_count: organizersCount,
				} = dataPlatformAbout;
				setPlatformAbout({ aboutUs, valuations });
				setPlatformEmail(email);
				setPlatformPromo({ projectCount, volunteersCount, organizersCount });
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		Promise.all([getSkills(), getCities(), getProjectCategories()])
			.then(([skillsResponse, citiesResponse, projectCategoriesResponse]) => {
				const skillsArray = skillsResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));
				const citiesArray = citiesResponse.map((item) => ({
					label: item.name,
					value: item.id.toString(),
				}));
				const projectCategoriesArray = projectCategoriesResponse.map(
					(item) => ({
						label: item.name,
						value: item.id.toString(),
					})
				);
				setSkills(skillsArray);
				setCities(citiesArray);
				setProjectCategories(projectCategoriesArray);
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	}, []);

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
					isLoading,
					setIsLoading,
					currentUser,
					setCurrentUser,
					isLoggedIn,
					setIsLoggedIn,
					setModal,
					handleChangePassword,
					cities,
					skills,
					projectCategories,
					plarformAbout,
					plarformPromo,
					news,
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

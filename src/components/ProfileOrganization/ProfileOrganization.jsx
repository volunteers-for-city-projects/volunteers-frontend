import { useEffect } from 'react';
import './ProfileOrganization.scss';
import {
	useNavigate,
	useOutletContext,
	useLocation,
	Outlet,
} from 'react-router-dom';
import ProfileData from '../ProfileData/ProfileData';
import { Crumbs } from '../Crumbs/Crumbs';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import CardProject from '../CardProject/CardProject';
import cardsProjectsArray from '../../utils/cardsProjectsArray';
import ProfileButtonsTabs from '../ProfileButtonsTabs/ProfileButtonsTabs';
import cityImage from '../../images/city.png';
import organizationImage from '../../images/avatar.png';
import Button from '../Button/Button';
import { getUserInformation } from '../../utils/api/login';
import { getOrganizationInformation } from '../../utils/api/profile';

function ProfileOrganization() {
	const {
		currentUser,
		setCurrentUser,
		handleChangePasswordForm,
		cities,
		skills,
		projectCategories,
		setModal,
	} = useOutletContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		firstName,
		lastName,
		secondName,
		about,
		email,
		city,
		phone,
		photo,
		title,
	} = currentUser;

	const dataOrganization = [
		{
			id: 0,
			title: 'Об организации',
			subtitle: about,
		},
		{
			id: 1,
			title: 'Город:',
			subtitle: cities
				.filter((item) => city === Number(item.value))
				.map((item) => item.label)[0],
		},
		{
			id: 2,
			title: 'Представитель организации:',
			subtitle: `${firstName} ${secondName} ${lastName}`,
		},
		{
			id: 3,
			title: 'Контактные данные:',
			subtitle: [email, phone].filter((item) => item !== '').join(', '),
		},
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		getUserInformation().then((user) => {
			if (user.role === 'organizer') {
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
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return location.pathname === '/profile/organizer' ||
		location.pathname === '/profile/organizer/' ? (
		<section className="profile">
			<div className="profile__menu-container">
				<Crumbs />
			</div>
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__personal-container">
						<div className="profile__personal-label">
							<img
								className="profile__image"
								src={photo || organizationImage}
								alt="Логотип организатора"
							/>
							<div className="profile__personal-btn">
								<Pushbutton
									label="Изменить пароль"
									color="#3F3F3F"
									size="large-var"
									minWidth="280px"
									backgroundColor="transparent"
									border="1px solid #A6C94F"
									onClick={() => handleChangePasswordForm()}
								/>
								<Pushbutton
									label="Редактировать профиль"
									color="#3F3F3F"
									size="large-var"
									minWidth="280px"
									backgroundColor="transparent"
									border="1px solid #A6C94F"
									onClick={() => navigate('edit-profile')}
								/>
							</div>
						</div>
						<div className="profile__name">
							<h2 className="profile__name-surname">{title}</h2>
						</div>
						<ProfileData dataArray={dataOrganization} />
					</div>
				</div>
				<div className="profile__projects">
					<div className="profile__projects-container">
						<div className="profile__projects-label">
							<h2 className="profile__projects-title">Ваши проекты</h2>
							<div className="profile__projects-btn">
								<Pushbutton
									label="Добавить проект"
									color="white"
									size="large-var"
									minWidth="283px"
									backgroundColor="#A6C94F"
									border="none"
									onClick={() => navigate('/profile/organizer/create-project')}
								/>
							</div>
						</div>

						{cardsProjectsArray.length > 0 && <ProfileButtonsTabs />}

						{cardsProjectsArray.length > 0 ? (
							<div className="profile__projects-cards">
								{cardsProjectsArray.map((item) => (
									<CardProject cardProject={item} key={item.id} />
								))}
							</div>
						) : (
							<div className="profile__blank">
								<p className="profile__blank-title">
									Здесь будут отображаться ваши проекты
								</p>
								<img
									className="profile__blank-image"
									src={cityImage}
									alt="город"
								/>
							</div>
						)}

						{cardsProjectsArray.length >= 6 && (
							<div className="profile__button">
								<Button size="s">Показать еще</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	) : (
		<Outlet
			context={{
				currentUser,
				setCurrentUser,
				handleChangePasswordForm,
				cities,
				skills,
				projectCategories,
				setModal,
			}}
		/>
	);
}

export default ProfileOrganization;

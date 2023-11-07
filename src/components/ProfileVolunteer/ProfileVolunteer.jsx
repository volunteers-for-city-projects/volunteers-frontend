import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProfileVolunteer.scss';
import { useOutletContext } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Pushbutton } from '../Pushbutton/Pushbutton';
import ProfileData from '../ProfileData/ProfileData';
import { getCities } from '../../utils/api/signupApi';
import cityImage from '../../images/city.png';
import volunteerImage from '../../images/fotoProfile.svg';

function ProfileVolunteer({ handleIsForm }) {
	const { currentUser, handleChangePassword } = useOutletContext();

	const {
		firstName,
		lastName,
		secondName,
		email,
		city,
		phone,
		userSkills,
		photo,
		telegram,
	} = currentUser;
	const [cityName, setCityName] = useState('');

	const dataVolunteer = [
		{
			id: 0,
			title: 'Город:',
			subtitle: cityName[0],
		},
		{
			id: 1,
			title: 'Контактные данные:',
			subtitle: [email, phone, telegram]
				.filter((item) => item !== '')
				.join(', '),
		},
		{
			id: 2,
			title: 'Навыки:',
			subtitle: userSkills
				? userSkills.map((item) => item.name).join(', ')
				: [],
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const citiesResponse = await getCities();

				const citiesData = citiesResponse
					.filter((item) => city === item.id)
					.map((item) => item.name);

				setCityName(citiesData);
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			}
		};

		fetchData();
	}, [city]);

	return (
		<section className="profile">
			<div className="profile__menu-container">
				<ProfileMenu title="Личный кабинет волонтера" />
			</div>
			<div className="profile__wrapper">
				<div className="profile__personal">
					<div className="profile__personal-container">
						<img
							className="profile__image"
							src={photo || volunteerImage}
							alt="Фото волонтера"
						/>
						<div className="profile__name">
							<h2 className="profile__name-surname">
								{`${firstName} ${secondName} ${lastName}`}
							</h2>
						</div>
						{dataVolunteer.length > 0 && (
							<ProfileData dataArray={dataVolunteer} />
						)}
					</div>
					<div className="profile__button">
						<Pushbutton
							label="Изменить пароль"
							color="white"
							size="pre-large"
							minWidth="280px"
							backgroundColor="#A6C94F"
							border="none"
							onClick={handleChangePassword}
						/>
						<Pushbutton
							label="Редактировать профиль"
							color="white"
							size="pre-large"
							minWidth="280px"
							backgroundColor="#A6C94F"
							border="none"
							onClick={handleIsForm}
						/>
					</div>
				</div>
				<div className="profile__projects">
					<div className="profile__projects-container">
						<h2 className="profile__projects-title">Ваши проекты</h2>
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
					</div>
				</div>
			</div>
		</section>
	);
}

ProfileVolunteer.propTypes = {
	handleIsForm: PropTypes.func,
};

ProfileVolunteer.defaultProps = {
	handleIsForm: () => {},
};

export default ProfileVolunteer;

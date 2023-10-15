import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Signup.scss';

import PageMenu from '../PageMenu/PageMenu';
import VolunteerSignupForm from '../VolunteerSignupForm/VolunteerSignupForm';
import OrganizerSignupForm from '../OrganizerSignupForm/OrganizerSignupForm';
import FormToggleButtonGroup from '../FormToggleButtonGroup/FormToggleButtonGroup';
import Input from '../Input/Input';
import InputTextArea from '../InputTextArea/InputTextArea';
import InputGroup from '../InputGroup/InputGroup';

export default function Signup({ title, setIsPageTitle }) {
	const [isActiveForm, setIsActiveForm] = useState('');
	const [isActiveButton, setIsActiveButton] = useState('volunteer');

	const handleToggle = (buttonName) => {
		setIsActiveButton(buttonName);
	};

	useEffect(() => {
		if (isActiveButton.includes('volunteer')) {
			setIsPageTitle('Регистрация волонтёра');
			setIsActiveForm('volunteer');
		}
		if (isActiveButton.includes('organizer')) {
			setIsActiveForm('organizer');
			setIsPageTitle('Регистрация организатора');
		}
	}, [setIsPageTitle, isActiveButton]);
	// TODO написать валидацию, также сделать мин длину и максимальную длину, стилизовать страницу, добавить сторис, написать стили для загрузки
	return (
		<section className="signup">
			<PageMenu title={title} isProjectPage={false} projectTitle="" />
			<div className="signup__wrap">
				<div className="signup__image" />
				<div className="signup__content-wrap">
					<h1 className="signup__title">{title}</h1>
					<FormToggleButtonGroup
						isActiveButton={isActiveButton}
						handleToggle={handleToggle}
					/>

					{isActiveForm === 'volunteer' && (
						<VolunteerSignupForm>
							<InputGroup title="Общая информация">
								<Input
									name="firstname"
									label="Имя"
									type="text"
									placeholder="Пётр"
									inputSize="small"
									required
								/>
								<Input
									name="secondname"
									label="Фамилия"
									type="text"
									placeholder="Иванов"
									inputSize="small"
									required
								/>
								<Input
									name="thirdname"
									label="Отчество"
									type="text"
									placeholder="Сергеевич"
									inputSize="small"
									required
								/>
								<Input
									name="birthday"
									label="Дата рождения"
									type="date"
									placeholder="01.02.2010"
									inputSize="small"
									required
								/>
							</InputGroup>
							<InputGroup title="Контактные данные">
								<Input
									name="phone"
									label="Телефон"
									type="text"
									placeholder="+7 977 000-00-00"
									inputSize="small"
								/>
								<Input
									name="email"
									label="E-mail"
									type="email"
									placeholder="example@email.ru"
									inputSize="small"
									required
								/>
								<Input
									name="telegram"
									label="Telegram"
									type="text"
									placeholder="@name"
									inputSize="small"
								/>
							</InputGroup>
							<InputGroup title="Пароль">
								<Input
									name="password"
									label="Пароль"
									type="password"
									placeholder="+7 977 000-00-00"
									inputSize="small"
									required
								/>
								<Input
									name="confirm-password"
									label="Повтор пароля"
									type="password"
									placeholder="example@email.ru"
									inputSize="small"
									required
								/>
							</InputGroup>
							<InputGroup title="Фото">
								<Input name="photo" label="" type="file" inputSize="photo" />
							</InputGroup>
							<InputGroup title="Дополнительная информация">
								<Input
									name="skills"
									label="Навыки"
									type="text"
									placeholder="Выберите навыки"
									inputSize="small"
									required
								/>
								<Input
									name="city"
									label="Город"
									type="text"
									placeholder="Выберите город"
									inputSize="small"
									required
								/>
							</InputGroup>
						</VolunteerSignupForm>
					)}
					{isActiveForm === 'organizer' && (
						<OrganizerSignupForm>
							<InputGroup title="Общая информация">
								<Input
									name="organization"
									label="Название организации"
									type="text"
									placeholder=""
									inputSize="small"
									required
								/>
								<Input
									name="organize-city"
									label="Город"
									type="text"
									placeholder=""
									inputSize="small"
									required
								/>
							</InputGroup>
							<InputTextArea
								name="about-organization"
								placeholder="Расскажите коротко об организации"
							/>
							<InputGroup title="Контактные данные представителя компании">
								<Input
									name="organize-firstname"
									label="Фамилия"
									type="text"
									placeholder="Иванов"
									inputSize="small"
									required
								/>
								<Input
									name="organize-secondname"
									label="Имя"
									type="text"
									placeholder="Пётр"
									inputSize="small"
									required
								/>
								<Input
									name="organize-thirdname"
									label="Отчество"
									type="text"
									placeholder="Сергеевич"
									inputSize="small"
									required
								/>
								<Input
									name="organize-email"
									label="E-mail"
									type="text"
									placeholder="example@mail.ru"
									inputSize="small"
									required
								/>
								<Input
									name="organize-city"
									label="Телефон"
									type="text"
									placeholder="+7 977 000-00-00"
									inputSize="small"
									required
								/>
							</InputGroup>
							<InputGroup title="Дополнительная информация">
								<Input
									name="organize-ogrn"
									label="ОГРН"
									type="text"
									placeholder=""
									inputSize="small"
									required
								/>
							</InputGroup>
							<InputGroup title="Пароль">
								<Input
									name="organize-password"
									label="Пароль"
									type="password"
									placeholder="+7 977 000-00-00"
									inputSize="small"
									required
								/>
								<Input
									name="organize-confirm-password"
									label="Повтор пароля"
									type="password"
									placeholder="example@email.ru"
									inputSize="small"
									required
								/>
							</InputGroup>
						</OrganizerSignupForm>
					)}
				</div>
			</div>
		</section>
	);
}

Signup.propTypes = {
	title: PropTypes.string.isRequired,
	setIsPageTitle: PropTypes.func,
};

Signup.defaultProps = {
	setIsPageTitle: () => {},
};

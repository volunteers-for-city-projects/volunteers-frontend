import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import VolunteerSignupForm from '../VolunteerSignupForm/VolunteerSignupForm';

function App() {
	return (
		<main>
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
						name="email"
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
		</main>
	);
}

export default App;

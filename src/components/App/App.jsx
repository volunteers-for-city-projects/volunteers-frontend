import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';

function App() {
	return (
		<main>
			<InputGroup title="Основные сведения">
				<Input
					type="text"
					name="firstname"
					label="Имя"
					placeholder="Петр"
					inputSize="small"
					required
				/>
				<Input
					type="text"
					name="secondname"
					label="Фамилия"
					placeholder="Иванов"
					inputSize="small"
					required
				/>
			</InputGroup>
		</main>
	);
}

export default App;

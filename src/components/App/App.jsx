import Input from '../Input/Input';

function App() {
	return (
		<main>
			<Input
				type="text"
				name="Имя"
				label="Имя"
				placeholder="Петр"
				inputSize="small"
				required
			/>
		</main>
	);
}

export default App;

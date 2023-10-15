import { useState } from 'react';
import Signup from '../Signup/Signup';

function App() {
	const [isPageTitle, setIsPageTitle] = useState('');
	return (
		<main>
			<Signup title={isPageTitle} setIsPageTitle={setIsPageTitle} />
		</main>
	);
}

export default App;

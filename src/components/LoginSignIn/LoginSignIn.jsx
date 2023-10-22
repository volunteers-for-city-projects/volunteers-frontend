import { useOutletContext } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import ImageComponent from '../ImageComponent/ImageComponent';

function LoginSignIn() {
	const { handleSignIn, isLoading } = useOutletContext();
	return (
		<>
			<SignIn
				title="Войти"
				subtitle="в личный кабинет"
				buttonSubmitText={isLoading ? 'Вход...' : 'Войти'}
				onSignIn={handleSignIn}
			/>
			<ImageComponent
				srcList=""
				type="entrance"
				altImage="Человек заходит в дверь"
			/>
		</>
	);
}

export default LoginSignIn;

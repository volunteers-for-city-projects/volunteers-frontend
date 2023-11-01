import { useOutletContext } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import ImageComponent from '../ImageComponent/ImageComponent';
import entrance from '../../images/entrance.svg';
import './LoginSignIn.scss';

function LoginSignIn() {
	const { handleSignIn, isLoading } = useOutletContext();
	return (
		<main className="login-sign-in">
			<SignIn
				title="Войти"
				subtitle="в личный кабинет"
				buttonSubmitText={isLoading ? 'Вход...' : 'Войти'}
				onSignIn={handleSignIn}
			/>
			<ImageComponent
				src={entrance}
				type="entrance"
				altImage="Человек заходит в дверь"
			/>
		</main>
	);
}

export default LoginSignIn;

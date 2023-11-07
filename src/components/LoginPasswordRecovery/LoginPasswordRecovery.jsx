import { useOutletContext } from 'react-router-dom';
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery';
import ImageComponent from '../ImageComponent/ImageComponent';
import flashlight from '../../images/flashlight.svg';
import './LoginPasswordRecovery.scss';

function LoginPasswordRecovery() {
	const { handlePasswordReset, isLoading } = useOutletContext();

	return (
		<main className="login-password-recovery">
			<div className="login-password-recovery__wrapper">
				<PasswordRecovery
					title="Восстановление пароля"
					subtitle="Введите E-mail, указанный при регистрации — мы отправим вам ссылку для восстановления пароля"
					buttonSubmitText={
						isLoading ? 'Сбрасываем пароль...' : 'Сбросить пароль'
					}
					onPasswordReset={handlePasswordReset}
				/>
				<ImageComponent
					src={flashlight}
					type="flashlight"
					altImage="Человек заходит в дверь"
				/>
			</div>
		</main>
	);
}

export default LoginPasswordRecovery;

import { useOutletContext } from 'react-router-dom';
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery';
import ImageComponent from '../ImageComponent/ImageComponent';

function LoginPasswordRecovery() {
	const { handlePasswordReset, isLoading } = useOutletContext();

	return (
		<>
			<PasswordRecovery
				title="Восстановление пароля"
				subtitle="Введите E-mail, указанный при регистрации — мы отправим вам ссылку для восстановления пароля"
				buttonSubmitText={
					isLoading ? 'Сбрасываем пароль...' : 'Сбросить пароль'
				}
				onPasswordReset={handlePasswordReset}
			/>
			<ImageComponent
				srcList=""
				type="entrance"
				altImage="Человек заходит в дверь"
			/>
		</>
	);
}

export default LoginPasswordRecovery;

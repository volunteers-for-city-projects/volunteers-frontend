import { useOutletContext, useParams } from 'react-router-dom';
import PasswordReset from '../PasswordReset/PasswordReset';
import ImageComponent from '../ImageComponent/ImageComponent';
import flashlight from '../../images/flashlightWithTrash.svg';
import './LoginPasswordReset.scss';

function LoginPasswordReset() {
	const { handleSaveChanges, isLoading } = useOutletContext();
	const { uid, token } = useParams();
	const handleOnSaveChanges = ({ password }) => {
		handleSaveChanges({
			password,
			uid,
			token,
		});
	};

	return (
		<main className="login-password-reset">
			<div className="login-password-reset__wrapper">
				<PasswordReset
					title="Сброс пароля"
					subtitle="Введите новый пароль"
					buttonSubmitText={isLoading ? 'Сохранение...' : 'Сохранить изменения'}
					onSaveChanges={handleOnSaveChanges}
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

export default LoginPasswordReset;

import { useOutletContext } from 'react-router-dom';
import PasswordReset from '../PasswordReset/PasswordReset';
import ImageComponent from '../ImageComponent/ImageComponent';
import flashlight from '../../images/flashlight.svg';

function LoginPasswordReset() {
	const { handleSaveChanges, isLoading } = useOutletContext();
	return (
		<>
			<PasswordReset
				title="Сброс пароля"
				subtitle="Введите новый пароль"
				buttonSubmitText={isLoading ? 'Сохранение...' : 'Сохранить изменения'}
				onSaveChanges={handleSaveChanges}
			/>
			<ImageComponent
				src={flashlight}
				type="flashlight"
				altImage="Человек заходит в дверь"
			/>
		</>
	);
}

export default LoginPasswordReset;

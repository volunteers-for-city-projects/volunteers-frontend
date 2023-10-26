import { useOutletContext } from 'react-router-dom';
import PasswordReset from '../PasswordReset/PasswordReset';
import ImageComponent from '../ImageComponent/ImageComponent';

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
				src=""
				type="entrance"
				altImage="Человек заходит в дверь"
			/>
		</>
	);
}

export default LoginPasswordReset;

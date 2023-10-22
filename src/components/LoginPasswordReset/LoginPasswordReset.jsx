import PasswordReset from '../PasswordReset/PasswordReset';
import ImageComponent from '../ImageComponent/ImageComponent';

function LoginPasswordReset() {
	return (
		<>
			<PasswordReset
				title="Сброс пароля"
				subtitle="Введите новый пароль"
				buttonSubmitText="Сохранить изменения"
			/>
			<ImageComponent
				srcList=""
				type="entrance"
				altImage="Человек заходит в дверь"
			/>
		</>
	);
}

export default LoginPasswordReset;

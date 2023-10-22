import SignIn from '../SignIn/SignIn';
import ImageComponent from '../ImageComponent/ImageComponent';

function LoginSignIn() {
	return (
		<>
			<SignIn />
			<ImageComponent
				srcList=""
				type="entrance"
				altImage="Человек заходит в дверь"
			/>
		</>
	);
}

export default LoginSignIn;

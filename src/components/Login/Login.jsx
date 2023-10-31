import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './Login.scss';
import { signIn, getUserInformation } from '../../utils/api/login';

function Login() {
	const { isLoading, setIsLoading, setCurrentUser, setIsLoggedIn, setModal } =
		useOutletContext();

	const navigate = useNavigate();

	const handleSignIn = ({ password, email }) => {
		setIsLoading(true);
		signIn({ password, email })
			.then((data) => {
				if (data.auth_token) {
					localStorage.setItem('token', data.auth_token);
					getUserInformation().then((user) => {
						setCurrentUser(user);
						setIsLoggedIn(true);
						navigate('/profile');
					});
				}
			})
			.catch((err) => {
				if (Array.isArray(err)) {
					setModal({
						isOpen: true,
						type: 'error',
						state: 'info',
						title: 'Произошла ошибка',
						errorArray: err,
					});
				} else {
					console.error(err);
				}
			})
			.finally(setIsLoading(false));
	};

	const handlePasswordReset = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			navigate('/login/password-reset');
		}, 2000);
	};

	const handleSaveChanges = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setModal({
				isOpen: true,
				type: 'password',
				state: 'success',
				title: 'Сброс пароля',
				onSubmit: (event) => {
					event.preventDefault();
					navigate('/login');
				},
			});
		}, 2000);
	};

	return (
		<main className="login">
			<Outlet
				context={{
					isLoading,
					handleSignIn,
					handlePasswordReset,
					handleSaveChanges,
				}}
			/>
		</main>
	);
}

export default Login;

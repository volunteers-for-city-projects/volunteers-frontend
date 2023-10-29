import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './Login.scss';
import { apiLogin } from '../../utils/api/login-route';

function Login() {
	const { isLoading, setIsLoading, setIsCurrentUser, setIsLoggedIn, setModal } =
		useOutletContext();

	const navigate = useNavigate();

	const handleSignIn = ({ password, email }) => {
		setIsLoading(true);
		apiLogin
			.signIn({ password, email })
			.then((data) => {
				if (data.auth_token) {
					localStorage.setItem('token', data.auth_token);
					apiLogin.getUserInformation().then((user) => {
						setIsCurrentUser(user);
						setIsLoggedIn(true);
						navigate('/profile');
					});
				}
			})
			.catch((err) => {
				// eslint-disable-next-line
				alert(err.non_field_errors[0]);
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

import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './Login.scss';
import { apiLogin } from '../../utils/api/login-route';
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

	const handlePasswordReset = ({ email }) => {
		setIsLoading(true);
		apiLogin
			.resetPassword({ email })
			.then(() => {
				setModal({
					isOpen: true,
					type: 'email',
					state: 'info',
					onSubmit: (event) => {
						event.preventDefault();
						handlePasswordReset({ email });
					},
				});
			})
			.catch((err) => {
				// eslint-disable-next-line
				alert(err.non_field_errors[0]);
			})
			.finally(setIsLoading(false));
	};

	const handleSaveChanges = ({ password, uid, token }) => {
		setIsLoading(true);
		apiLogin
			.resetPasswordConfirm({ password, uid, token })
			.then(() => {
				setModal({
					isOpen: true,
					type: 'password',
					state: 'success',
					onSubmit: (event) => {
						event.preventDefault();
						navigate('/login');
						setModal({
							isOpen: false,
						});
					},
				});
			})
			.catch((err) => {
				// eslint-disable-next-line
				alert(err.non_field_errors[0]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Outlet
			context={{
				isLoading,
				setIsLoading,
				setModal,
				handleSignIn,
				handlePasswordReset,
				handleSaveChanges,
			}}
		/>
	);
}

export default Login;

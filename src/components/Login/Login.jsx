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
				handleSignIn,
				handlePasswordReset,
				handleSaveChanges,
			}}
		/>
	);
}

export default Login;

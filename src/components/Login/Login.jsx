import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import {
	signIn,
	getUserInformation,
	resetPassword,
	resetPasswordConfirm,
} from '../../utils/api/login';
import { resendActivateUser } from '../../utils/api/signupApi';

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
					if (Object.prototype.hasOwnProperty.call(err[0], 'notActiveEmail')) {
						setModal({
							isOpen: true,
							type: 'error',
							state: 'notActiveEmail',
							title: 'Произошла ошибка',
							errorArray: err,
							onSubmit: (event) => {
								event.preventDefault();
								resendActivateUser({ email }).catch((error) =>
									console.error(error)
								);
							},
						});
					} else if (
						Object.prototype.hasOwnProperty.call(err[0], 'notExistEmail')
					) {
						setModal({
							isOpen: true,
							type: 'error',
							state: 'notExistEmail',
							title: 'Произошла ошибка',
							errorArray: err,
							onSubmit: (event) => {
								event.preventDefault();
								navigate('/registration');
								setModal({
									isOpen: false,
								});
							},
						});
					} else if (Object.prototype.hasOwnProperty.call(err[0], 'password')) {
						setModal({
							isOpen: true,
							type: 'error',
							state: 'password',
							title: 'Произошла ошибка',
							errorArray: err,
						});
					} else {
						setModal({
							isOpen: true,
							type: 'error',
							state: 'info',
							title: 'Произошла ошибка',
							errorArray: err,
						});
					}
				} else {
					console.error(err);
				}
			})
			.finally(setIsLoading(false));
	};

	const handlePasswordReset = ({ email }) => {
		setIsLoading(true);
		resetPassword({ email })
			.then(() => {
				setModal({
					isOpen: true,
					type: 'email',
					state: 'info',
					emailprop: email,
					onSubmit: (event) => {
						event.preventDefault();
						handlePasswordReset({ email });
					},
				});
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

	const handleSaveChanges = ({ password, uid, token }) => {
		setIsLoading(true);
		resetPasswordConfirm({ password, uid, token })
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

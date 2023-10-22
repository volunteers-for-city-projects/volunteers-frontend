import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './Login.scss';

function Login() {
	const { isLoading, setIsLoading } = useOutletContext();
	const navigate = useNavigate();

	const handleSignIn = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
	};

	const handlePasswordReset = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			navigate('/login/password-reset');
		}, 5000);
	};

	const handleSaveChanges = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 5000);
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

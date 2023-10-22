import { Outlet } from 'react-router-dom';
import './Login.scss';

function Login() {
	return (
		<main className="login">
			<Outlet />
		</main>
	);
}

export default Login;

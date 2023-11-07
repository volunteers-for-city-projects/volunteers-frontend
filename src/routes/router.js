import { Link, createHashRouter } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Main from '../components/Main/Main';
import App from '../components/App/App';
import Profile from '../components/Profile/Profile';
import Login from '../components/Login/Login';
import LoginSignIn from '../components/LoginSignIn/LoginSignIn';
import LoginPasswordRecovery from '../components/LoginPasswordRecovery/LoginPasswordRecovery';
import LoginPasswordReset from '../components/LoginPasswordReset/LoginPasswordReset';
import NotFound from '../components/NotFound/NotFound';
import Project from '../components/Project/Project';
import {
	ProtectedRouteElementForUnauthorized,
	ProtectedRouteElementForAuthorized,
} from './ProtectedRoute';
import './router.scss';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		handle: {
			crumb: () => (
				<Link to="/" className="router__link">
					Главная
				</Link>
			),
		},
		children: [
			{
				index: true,
				element: <Main />,
			},

			{
				path: 'registration',
				element: (
					<ProtectedRouteElementForAuthorized>
						<Signup />
					</ProtectedRouteElementForAuthorized>
				),
			},
			{
				path: 'login',
				element: (
					<ProtectedRouteElementForAuthorized>
						<Login />
					</ProtectedRouteElementForAuthorized>
				),
				handle: {
					crumb: () => (
						<Link to="/login" className="router__link">
							Вход
						</Link>
					),
				},

				children: [
					{
						index: true,
						element: <LoginSignIn />,
					},
					{
						path: 'password-recovery',
						element: <LoginPasswordRecovery />,
						handle: {
							crumb: () => (
								<Link to="/login/password-recovery" className="router__link">
									Восстановление
								</Link>
							),
						},
					},
					{
						path: 'password-activate/:uid/:token',
						element: <LoginSignIn />,
					},
					{
						path: 'password-reset/:uid/:token',
						element: <LoginPasswordReset />,
					},
				],
			},
			{
				path: 'projects',
				// element: <Projects />,
			},
			{
				path: 'profile',
				element: (
					<ProtectedRouteElementForUnauthorized>
						<Profile />
					</ProtectedRouteElementForUnauthorized>
				),
			},
			{
				path: 'project',
				element: <Project />,
			},

			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default router;

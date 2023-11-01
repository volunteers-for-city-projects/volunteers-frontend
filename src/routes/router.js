import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Main from '../components/Main/Main';
import App from '../components/App/App';
import Profile from '../components/Profile/Profile';
import Login from '../components/Login/Login';
import LoginSignIn from '../components/LoginSignIn/LoginSignIn';
import LoginPasswordRecovery from '../components/LoginPasswordRecovery/LoginPasswordRecovery';
import LoginPasswordReset from '../components/LoginPasswordReset/LoginPasswordReset';
import NotFound from '../components/NotFound/NotFound';
import {
	ProtectedRouteElementForUnauthorized,
	ProtectedRouteElementForAuthorized,
} from './ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
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
				path: 'login/',
				element: (
					<ProtectedRouteElementForAuthorized>
						<Login />
					</ProtectedRouteElementForAuthorized>
				),
				children: [
					{
						index: true,
						element: <LoginSignIn />,
					},
					{
						path: 'password-recovery',
						element: <LoginPasswordRecovery />,
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
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default router;

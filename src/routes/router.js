import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Main from '../components/Main/Main';
import App from '../components/App/App';
import Main from '../components/Main/Main';
import ProfileVolunteer from '../components/ProfileVolunteer/ProfileVolunteer';

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
				element: <Signup />,
			},
			{
				path: 'login',
				// element: <Login />,
			},
			{
				path: 'projects',
				// element: <Projects />,
			},
			{
				path: 'profile',
				element: <ProfileVolunteer />,
			},

			{
				path: '*',
				// element: <NotFoundPage />,
			},
		],
	},
]);

export default router;

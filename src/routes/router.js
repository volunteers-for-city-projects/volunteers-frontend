import PropTypes from 'prop-types';
import { createBrowserRouter } from 'react-router-dom';
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
				// element: <Registration />,
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
				element: <ProfileVolunteer isVolunteer />,
			},

			{
				path: '*',
				// element: <NotFoundPage />,
			},
		],
	},
]);

ProfileVolunteer.propTypes = {
	isVolunteer: PropTypes.bool,
};

export default router;

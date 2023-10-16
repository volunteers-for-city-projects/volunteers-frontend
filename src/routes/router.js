import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App/App';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				// element: <MainPage />,
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
				path: '*',
				// element: <NotFoundPage />,
			},
		],
	},
]);

export default router;

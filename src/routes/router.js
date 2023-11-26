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
	ProtectedRouteElementForAuthorizedVolunteer,
	ProtectedRouteElementForAuthorizedOrganizer,
} from './ProtectedRoute';
import './router.scss';
import VolunteerSignupForm from '../components/VolunteerSignupForm/VolunteerSignupForm';
import OrganizerSignupForm from '../components/OrganizerSignupForm/OrganizerSignupForm';
import ProfileVolunteer from '../components/ProfileVolunteer/ProfileVolunteer';
import ProfileVolunteerEdit from '../components/ProfileVolunteerEdit/ProfileVolunteerEdit';
import ProfileOrganization from '../components/ProfileOrganization/ProfileOrganization';
import ProfileOrganizationEdit from '../components/ProfileOrganizationEdit/ProfileOrganizationEdit';
import Projects from '../components/Projects/Projects';
import PageProjectIncomes from '../components/PageProjectIncomes/PageProjectIncomes';
import ProjectView from '../components/ProjectView/ProjectView';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		handle: {
			crumb: () => (
				<Link to="/" className="router__link router__link_mane">
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
				children: [
					{
						path: 'volunteer',
						element: <VolunteerSignupForm />,
						handle: {
							crumb: () => (
								<Link to="/registration/volunteer" className="router__link">
									Регистрация волонтёра
								</Link>
							),
						},
					},
					{
						path: 'organizer',
						element: <OrganizerSignupForm />,
						handle: {
							crumb: () => (
								<Link to="/registration/organizer" className="router__link">
									Регистрация организатора
								</Link>
							),
						},
					},
				],
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
				element: <Projects />,
				handle: {
					crumb: () => (
						<Link to="/projects" className="router__link">
							Проекты
						</Link>
					),
				},
			},
			{
				path: 'project/:projectId/incomes',
				element: <PageProjectIncomes status="application_submitted" />,
			},
			{
				path: 'project/:projectId/participants',
				element: <PageProjectIncomes status="accepted" />,
			},
			{
				path: 'projects/:idProject',
				element: <ProjectView />,
			},
			{
				path: 'profile',
				element: (
					<ProtectedRouteElementForUnauthorized>
						<Profile />
					</ProtectedRouteElementForUnauthorized>
				),
				children: [
					{
						path: 'volunteer',
						element: (
							<ProtectedRouteElementForAuthorizedVolunteer>
								<ProfileVolunteer />
							</ProtectedRouteElementForAuthorizedVolunteer>
						),
						handle: {
							crumb: () => (
								<Link to="/profile/volunteer" className="router__link">
									Личный кабинет волонтёра
								</Link>
							),
						},
						children: [
							{
								path: 'edit-profile',
								element: <ProfileVolunteerEdit />,
								handle: {
									crumb: () => (
										<Link
											to="/profile/volunteer/edit-profile"
											className="router__link"
										>
											Редактирование профиля
										</Link>
									),
								},
							},
						],
					},
					{
						path: 'organizer',
						element: (
							<ProtectedRouteElementForAuthorizedOrganizer>
								<ProfileOrganization />
							</ProtectedRouteElementForAuthorizedOrganizer>
						),
						handle: {
							crumb: () => (
								<Link to="/profile/organizer" className="router__link">
									Личный кабинет организатора
								</Link>
							),
						},
						children: [
							{
								path: 'edit-profile',
								element: <ProfileOrganizationEdit />,
								handle: {
									crumb: () => (
										<Link
											to="/profile/organizer/edit-profile"
											className="router__link"
										>
											Редактирование профиля
										</Link>
									),
								},
							},
							{
								path: 'create-project',
								element: <Project />,
								handle: {
									crumb: () => (
										<Link
											to="/profile/organizer/create-project"
											className="router__link"
										>
											Новый проект
										</Link>
									),
								},
							},
						],
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

export default router;

import { Navigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRouteElementForUnauthorized = ({ children }) => {
	const { isLoggedIn } = useOutletContext();

	return isLoggedIn ? children : <Navigate to="/" replace />;
};

export const ProtectedRouteElementForAuthorized = ({ children }) => {
	const { isLoggedIn } = useOutletContext();

	return isLoggedIn ? <Navigate to="/profile" replace /> : children;
};

export const ProtectedRouteElementForAuthorizedVolunteer = ({ children }) => {
	const { currentUser } = useOutletContext();
	const { role } = currentUser;

	return role === 'volunteer' ? children : <Navigate to="/profile" replace />;
};

export const ProtectedRouteElementForAuthorizedOrganizer = ({ children }) => {
	const { currentUser } = useOutletContext();
	const { role } = currentUser;

	return role === 'organizer' ? children : <Navigate to="/profile" replace />;
};

ProtectedRouteElementForUnauthorized.propTypes = {
	children: PropTypes.node.isRequired,
};

ProtectedRouteElementForAuthorized.propTypes = {
	children: PropTypes.node.isRequired,
};

ProtectedRouteElementForAuthorizedVolunteer.propTypes = {
	children: PropTypes.node.isRequired,
};

ProtectedRouteElementForAuthorizedOrganizer.propTypes = {
	children: PropTypes.node.isRequired,
};

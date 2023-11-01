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

ProtectedRouteElementForUnauthorized.propTypes = {
	children: PropTypes.node.isRequired,
};

ProtectedRouteElementForAuthorized.propTypes = {
	children: PropTypes.node.isRequired,
};

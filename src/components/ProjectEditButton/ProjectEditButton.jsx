import './ProjectEditButton.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ProjectEditButton({ parent, projectId }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`project/edit/${projectId}`);
	};
	return (
		<button
			onClick={handleClick}
			className={`project-edit-btn ${(parent, projectId)}__project-edit-btn`}
		>
			{' '}
		</button>
	);
}

export default ProjectEditButton;

ProjectEditButton.propTypes = {
	parent: PropTypes.string,
	projectId: PropTypes.string,
};

ProjectEditButton.defaultProps = {
	parent: '',
	projectId: '',
};

import './ProjectEditButton.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ProjectEditButton({ parent, projectId }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/profile/organizer/edit-project/${projectId}`);
	};
	return (
		<button
			onClick={handleClick}
			className={` project-edit-btn ${parent}__project-edit-btn`}
		>
			{' '}
		</button>
	);
}

export default ProjectEditButton;

ProjectEditButton.propTypes = {
	parent: PropTypes.string,
	projectId: PropTypes.number,
};

ProjectEditButton.defaultProps = {
	parent: '',
	projectId: '',
};

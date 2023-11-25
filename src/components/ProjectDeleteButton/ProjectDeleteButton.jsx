import './ProjectDeleteButton.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { deleteCardProjectOrganization } from '../../utils/api/projects';

function ProjectDeleteButton({ projectId }) {
	const [setDeleteCard] = useState(false);
	const deleteProjectCard = () => {
		deleteCardProjectOrganization(projectId)
			.then(() => setDeleteCard(true))
			.catch((err) => console.log(err));
	};

	return (
		<button
			className="project__delete-button"
			onClick={deleteProjectCard}
			type="button"
		>
			{' '}
		</button>
	);
}
ProjectDeleteButton.propTypes = {
	projectId: PropTypes.number,
};
ProjectDeleteButton.defaultProps = {
	projectId: 0,
};
export default ProjectDeleteButton;

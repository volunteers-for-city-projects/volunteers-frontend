import './ProjectLikeButton.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
	setLikeForProject,
	resetLikeForProject,
} from '../../utils/api/projects';

function ProjectLikeButton({ parent, projectId, isFavorited }) {
	const [isLiked, setIsLiked] = useState(false);
	useEffect(() => {
		setIsLiked(isFavorited);
	}, [isFavorited]);
	const toggleLike = () => {
		if (isLiked) {
			resetLikeForProject(projectId)
				.then(() => setIsLiked(false))
				.catch((err) => console.log(err));
		} else {
			setLikeForProject(projectId)
				.then(() => setIsLiked(true))
				.catch((err) => console.log(err));
		}
	};
	return (
		<button
			onClick={toggleLike}
			className={`project-like-btn ${parent}__like-btn  ${
				isLiked ? 'project-like-btn_state_liked' : ''
			} `}
			type="button"
		>
			{' '}
		</button>
	);
}
ProjectLikeButton.propTypes = {
	parent: PropTypes.string,
	projectId: PropTypes.number,
	isFavorited: PropTypes.bool,
};
ProjectLikeButton.defaultProps = {
	parent: '',
	projectId: 0,
	isFavorited: false,
};
export default ProjectLikeButton;

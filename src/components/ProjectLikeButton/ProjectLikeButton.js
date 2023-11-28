import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProjectLikeButton.scss';
import { useEffect, useState } from 'react';
import {
	setLikeForProject,
	resetLikeForProject,
} from '../../utils/api/projects';
import { ROLE_ORGANIZER } from '../../utils/constants';

function ProjectLikeButton({ parent, cardProject, onCardDisliked }) {
	const {
		id: projectId,
		is_favorited: isFavorited,
		organization,
	} = cardProject;
	const [isLiked, setIsLiked] = useState(false);
	const { currentUser } = useOutletContext();
	useEffect(() => {
		setIsLiked(isFavorited);
	}, [isFavorited]);

	const toggleLike = () => {
		if (isLiked) {
			resetLikeForProject(projectId)
				.then(() => {
					setIsLiked(false);
					if (
						currentUser.role !== ROLE_ORGANIZER ||
						currentUser.id !== organization
					) {
						onCardDisliked(projectId);
					}
				})
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
	cardProject: PropTypes.shape({
		id: PropTypes.number,
		is_favorited: PropTypes.bool,
		organization: PropTypes.number,
	}),
	onCardDisliked: PropTypes.func,
};

ProjectLikeButton.defaultProps = {
	parent: '',
	cardProject: PropTypes.shape({
		is_favorited: false,
		id: null,
		organization: null,
	}),
	onCardDisliked: undefined,
};

export default ProjectLikeButton;

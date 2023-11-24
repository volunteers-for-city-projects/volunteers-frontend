import './ProjectDeleteButton.scss';
// import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useOutletContext, Outlet } from 'react-router-dom';
import { deleteCardProjectOrganization } from '../../utils/api/projects';

function ProjectDeleteButton({ projectId }) {
	const { projectsMe, setProjectsMe } = useOutletContext();
	const { setModal, setPopup, closePopup } = useOutletContext();

	//	const [setDeleteCard] = useState(false);

	const deleteProjectCard = () => {
		deleteCardProjectOrganization(projectId)
			.then(() =>
				setProjectsMe(projectsMe.filter((m) => m.projectId !== projectId))
			)

			.catch((err) => {
				console.error(err);
			});
	};

	const handleDeleteModal = () => {
		setModal({
			isOpen: true,
			type: 'deleteCardProject',
			state: 'info',
			title: 'Удаление проекта',
			typeStyle: 'deleteCardProject',
			onSubmit: (event) => {
				event.preventDefault();
				deleteProjectCard();
				setModal({
					isOpen: false,
				});
			},
		});
	};

	return (
		<>
			<button
				className="project__delete-button"
				onClick={handleDeleteModal}
				type="button"
			>
				{' '}
			</button>

			<Outlet
				context={{
					setModal,
					setPopup,
					closePopup,
				}}
			/>
		</>
	);
}
ProjectDeleteButton.propTypes = {
	projectId: PropTypes.number,
};
ProjectDeleteButton.defaultProps = {
	projectId: 0,
};
export default ProjectDeleteButton;

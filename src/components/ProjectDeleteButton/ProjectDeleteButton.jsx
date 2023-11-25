import './ProjectDeleteButton.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useOutletContext, Outlet } from 'react-router-dom';
import { deleteCardProjectOrganization } from '../../utils/api/projects';

function ProjectDeleteButton({ projectId }) {
	const { projectsMe, setModal, setPopup, closePopup } = useOutletContext();

	const [projectsDelete, setProjectsDelete] = useState(projectsMe);

	const deleteProjectCard = () => {
		deleteCardProjectOrganization(projectId)
			.then(() =>
				setProjectsDelete(
					projectsDelete.filter((m) => m.projectId !== projectId)
				)
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
					projectsMe,
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

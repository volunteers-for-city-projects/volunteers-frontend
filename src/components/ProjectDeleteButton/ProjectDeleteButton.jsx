import './ProjectDeleteButton.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useOutletContext, Outlet } from 'react-router-dom';
import { deleteCardProjectOrganization } from '../../utils/api/projects';

function ProjectDeleteButton({ projectId }) {
	// , setPopup, closePopup

	const { projectsMe, setModal, setPopup, closePopup } = useOutletContext();
	const [projectsDelete, setProjectsDelete] = useState(projectsMe);

	const deleteProjectCard = () => {
		deleteCardProjectOrganization(projectId)
			.then(() => {
				setProjectsDelete(
					projectsDelete.filter((m) => m.projectId !== projectId)
				);
				setModal({
					isOpen: true,
					type: 'deleteCardProject',
					state: 'success',
					title: '',
					typeStyle: 'deleteCardProject',
				});
			})

			//	.catch((err) => {
			//		if (Array.isArray(err)) {
			//			setPopup({
			//				isOpen: true,
			//				type: 'error',
			//				styleType: 'modal',
			//				errorArray: err,
			//			});
			//		} else {
			//			console.error(err);
			//		}
			//		closePopup();
			//	})

			.catch((err) => {
				console.log(err);
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
	// popup: PropTypes.shape({
	//	isOpen: PropTypes.bool,
	//	text: PropTypes.string,
	//	type: PropTypes.string,
	// }).isRequired,
	// closePopup: PropTypes.func.isRequired,
	// setPopup: PropTypes.func.isRequired,
};
ProjectDeleteButton.defaultProps = {
	projectId: 0,
};
export default ProjectDeleteButton;

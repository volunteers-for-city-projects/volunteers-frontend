import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
	MESSAGE_PROJECT_COMPLETED,
	MESSAGE_PROJECT_APPLICATIONS_EXPECTED,
	MESSAGE_PROJECT_ACCEPTANCE_APPLICATIONS_OPEN,
	MESSAGE_PROJECT_ACCEPTANCE_APPLICATIONS_OVER,
	MESSAGE_PROJECT_NO_DATE,
	DATE_FORMAT_FROM_SERVER,
} from '../../utils/constants';
import './ShowProjectStatus.scss';

function ShowProjectStatus({ cardProject, className }) {
	let {
		start_date_application: startDateApplication,
		end_date_application: endDateApplication,
		start_datetime: startDateTime,
		end_datetime: endDateTime,
	} = cardProject;
	const { status } = cardProject;
	let message = '';
	let type = '';

	function formatDate(date) {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timezone: 'UTC',
		};
		return new Date(date).toLocaleString('ru', options).replace(' г.', '');
	}

	if (
		startDateApplication &&
		endDateApplication &&
		startDateTime &&
		endDateTime
	) {
		startDateApplication = moment(
			startDateApplication,
			DATE_FORMAT_FROM_SERVER
		);
		endDateApplication = moment(endDateApplication, DATE_FORMAT_FROM_SERVER);
		startDateTime = moment(startDateTime, DATE_FORMAT_FROM_SERVER);
		endDateTime = moment(endDateTime, DATE_FORMAT_FROM_SERVER);
		if (status === 'project_completed') {
			message = MESSAGE_PROJECT_COMPLETED + formatDate(endDateTime);
			type = 'project_completed';
		} else {
			const currentDate = new Date();
			if (currentDate < startDateApplication) {
				message =
					MESSAGE_PROJECT_APPLICATIONS_EXPECTED +
					formatDate(startDateApplication);
				type = 'applications-expected';
			} else if (currentDate > endDateApplication) {
				message =
					MESSAGE_PROJECT_ACCEPTANCE_APPLICATIONS_OVER +
					formatDate(startDateTime);
				type = 'applications-over';
			} else {
				message =
					MESSAGE_PROJECT_ACCEPTANCE_APPLICATIONS_OPEN +
					formatDate(endDateApplication);
				type = 'applications-open';
			}
		}
	} else {
		message = MESSAGE_PROJECT_NO_DATE;
		type = 'project_completed';
	}

	const classes = [
		'project-status',
		type && `project-status_type_${type}`,
		className,
	];

	return <p className={clsx(classes)}>{message}</p>;
}

export default ShowProjectStatus;

ShowProjectStatus.propTypes = {
	cardProject: PropTypes.shape({
		start_date_application: PropTypes.string,
		end_date_application: PropTypes.string,
		start_datetime: PropTypes.string,
		end_datetime: PropTypes.string,
		status: PropTypes.oneOf([
			'open',
			'ready_for_feedback',
			'project_completed',
			'canceled_by_organizer',
			'editing',
		]),
	}),
	className: PropTypes.string,
};

ShowProjectStatus.defaultProps = {
	cardProject: {
		start_date_application: '',
		end_date_application: '',
		start_datetime: '',
		end_datetime: '',
		status: null,
	},
	className: '',
};

import PropTypes from 'prop-types';
import './ProfileData.scss';

function ProfileData({ dataArray }) {
	return (
		<div className="profile__data">
			{dataArray.map((data) => (
				<div key={data.id}>
					<h3 className="profile__data-title">{data.title}</h3>
					<p className="profile__data-subtitle">{data.subtitle}</p>
				</div>
			))}
		</div>
	);
}

export default ProfileData;

ProfileData.propTypes = {
	dataArray: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string.isRequired,
		})
	).isRequired,
};

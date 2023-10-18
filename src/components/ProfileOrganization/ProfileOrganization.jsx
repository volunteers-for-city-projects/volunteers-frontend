import ProfileData from '../ProfileData/ProfileData';
import dataOrganization from '../../utils/dataOrganization';

function ProfileOrganization() {
	return (
		<section className="profile-org">
			<div className="profile__name">
				<h2 className="profile__name-surname">ООО "Организация"</h2>
			</div>
			<ProfileData dataArray={dataOrganization} />
		</section>
	);
}

export default ProfileOrganization;

import './ProfilePagination.scss';

function ProfilePagination() {
	return (
		<div className="profile__pagination">
			<button className="profile__pagination-btn profile__pagination-btn_border">
				&#60;
			</button>
			<button className="profile__pagination-btn profile__pagination-btn_activ">
				1
			</button>
			<button className="profile__pagination-btn">2</button>
			<button className="profile__pagination-btn">3</button>
			<button className="profile__pagination-btn">4</button>
			<button className="profile__pagination-btn">5</button>
			<button className="profile__pagination-btn profile__pagination-btn_border">
				&#62;
			</button>
		</div>
	);
}

export default ProfilePagination;

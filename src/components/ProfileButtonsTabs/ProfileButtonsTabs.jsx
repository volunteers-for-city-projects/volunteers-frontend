import './ProfileButtonsTabs.scss';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { Pushbutton } from '../Pushbutton/Pushbutton';

function ProfileButtonsTabs({ activeTab, setActiveTab }) {
	const location = useLocation();
	const pageProfile = location.pathname === '/profile/organizer';

	return (
		<div className="buttons-tabs__container">
			{pageProfile ? (
				<>
					<Pushbutton
						label="Избранные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'favorites'
								? setActiveTab('favorites')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'favorites' ? '#FDFDFD' : '#a6c94f'}
					/>
					<Pushbutton
						label="Активен"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'active' ? setActiveTab('active') : setActiveTab('')
						}
						backgroundColor={activeTab !== 'active' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Черновик"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'draft' ? setActiveTab('draft') : setActiveTab('')
						}
						backgroundColor={activeTab !== 'draft' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="На модерации"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'moderation'
								? setActiveTab('moderation')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'moderation' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Завершен"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'completed'
								? setActiveTab('completed')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'completed' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="В архиве"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'archive'
								? setActiveTab('archive')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'archive' ? '#FDFDFD' : '#a6c94f'}
					/>
				</>
			) : (
				<>
					<Pushbutton
						label="Избранные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'favorites'
								? setActiveTab('favorites')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'favorites' ? '#FDFDFD' : '#a6c94f'}
					/>
					<Pushbutton
						label="Активные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'active' ? setActiveTab('active') : setActiveTab('')
						}
						backgroundColor={activeTab !== 'active' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Завершенные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'completed'
								? setActiveTab('completed')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'completed' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Отмененные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() =>
							activeTab !== 'canceled'
								? setActiveTab('canceled')
								: setActiveTab('')
						}
						backgroundColor={activeTab !== 'canceled' ? '#FDFDFD' : '#a6c94f'}
					/>
				</>
			)}
		</div>
	);
}

ProfileButtonsTabs.propTypes = {
	setActiveTab: PropTypes.func.isRequired,
	activeTab: PropTypes.string.isRequired,
};

export default ProfileButtonsTabs;

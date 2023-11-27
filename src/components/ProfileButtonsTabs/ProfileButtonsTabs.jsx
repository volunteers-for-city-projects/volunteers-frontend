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
						onClick={() => setActiveTab('favorites')}
						backgroundColor={activeTab !== 'favorites' ? '#FDFDFD' : '#a6c94f'}
					/>
					<Pushbutton
						label="Активен"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('active')}
						backgroundColor={activeTab !== 'active' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Черновик"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('draft')}
						backgroundColor={activeTab !== 'draft' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="На модерации"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('moderation')}
						backgroundColor={activeTab !== 'moderation' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Завершен"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('completed')}
						backgroundColor={activeTab !== 'completed' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="В архиве"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('archive')}
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
						onClick={() => setActiveTab('favorites')}
						backgroundColor={activeTab !== 'favorites' ? '#FDFDFD' : '#a6c94f'}
					/>
					<Pushbutton
						label="Активные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('active')}
						backgroundColor={activeTab !== 'active' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Завершенные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('completed')}
						backgroundColor={activeTab !== 'completed' ? '#FDFDFD' : '#a6c94f'}
					/>

					<Pushbutton
						label="Отмененные"
						color="black"
						size="mini"
						border="1px solid #A6C94F"
						onClick={() => setActiveTab('canceled')}
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

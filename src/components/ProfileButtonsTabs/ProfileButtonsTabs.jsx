import './ProfileButtonsTabs.scss';
import { useLocation } from 'react-router-dom';

import { Pushbutton } from '../Pushbutton/Pushbutton';

function ProfileButtonsTabs() {
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
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>
					<Pushbutton
						label="Активен"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>

					<Pushbutton
						label="Черновик"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>

					<Pushbutton
						label="На модерации"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>

					<Pushbutton
						label="Завершен"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>

					<Pushbutton
						label="В архиве"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>
				</>
			) : (
				<>
					<Pushbutton
						label="Избранные"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>
					<Pushbutton
						label="Активные"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>

					<Pushbutton
						label="Завершенные"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>

					<Pushbutton
						label="Отмененные"
						color="black"
						size="mini"
						backgroundColor="#FDFDFD"
						border="1px solid #A6C94F"
					/>
				</>
			)}
		</div>
	);
}

export default ProfileButtonsTabs;

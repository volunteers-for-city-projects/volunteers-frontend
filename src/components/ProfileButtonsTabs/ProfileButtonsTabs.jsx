import { Pushbutton } from '../Pushbutton/Pushbutton';

function ProfileButtonsTabs() {
	return (
		<>
			<Pushbutton
				label="Активен"
				color="black"
				size="mini"
				backgroundColor="#FDFDFD"
				minWidth="149px"
				border="1px solid #A6C94F"
			/>
			<Pushbutton
				label="Черновик"
				color="black"
				size="mini"
				backgroundColor="#FDFDFD"
				minWidth="149px"
				border="1px solid #A6C94F"
			/>
			<Pushbutton
				label="На модерации"
				color="black"
				size="mini"
				backgroundColor="#FDFDFD"
				minWidth="149px"
				border="1px solid #A6C94F"
			/>
			<Pushbutton
				label="Завершен"
				color="black"
				size="mini"
				backgroundColor="#FDFDFD"
				minWidth="149px"
				border="1px solid #A6C94F"
			/>
			<Pushbutton
				label="В архиве"
				color="black"
				size="mini"
				backgroundColor="#FDFDFD"
				minWidth="149px"
				border="1px solid #A6C94F"
			/>
		</>
	);
}

export default ProfileButtonsTabs;

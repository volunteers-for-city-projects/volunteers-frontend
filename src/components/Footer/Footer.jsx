import NavBar from '../NavBar/NavBar';
import Logo from '../Logo/Logo';
import Contacts from '../Contacts/Contacts';
import './Footer.scss';

const dataNavArray = [
	{
		id: 0,
		label: 'проекты',
		path: '/projects',
		isAnchor: false,
	},
	{
		id: 1,
		label: 'новости',
		path: '/news',
		isAnchor: false,
	},
	{
		id: 2,
		label: 'связаться с нами',
		path: 'request',
		isAnchor: true,
	},
];

function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container">
				<Logo />
				<NavBar dataNavArray={dataNavArray} />
				<Contacts type="footer" />
			</div>
		</footer>
	);
}

export default Footer;

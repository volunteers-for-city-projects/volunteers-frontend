import NavBar from '../NavBar/NavBar';
import Logo from '../Logo/Logo';
import Contacts from '../Contacts/Contacts';
import './Footer.scss';

const dataNavArray = [
	{
		id: 0,
		label: 'проекты',
		path: '/projects',
		anchor: '',
	},
	{
		id: 1,
		label: 'новости',
		path: '/',
		anchor: 'news',
	},
	{
		id: 2,
		label: 'связаться с нами',
		path: '/',
		anchor: 'request',
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

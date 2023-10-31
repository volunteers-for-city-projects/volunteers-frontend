import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
	getNews,
	getPlatformAbout,
	sendMessage,
} from '../../utils/api/main-page';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import News from '../News/News';
import JoinButtons from '../JoinButtons/JoinButtons';
import FormRequest from '../FormRequest/FormRequest';

function Main() {
	const [news, setNews] = useState([]);
	const [plarformAbout, setPlatformAbout] = useState({});
	const [plarformPromo, setPlatformPromo] = useState({});
	const { setPlatformEmail } = useOutletContext();
	const [popup, setPopup] = useState({
		isOpen: false,
		text: '',
		type: 'success',
	});

	useEffect(() => {
		Promise.all([getNews(), getPlatformAbout()])
			.then(([dataNews, dataPlatformAbout]) => {
				setNews(dataNews.results);
				const { about_us: aboutUs, valuations } = dataPlatformAbout;
				const { platform_email: email } = dataPlatformAbout;
				const {
					projects_count: projectCount,
					volunteers_count: volunteersCount,
					organizers_count: organizersCount,
				} = dataPlatformAbout;
				setPlatformAbout({ aboutUs, valuations });
				setPlatformEmail(email);
				setPlatformPromo({ projectCount, volunteersCount, organizersCount });
			})
			.catch((err) => console.error(err));
	}, [setPlatformEmail]);

	const closePopup = () => {
		setTimeout(() => {
			setPopup((prevPopup) => ({
				...prevPopup,
				isOpen: false,
			}));
		}, 3000);
	};

	const handleSendMessage = (values, { resetForm }) => {
		sendMessage(values)
			.then(() => {
				resetForm();
				setPopup({
					isOpen: true,
					text: 'Ваш запрос отправлен',
					type: 'success',
				});
				closePopup();
			})
			.catch((err) => {
				console.error(err);
				setPopup({
					isOpen: true,
					text: 'Ваш запрос не был отправлен попробуйте еще раз',
					type: 'error',
				});
				closePopup();
			});
	};

	return (
		<main className="content-main">
			<Promo plarformPromo={plarformPromo} />
			<AboutProject plarformAbout={plarformAbout} />
			{news.length > 0 && <News news={news} />}
			<JoinButtons />
			<FormRequest handleSendMessage={handleSendMessage} popup={popup} />
		</main>
	);
}

export default Main;

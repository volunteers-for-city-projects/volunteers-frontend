import './Preloader.scss';

function Preloader() {
	return (
		<div className="preloader">
			<div className="preloader__container">
				<span className="preloader__round"> </span>
			</div>
			<span className="preloader__text">Загрузка...</span>
		</div>
	);
}

export default Preloader;

import { useMatches } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import arrow from '../../images/icon-strelka.svg';
import './Crumbs.scss';

export const Crumbs = () => {
	const matches = useMatches();
	const crumbs = matches
		.filter((match) => Boolean(match.handle?.crumb))
		.map((match) => match.handle.crumb(match.data));

	return (
		<ul className="crumbs">
			{crumbs.map((crumb, index) => {
				const id = uuidv4();

				let lastElementArray = false;
				if (index + 1 === crumbs.length) {
					lastElementArray = true;
				}
				return (
					<li key={id} className="crumbs__item">
						<p className="crumbs__name">{crumb}</p>
						{!lastElementArray && (
							<img className="crumbs__separator" src={arrow} alt="стрелка" />
						)}
					</li>
				);
			})}
		</ul>
	);
};

import React from 'react';
import PropTypes from 'prop-types';
import './PageMenu.scss';

export default function PageMenu({ title, isProjectPage, projectTitle }) {
	return (
		<nav className="page-menu">
			<ul className="page-menu__list">
				<li className="page-menu__item">
					<p className="page-menu__text">Главная</p>
				</li>
				<li className="page-menu__item">
					<p className="page-menu__text">{title}</p>
				</li>
				{isProjectPage && (
					<li className="page-menu__item">
						<p className="page-menu__text">Проект «{projectTitle}»</p>
					</li>
				)}
			</ul>
		</nav>
	);
}

PageMenu.propTypes = {
	title: PropTypes.string.isRequired,
	isProjectPage: PropTypes.bool.isRequired,
	projectTitle: PropTypes.string.isRequired,
};

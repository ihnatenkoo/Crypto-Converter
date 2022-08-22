import { FC } from 'react';

import s from './Header.module.scss';

const Header: FC = () => {
	return (
		<header className={s.header}>
			<span className="material-icons-outlined">currency_bitcoin</span>
			<h2 className={s.header__title}>Сurrency Exchange</h2>
		</header>
	);
};

export default Header;

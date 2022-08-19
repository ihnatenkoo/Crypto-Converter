import { FC, ReactNode } from 'react';
import Container from '@mui/material/Container';
import s from './MainLayout.module.scss';

interface IMainLayout {
	children: ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }) => {
	return (
		<Container maxWidth="lg" className={s.layout}>
			{children}
		</Container>
	);
};

export default MainLayout;
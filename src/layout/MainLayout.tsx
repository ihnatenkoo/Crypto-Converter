import { FC, ReactNode } from 'react';

import Container from '@mui/material/Container';

import Header from '../components/Header/Header';

interface IMainLayout {
	children: ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }) => {
	return (
		<>
			<Header />
			<Container maxWidth="lg">{children}</Container>
		</>
	);
};

export default MainLayout;

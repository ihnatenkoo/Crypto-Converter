import { FC } from 'react';

import MainLayout from './layout/MainLayout';

import HomePage from './pages/HomePage/HomePage';

const App: FC = () => {
	return (
		<MainLayout>
			<HomePage />
		</MainLayout>
	);
};

export default App;

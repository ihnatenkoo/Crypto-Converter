import Grid from '@mui/material/Grid';

import Converter from '../../components/Converter/Converter';
import CurrencyTable from '../../components/CurrencyTable/CurrencyTable';

const HomePage = () => {
	return (
		<Grid container spacing={2} wrap="wrap-reverse">
			<Grid item xs={12} lg={8}>
				<CurrencyTable />
			</Grid>
			<Grid item xs={12} lg={4}>
				<Converter />
			</Grid>
		</Grid>
	);
};
export default HomePage;

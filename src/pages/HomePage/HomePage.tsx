import Grid from '@mui/material/Grid';

import Converter from '../../components/Converter/Converter';
import CurrencyTable from '../../components/CurrencyTable/CurrencyTable';

const HomePage = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={8}>
				<CurrencyTable />
			</Grid>
			<Grid item xs={12} sm={4}>
				<Converter />
			</Grid>
		</Grid>
	);
};
export default HomePage;

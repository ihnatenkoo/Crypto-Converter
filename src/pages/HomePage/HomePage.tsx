import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Converter from '../../components/Converter/Converter';

const HomePage = () => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6} sm={8}>
				<Paper elevation={2}>Currency table</Paper>
			</Grid>
			<Grid item xs={6} sm={4}>
				<Paper elevation={2}>
					<Converter />
				</Paper>
			</Grid>
		</Grid>
	);
};
export default HomePage;

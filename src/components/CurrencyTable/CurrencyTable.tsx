import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import currenciesStore from '../../stores/currenciesStore';
import converterStore from '../../stores/converterStore';

import s from './CurrencyTable.module.scss';

export interface ICoin {
	name: string;
	fullName: string;
	imageUrl: string;
	price: number;
	volume24Hour: number;
}

const CurrencyTable: FC = observer(() => {
	const allCoins = currenciesStore.getCoins;
	const setSelectedCoin = converterStore.setSelectedCoin;

	useEffect(() => {
		currenciesStore.fetchCoins();
	}, []);

	return (
		<TableContainer component={Paper} elevation={2}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Abbrev</TableCell>
						<TableCell align="left">Cost</TableCell>
						<TableCell align="left">24h</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{allCoins &&
						allCoins.map((coin) => (
							<TableRow
								key={coin.name}
								className={s.row}
								onClick={() => setSelectedCoin(coin.name)}
							>
								<TableCell component="th" scope="row">
									<img src={coin.imageUrl} alt="coin icon" className={s.img} />
								</TableCell>
								<TableCell>{coin.fullName}</TableCell>
								<TableCell>{coin.name}</TableCell>
								<TableCell>${coin.price}</TableCell>
								<TableCell>${coin.volume24Hour}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
});

export default CurrencyTable;

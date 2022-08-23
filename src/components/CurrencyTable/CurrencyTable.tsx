import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import currenciesStore from '../../stores/currenciesStore';

import s from './CurrencyTable.module.scss';

export interface ICoin {
	name: string;
	fullName: string;
	imageUrl: string;
	price: number;
	change24Hour: number;
}

const CurrencyTable: FC = observer(() => {
	const fetchCoins = currenciesStore.fetchCoins;
	const allCoins = currenciesStore.getCoins;
	const setSelectedCoin = currenciesStore.setSelectedCoin;
	const diffPrices = currenciesStore.getDiffPrices;

	const [activeRow, setActiveRow] = useState('');

	useEffect(() => {
		const fetchInterval = setInterval(() => fetchCoins(), 10000);
		return () => clearInterval(fetchInterval);
	}, []);

	useEffect(() => {
		setActiveRow(allCoins[0]?.name ?? '');
	}, [allCoins]);

	const handleRowClick = (name: string) => {
		setSelectedCoin(name);
		setActiveRow(name);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={2}>
			<TableContainer className={s.table}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead className={s.head}>
						<TableRow>
							<TableCell></TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Abbrev</TableCell>
							<TableCell align="left">Cost</TableCell>
							<TableCell align="left">LiveDiff</TableCell>
							<TableCell align="left">24HDiff</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{allCoins &&
							allCoins.map((coin) => (
								<TableRow
									key={coin.name}
									className={`${s.row} ${
										activeRow === coin.name ? s.active : ''
									}`}
									onClick={() => handleRowClick(coin.name)}
								>
									<TableCell component="th" scope="row">
										<img
											src={coin.imageUrl}
											alt="coin icon"
											className={s.img}
										/>
									</TableCell>
									<TableCell>{coin.fullName}</TableCell>
									<TableCell>{coin.name}</TableCell>
									<TableCell
										className={
											`${diffPrices[coin.name]?.color}` === 'green'
												? s.green
												: `${diffPrices[coin.name]?.color}` === 'red'
												? s.red
												: ''
										}
									>
										{coin.price}$
									</TableCell>
									<TableCell>
										{diffPrices[coin.name]?.diff.toFixed(2) ?? 0}
									</TableCell>
									<TableCell>
										<div className={s.stats}>
											<span>{coin.change24Hour}$</span>
											<span
												className={`${s.stats__icon} material-icons-outlined`}
											>
												{coin.change24Hour === 0
													? ''
													: coin.change24Hour > 0
													? 'north_east'
													: 'south_east'}
											</span>
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
});

export default CurrencyTable;

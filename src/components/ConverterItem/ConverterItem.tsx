import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import currenciesStore from '../../stores/currenciesStore';

import s from './ConverterItem.module.scss';

interface a {
	pickedCoin?: string;
}

const ConverterItem: FC<a> = observer(({ pickedCoin }) => {
	const [selectedCoin, setSelectedCoin] = useState('');
	const allCoins = currenciesStore.getCoins;

	useEffect(() => {
		if (pickedCoin) setSelectedCoin(pickedCoin);
	}, [pickedCoin]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedCoin(event.target.value);
	};

	return (
		<div className={s.converter__item}>
			<TextField id="outlined-basic" label="Value" variant="outlined" />

			<TextField
				id="outlined-select-currency"
				select
				label="Currency"
				value={selectedCoin}
				onChange={handleChange}
			>
				{allCoins.map((coin) => (
					<MenuItem value={coin.name} key={coin.fullName}>
						<img
							src={coin.imageUrl}
							alt="coin icon"
							className={s.converter__img}
						/>
						{coin.name}
					</MenuItem>
				))}
			</TextField>
		</div>
	);
});

export default ConverterItem;

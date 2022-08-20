import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import currenciesStore from '../../stores/currenciesStore';

import s from './ConverterItem.module.scss';

interface IConverterItem {
	currency: string;
	value: number;
	onChangeCurrency: Dispatch<SetStateAction<string>>;
	onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ConverterItem: FC<IConverterItem> = observer(
	({ currency, onChangeCurrency, value, onChangeValue }) => {
		const allCoins = currenciesStore.getCoins;

		const changeCurrencyHandler = (e: ChangeEvent<HTMLInputElement>) => {
			onChangeCurrency(e.target.value);
		};

		return (
			<div className={s.converter__item}>
				<TextField
					id="outlined-basic"
					label="Value"
					variant="outlined"
					value={value}
					onChange={onChangeValue}
				/>

				<TextField
					id="outlined-select-currency"
					select
					label="Currency"
					value={currency}
					onChange={changeCurrencyHandler}
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
	}
);

export default ConverterItem;

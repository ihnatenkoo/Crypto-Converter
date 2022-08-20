import { ChangeEvent, FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import currenciesStore from '../../stores/currenciesStore';

import ConverterItem from '../ConverterItem/ConverterItem';

import s from './Converter.module.scss';

const Converter: FC = observer(() => {
	const allCoins = currenciesStore.getCoins;

	const [fromCurrency, setFromCurrency] = useState<string>('');
	const [toCurrency, setToCurrency] = useState<string>('');
	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [amount, setAmount] = useState<number>(1);
	const [amountInFromCurrency, setAmountInFromCurrency] =
		useState<boolean>(true);

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = +(amount * exchangeRate).toFixed(10);
	} else {
		fromAmount = +(amount / exchangeRate).toFixed(10);
		toAmount = amount;
	}

	const handleFromAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(+e.target.value);
		setAmountInFromCurrency(true);
	};

	const handleToAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(+e.target.value);
		setAmountInFromCurrency(false);
	};

	const getExchangeRate = () => {
		const priceFrom = allCoins.find(
			(coin) => coin.name === fromCurrency
		)?.price;
		const priceTo = allCoins.find((coin) => coin.name === toCurrency)?.price;

		if (priceFrom && priceTo) setExchangeRate(priceFrom / priceTo);
	};

	useEffect(() => {
		getExchangeRate();
	}, [fromCurrency, toCurrency]);

	return (
		<Paper elevation={2}>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				className={s.converter}
			>
				<ConverterItem
					currency={fromCurrency}
					onChangeCurrency={setFromCurrency}
					value={fromAmount}
					onChangeValue={handleFromAmountChange}
				/>
				<ConverterItem
					currency={toCurrency}
					onChangeCurrency={setToCurrency}
					value={toAmount}
					onChangeValue={handleToAmountChange}
				/>
				<Typography variant="h6">Total:</Typography>
			</Box>
		</Paper>
	);
});

export default Converter;

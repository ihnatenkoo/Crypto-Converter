import { MouseEvent, ChangeEvent, FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import currenciesStore from '../../stores/currenciesStore';

import ConverterItem from '../ConverterItem/ConverterItem';

import s from './Converter.module.scss';

const Converter: FC = observer(() => {
	const allCoins = currenciesStore.getCoins;
	const selectedCoin = currenciesStore.getSelectedCoin;
	const setSelectedCoin = currenciesStore.setSelectedCoin;

	const initialFrom = allCoins[0]?.name ?? '';
	const initialTo = allCoins[1]?.name ?? '';

	const [fromCurrency, setFromCurrency] = useState<string>('');
	const [toCurrency, setToCurrency] = useState<string>('');
	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [amount, setAmount] = useState<number>(1);
	const [amountInFromCurrency, setAmountInFromCurrency] =
		useState<boolean>(true);

	useEffect(() => {
		setFromCurrency(selectedCoin || initialFrom);
		setToCurrency(toCurrency || initialTo);
	}, [initialFrom, initialTo, selectedCoin]);

	useEffect(() => {
		getExchangeRate();
	}, [fromCurrency, toCurrency]);

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = +(amount * exchangeRate).toFixed(7);
	} else {
		fromAmount = +(amount / exchangeRate).toFixed(7);
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

	const onChangeCurrencyTop = (coinName: string) => {
		setFromCurrency(coinName);
		setSelectedCoin(coinName);
	};

	const handleSwitchCurrency = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
		setSelectedCoin(toCurrency);
	};

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
					onChangeCurrency={onChangeCurrencyTop}
					value={fromAmount}
					onChangeValue={handleFromAmountChange}
				/>
				<ConverterItem
					currency={toCurrency}
					onChangeCurrency={setToCurrency}
					value={toAmount}
					onChangeValue={handleToAmountChange}
				/>
				<button className={s.converter__icon} onClick={handleSwitchCurrency}>
					<span className="material-icons-outlined">currency_exchange</span>
				</button>
			</Box>
			<Typography variant="overline" className={s.converter__rate}>
				1 {fromCurrency} = {exchangeRate} {toCurrency}
			</Typography>
		</Paper>
	);
});

export default Converter;

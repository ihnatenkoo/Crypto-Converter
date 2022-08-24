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

	const initialFromCurrency = allCoins[0]?.name ?? '';
	const initialToCurrency = allCoins[1]?.name ?? '';

	const [amount, setAmount] = useState<number | string>('1');

	const [fromAmount, setFromAmount] = useState<number | string>(1);
	const [toAmount, setToAmount] = useState<number | string>(1);

	const [fromCurrency, setFromCurrency] = useState<string>('');
	const [toCurrency, setToCurrency] = useState<string>('');

	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [amountInFromCurrency, setAmountInFromCurrency] =
		useState<boolean>(true);

	useEffect(() => {
		setFromCurrency(selectedCoin || initialFromCurrency);
		setToCurrency(toCurrency || initialToCurrency);
	}, [initialFromCurrency, initialToCurrency, selectedCoin, toCurrency]);

	useEffect(() => {
		getExchangeRate();
	}, [fromCurrency, toCurrency]);

	useEffect(() => {
		if (!isNaN(amount as number)) {
			if (amountInFromCurrency) {
				setFromAmount(amount);
				setToAmount(((amount as number) * exchangeRate).toFixed(7));
			} else {
				setFromAmount(((amount as number) / exchangeRate).toFixed(7));
				setToAmount(amount);
			}
		}
	}, [amount, exchangeRate, amountInFromCurrency]);

	const onChangeFromAmount = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};

	const onChangeToAmount = (e: ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value);
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
					onChangeValue={onChangeFromAmount}
				/>
				<ConverterItem
					currency={toCurrency}
					onChangeCurrency={setToCurrency}
					value={toAmount}
					onChangeValue={onChangeToAmount}
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

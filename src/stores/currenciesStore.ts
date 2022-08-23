import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { ICoin } from '../components/CurrencyTable/CurrencyTable';
import { transformCoinsData } from '../utils/transformCoinsData';

const initialMockCoins = [
	{
		name: 'BTC',
		fullName: 'Bitcoin',
		imageUrl: 'https://cryptocompare.com/media/37746251/btc.png',
		price: 21015.43,
		change24Hour: -500.07,
	},
	{
		name: 'ETH',
		fullName: 'Ethereum',
		imageUrl: 'https://cryptocompare.com/media/37746238/eth.png',
		price: 1558.38,
		change24Hour: -65.83,
	},
	{
		name: 'USDT',
		fullName: 'Tether',
		imageUrl: 'https://cryptocompare.com/media/37746338/usdt.png',
		price: 0.9998,
		change24Hour: -0.0002,
	},
	{
		name: 'BUSD',
		fullName: 'BUSD',
		imageUrl: 'https://cryptocompare.com/media/37746248/busd.png',
		price: 1,
		change24Hour: 0,
	},
	{
		name: 'BNB',
		fullName: 'Binance Coin',
		imageUrl: 'https://cryptocompare.com/media/40485170/bnb.png',
		price: 294.22,
		change24Hour: -4.94,
	},
	{
		name: 'SOL',
		fullName: 'Solana',
		imageUrl: 'https://cryptocompare.com/media/37747734/sol.png',
		price: 34.26,
		change24Hour: -2.08,
	},
	{
		name: 'EOS',
		fullName: 'EOS',
		imageUrl: 'https://cryptocompare.com/media/40485146/eos.png',
		price: 1.712,
		change24Hour: 0.181,
	},
	{
		name: 'XRP',
		fullName: 'XRP',
		imageUrl: 'https://cryptocompare.com/media/38553096/xrp.png',
		price: 0.3339,
		change24Hour: -0.0101,
	},
	{
		name: 'ADA',
		fullName: 'Cardano',
		imageUrl: 'https://cryptocompare.com/media/37746235/ada.png',
		price: 0.4481,
		change24Hour: -0.0184,
	},
	{
		name: 'CHZ',
		fullName: 'Chiliz',
		imageUrl: 'https://cryptocompare.com/media/37747540/chz.png',
		price: 0.1997,
		change24Hour: 0.0132,
	},
];

interface IDiffPrices {
	[key: string]: string;
}
class CurrenciesStore {
	private coins: Array<ICoin> = initialMockCoins;
	private selectedCoin = '';
	private diffPrices: IDiffPrices = {};

	constructor() {
		makeAutoObservable(this);
	}

	get getCoins() {
		return this.coins;
	}

	get getSelectedCoin() {
		return this.selectedCoin;
	}

	get getDiffPrices() {
		return this.diffPrices;
	}

	setSelectedCoin = (name: string): void => {
		this.selectedCoin = name;
	};

	fetchCoins = async () => {
		try {
			const response = await axios.get(
				'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
			);

			const coins = transformCoinsData(response.data.Data);
			this.setCoins(coins);
		} catch (error) {
			console.error(error);
		}
	};

	setCoins = (newCoins: Array<ICoin>): void => {
		this.diffPrices = this.diffCurrencies(this.coins, newCoins).reduce(
			(accumulator: IDiffPrices, currentCoin: ICoin): IDiffPrices => {
				const actualCoinObj = newCoins.find(
					(coin) => coin.name === currentCoin.name
				) ?? { name: '', price: 0 };

				const oldCoinObj = this.coins.find(
					(coin) => coin.name === actualCoinObj.name
				) ?? { name: '', price: 0 };

				const color: string =
					actualCoinObj.price > oldCoinObj.price ? 'green' : 'red';

				accumulator[actualCoinObj.name] = color;

				return accumulator;
			},
			{}
		);

		this.coins = newCoins;
	};

	diffCurrencies(arr1: Array<ICoin>, arr2: Array<ICoin>) {
		return arr1.filter((coin, index) => {
			if (coin.price !== arr2[index].price) {
				return true;
			}
			return false;
		});
	}
}

export default new CurrenciesStore();

import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { ICoin } from '../components/CurrencyTable/CurrencyTable';
import { transformCoinsData } from '../utils/transformCoinsData';

class CurrenciesStore {
	private coins: Array<ICoin> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get getCoins() {
		return this.coins;
	}

	setCoins = (items: Array<ICoin>): void => {
		this.coins = items;
	};

	fetchCoins = async () => {
		try {
			const response = await axios.get(
				'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
			);

			const data = transformCoinsData(response.data.Data);

			this.setCoins(data);
		} catch (error) {
			console.error(error);
		}
	};
}

export default new CurrenciesStore();

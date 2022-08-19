import { makeAutoObservable } from 'mobx';

class ConverterStore {
	private selectedCoin = '';

	constructor() {
		makeAutoObservable(this);
	}

	get getSelectedCoin() {
		return this.selectedCoin;
	}

	setSelectedCoin = (name: string): void => {
		this.selectedCoin = name;
	};
}

export default new ConverterStore();

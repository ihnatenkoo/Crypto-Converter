import { ICoin } from '../components/CurrencyTable/CurrencyTable';

export const transformCoinsData = (data: Array<any>): Array<ICoin> => {
	return data.map((coin: any) => ({
		name: coin.CoinInfo.Name,
		fullName: coin.CoinInfo.FullName,
		imageUrl: `https://cryptocompare.com${coin.CoinInfo.ImageUrl}`,
		price: +coin.RAW.USD.PRICE.toFixed(4),
		volume24Hour: +coin.RAW.USD.VOLUME24HOUR.toFixed(2),
	}));
};

import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import s from './ConverterItem.module.scss';

const ConverterItem: FC = () => {
	const [currency, setCurrency] = useState<string>('USD');
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrency(event.target.value);
	};

	return (
		<div className={s.converter_item}>
			<TextField id="outlined-basic" label="Value" variant="outlined" />
			<TextField
				id="outlined-select-currency"
				select
				label="Currency"
				value={currency}
				onChange={handleChange}
			>
				<MenuItem value="USD">USD</MenuItem>
				<MenuItem value="UA">UA</MenuItem>
				<MenuItem value="GB">GB</MenuItem>
			</TextField>
		</div>
	);
};
export default ConverterItem;

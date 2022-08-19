import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConverterItem from '../ConverterItem/ConverterItem';
import converterStore from '../../stores/converterStore';

import s from './Converter.module.scss';

const Converter: FC = observer(() => {
	const pickedCoin = converterStore.getSelectedCoin;

	return (
		<Paper elevation={2}>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				className={s.converter}
			>
				<ConverterItem pickedCoin={pickedCoin} />
				<ConverterItem />
				<Typography variant="h6">Total:</Typography>
			</Box>
		</Paper>
	);
});
export default Converter;

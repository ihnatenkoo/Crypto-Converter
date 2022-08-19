import { FC } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConverterItem from '../ConverterItem/ConverterItem';

import s from './Converter.module.scss';

const Converter: FC = () => {
	return (
		<Paper elevation={2}>
			<Box
				component="form"
				noValidate
				autoComplete="off"
				className={s.converter}
			>
				<ConverterItem />
				<ConverterItem />
				<Typography variant="h6">Total:</Typography>
			</Box>
		</Paper>
	);
};
export default Converter;

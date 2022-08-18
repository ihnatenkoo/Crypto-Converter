import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConverterItem from '../ConverterItem/ConverterItem';

import s from './Converter.module.scss';

const Converter: FC = () => {
	return (
		<Box component="form" noValidate autoComplete="off" className={s.converter}>
			<ConverterItem />
			<ConverterItem />
			<Typography variant="h6">Total:</Typography>
		</Box>
	);
};
export default Converter;

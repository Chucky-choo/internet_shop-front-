import { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { color } from '@mui/system';

interface IPriceBoxProps {
  price: number;
  salePrice: number;
}

export const PriceBox: NextPage<IPriceBoxProps> = ({ salePrice, price }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        p: 1,
      }}
    >
      {salePrice && <h2 style={{ color: 'red' }}>{salePrice} грн.&ensp;</h2>}
      <h3>{salePrice ? <del>{price} грн.</del> : `${price} грн.`}</h3>
    </Box>
  );
};

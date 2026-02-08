import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Button } from '@mui/material';
import * as React from 'react';
import { FC } from 'react';

interface IPicturesProps {
  title?: string;
}

export const EmptyCart: FC<IPicturesProps> = ({ title = 'Корзина поки що пуста 😿' }) => {
  return (
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{ marginTop: 1, color: 'gray' }}
      >
        {title}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 25 }}>
        <Link href={'/'}>
          <a>
            <Button color="secondary" variant="contained">
              повернутись на головну
            </Button>
          </a>
        </Link>
      </div>
    </>
  );
};

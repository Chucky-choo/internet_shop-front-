import { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import classes from './ProductsList.module.scss';
import Link from 'next/link';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PriceBox } from '../PriceBox/PriceBox';

export const ProductsList: FC = () => {
  const data = useAppSelector(store => store.product.data);

  if(!data) return null
  
  return (
    <div className={classes.container}>
      {data.map(product => {
        const { id, cover, size, name, salePrice, price } = product;
        return (
          <Link key={id} href={'/product/' + id}>
            <a>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component='img'
                    height='140'
                    image={cover}
                    alt={name}
                  />
                </CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h6' component='div'>
                    {name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    size: {size}
                  </Typography>
                  <PriceBox price={price} salePrice={salePrice} />
                </CardContent>
              </Card>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

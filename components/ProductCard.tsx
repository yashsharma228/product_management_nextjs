'use client';
import { memo } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
                sx={{ objectFit: 'contain', p: 1 }}
                loading="lazy"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${product.price}
                </Typography>
                <Typography variant="caption" display="block">
                    Rating: {product.rating}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} href={`/products/${product.id}`}>View Details</Button>
            </CardActions>
        </Card>
    </Grid>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

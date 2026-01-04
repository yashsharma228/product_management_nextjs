'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { Product } from '@/types';
import { Container, Paper, Typography, Box, Button, Grid, Chip, Rating, IconButton, CircularProgress } from '@mui/material';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getProduct } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
        getProduct(Number(id)).then((data) => {
            setProduct(data);
            setLoading(false);
        });
    }
  }, [id, getProduct]);

  if (loading) return (
    <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
    </Container>
  );

  if (!product) return <Container sx={{mt:4}}>Product not found</Container>;

  const handleNextImage = () => {
      setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
      setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button component={Link} href="/products" sx={{ mb: 2 }}>Back to Products</Button>
        <Paper sx={{ p: 4 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', borderRadius: 2 }}>
                         {product.images.length > 1 && (
                            <IconButton onClick={handlePrevImage} sx={{ position: 'absolute', left: 10, zIndex: 1 }}>
                                <ArrowBackIosIcon />
                            </IconButton>
                        )}
                        <Box component="img" src={product.images[activeImage]} alt={product.title} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        {product.images.length > 1 && (
                            <IconButton onClick={handleNextImage} sx={{ position: 'absolute', right: 10, zIndex: 1 }}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto', pb: 1 }}>
                        {product.images.map((img, index) => (
                            <Box 
                                key={index} 
                                component="img" 
                                src={img} 
                                sx={{ 
                                    width: 60, height: 60, objectFit: 'cover', cursor: 'pointer', 
                                    border: index === activeImage ? '2px solid #1976d2' : '1px solid #ddd',
                                    borderRadius: 1,
                                    flexShrink: 0
                                }}
                                onClick={() => setActiveImage(index)}
                            />
                        ))}
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" gutterBottom>{product.title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={product.rating} readOnly precision={0.1} />
                        <Typography variant="body2" sx={{ ml: 1 }}>({product.rating})</Typography>
                    </Box>
                    <Typography variant="h5" color="primary" gutterBottom>${product.price}</Typography>
                    <Typography variant="body1" paragraph>{product.description}</Typography>
                    
                    <Box sx={{ mb: 2 }}>
                        <Chip label={product.category} color="primary" variant="outlined" />
                        <Chip label={product.brand} variant="outlined" sx={{ ml: 1 }} />
                    </Box>
                    
                    <Typography variant="subtitle1" gutterBottom>Specs:</Typography>
                    <Typography variant="body2">Stock: {product.stock}</Typography>
                    <Typography variant="body2">Discount: {product.discountPercentage}%</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Container>
  );
}

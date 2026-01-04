'use client';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { 
  Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, 
  TablePagination, TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress 
} from '@mui/material';
import Link from 'next/link';

import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const { 
    products, total, loading, categories, 
    fetchProducts, searchProducts, fetchProductsByCategory, fetchCategories 
  } = useProductStore();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
        if (search) {
            searchProducts(search);
        } else if (category) {
            fetchProductsByCategory(category);
        } else {
            fetchProducts(rowsPerPage, page * rowsPerPage);
        }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, category, page, rowsPerPage, fetchProducts, searchProducts, fetchProductsByCategory]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setCategory('');
      setPage(0);
  };

  const handleCategoryChange = (e: any) => {
      setCategory(e.target.value);
      setSearch('');
      setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Products</Typography>
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField 
                label="Search Products" 
                variant="outlined" 
                fullWidth 
                value={search}
                onChange={handleSearchChange}
            />
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat.slug} value={cat.slug}>{cat.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
        
        {loading && products.length === 0 ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        ) : (
            <>
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Grid>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        )}
    </Container>
  );
}

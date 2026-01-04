'use client';
import { Container, Typography, Paper, Button, Stack } from '@mui/material';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Paper sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Manage Users
          </Typography>
          <Button variant="contained" component={Link} href="/users">
            Go to Users
          </Button>
        </Paper>
        <Paper sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Manage Products
          </Typography>
          <Button variant="contained" component={Link} href="/products">
            Go to Products
          </Button>
        </Paper>
      </Stack>
    </Container>
  );
}

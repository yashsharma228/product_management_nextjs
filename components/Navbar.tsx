'use client';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Assessment App
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} href="/">Dashboard</Button>
          <Button color="inherit" component={Link} href="/users">Users</Button>
          <Button color="inherit" component={Link} href="/products">Products</Button>
          <Button color="inherit" onClick={() => { signOut({ callbackUrl: '/login', redirect: false }); router.push('/login'); }}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

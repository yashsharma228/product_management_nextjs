'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types';
import { Container, Paper, Typography, Box, Button, Avatar, Grid, Divider, CircularProgress } from '@mui/material';
import Link from 'next/link';

export default function UserDetailPage() {
  const { id } = useParams();
  const { getUser } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        getUser(Number(id)).then((data) => {
            setUser(data);
            setLoading(false);
        });
    }
  }, [id, getUser]);

  if (loading) return (
    <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
    </Container>
  );

  if (!user) return <Container sx={{mt:4}}>User not found</Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button component={Link} href="/users" sx={{ mb: 2 }}>
        Back to Users
      </Button>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={user.image} alt={user.firstName} sx={{ width: 100, height: 100, mr: 3 }} />
          <Box>
            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{user.company.title} at {user.company.name}</Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1"><strong>Gender:</strong> {user.gender}</Typography>
            </Grid>
             <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1"><strong>Department:</strong> {user.company.department}</Typography>
            </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

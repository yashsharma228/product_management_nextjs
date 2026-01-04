'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { 
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  TablePagination, TextField, Box, Typography, Button, CircularProgress 
} from '@mui/material';
import Link from 'next/link';
import UserRow from '@/components/UserRow';

export default function UsersPage() {
  const { users, total, loading, fetchUsers, searchUsers } = useUserStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
        if (search) {
            searchUsers(search);
        } else {
            fetchUsers(rowsPerPage, page * rowsPerPage);
        }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, page, rowsPerPage, fetchUsers, searchUsers]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(0); // Reset to first page on search
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Users</Typography>
        <Box sx={{ mb: 3 }}>
            <TextField 
                label="Search Users" 
                variant="outlined" 
                fullWidth 
                value={search}
                onChange={handleSearchChange}
            />
        </Box>
        
        {loading && users.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        ) : (
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <UserRow key={user.id} user={user} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        )}
    </Container>
  );
}

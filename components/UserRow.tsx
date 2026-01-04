'use client';
import { memo } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import Link from 'next/link';
import { User } from '@/types';

interface UserRowProps {
  user: User;
}

const UserRow = memo(({ user }: UserRowProps) => {
  return (
    <TableRow>
        <TableCell>{user.firstName} {user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.gender}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.company.name}</TableCell>
        <TableCell>
            <Button component={Link} href={`/users/${user.id}`}>
                View
            </Button>
        </TableCell>
    </TableRow>
  );
});

UserRow.displayName = 'UserRow';

export default UserRow;

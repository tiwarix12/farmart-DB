import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react';

interface User {
  id: number;
  name: string;
  short_url: string;
  size: string;
}

interface UsersTableProps {
  users: User[];
  onDeleteUser: (id: number,url: string) => void;
}

export default function UsersTable({ users, onDeleteUser }: UsersTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Short_URL</TableHeaderCell>
          <TableHeaderCell>Size</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.short_url}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.size} kb</Text>
            </TableCell>
            <TableCell>
            <button onClick={() => onDeleteUser(user.id, user.short_url)}>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


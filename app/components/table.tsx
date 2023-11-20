'use client';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react';
import toast from 'react-hot-toast';


interface User {
  id: number;
  name: string;
  short_url: string;
  size: string;
  upload_time: Date;
}

interface UsersTableProps {
  users: User[];
}
const handleDelete = async (id: number, short_url: string) => {
  try {
    const response = await fetch(`/api/delete?id=${id}&short_url=${short_url}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Image deleted successfully');
      toast.success('Image deleted successfully');
    } else {
      throw new Error('Failed to delete Image');
    }
  } catch (error) {
    console.error('Error deleting Image:', error);
    toast.error('Error deleting Image');
  }
};

export default function UsersTable({ users}: UsersTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Short_URL</TableHeaderCell>
          <TableHeaderCell>Size</TableHeaderCell>
          <TableHeaderCell>Upload Time</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
            <a href={user.short_url}>{user.short_url}</a>
            </TableCell>
            <TableCell>
              <Text>{parseInt(user.size)/1024} kb</Text>
            </TableCell>
            <TableCell>
              <Text>{user.upload_time.toLocaleString()}</Text>
            </TableCell>
            <TableCell>
            <button className="red-text" onClick={()=>handleDelete(user.id, user.short_url)}>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


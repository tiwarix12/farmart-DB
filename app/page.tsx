'use client';
import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { Toaster } from './components/toaster'

interface User {
  id: number;
  name: string;
  short_url: string;
  size: string;
}
const handleDeleteUser = async (userId: number, url:string) => {
  try {
    // Make an HTTP DELETE request to the delete API endpoint
    const response = await fetch(`/api/deleteFile?url=${url}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Handle successful deletion, e.g., update the user interface
      // You can also remove the user from the local state
    } else {
      console.error('Error deleting file:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('An error occurred while deleting the file:', error);
  }
};

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  let users = [];

  if (search) {
    const searchresult = await sql`
      SELECT id, name, short_url, size 
      FROM uploaded_files 
      WHERE name ILIKE ${'%' + search + '%'};
    `;
    users = searchresult.rows as User[];
  } else {
    const result = await sql`
      SELECT id, name, short_url, size 
      FROM uploaded_files;
    `;
    users = result.rows as User[];
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Toaster />
      
      <Title>Uploaded Files</Title>
      <Text>A list of short link for files retrieved from a Postgrxes database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} onDeleteUser={handleDeleteUser}/>
      </Card>
    </main>
  );
}

"use client"
import { useEffect, useState } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from '../components/search';
import UsersTable from '../components/table';
import { Toaster } from '../components/toaster';
import toast from 'react-hot-toast';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

interface User {
  id: number;
  name: string;
  short_url: string;
  size: string;
  upload_time: Date;
}
export default function UploadedFiles({ searchParams }: { searchParams: { q: string } }) {


  const router = useRouter();
  useEffect(() => {
    const checkAuthentication = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      const session = await getSession();
      if (!session) {
        console.error('Not authenticated');
        router.push('/login');
      }
    };
        checkAuthentication();
     
  }, []);

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await fetch(`/api/search?q=${searchParams.q}`, { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to fetch files');
          }
          const data = await response.json();
          const usersData = data.result.rows;
          setUsers(usersData);
          setLoading(false);
        } catch (error) {
          toast.error('Error fetching files');
          console.error('Error fetching files:', error);
          setLoading(false);
        }
      }
      fetchUsers();
    }, [searchParams.q]);
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div>
          <Toaster />
          {loading ? ( 
            <Loading /> 
          ) : (
            <div>
            <Title>Uploaded Files</Title>
            <Text>A list of short links for files retrieved from a Postgres database.</Text>
            <Search/>
            <Card className="mt-6">
              <UsersTable users={users}/>
            </Card>
            </div>
            
          )}
          </div>
        </main>
      );

}
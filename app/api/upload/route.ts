import { sql } from '@vercel/postgres';
import { PutBlobResult, del, put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'
import { NextApiRequest } from 'next';


export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) 
export async function POST(req: Request): Promise<NextResponse> {
  console.log(req.body,'hey')
    const file = req.body || '0';
    const contentType = req.headers.get('content-type') || 'text/plain';
    const nameOfFileUploaded = req.headers.get('name') || 'default'; 
    const filename = `${nameOfFileUploaded}-${nanoid()}.${contentType.split('/')[1]}`;
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    const blob = await put(filename, file, {
      contentType,
      access: 'public',
    });
    console.log(blob)
    const { name, size} = await saveFileInfoToDatabase(filename, contentLength, blob);
    
    return NextResponse.json(blob);
  } 



async function saveFileInfoToDatabase(name: string, size: any, blobresult: PutBlobResult) {
    const short_url = `${blobresult.url}`; 

    const query = `
      INSERT INTO uploaded_files (name, short_url, size)
      VALUES ($1, $2, $3)
      RETURNING name, short_url, size;
    `;
    console.log('query',query,name,size,blobresult.url)

    const result = await sql.query(query, [name, short_url, size]);
    if (result.rows[0]) {
      const { name, short_url, size } = result.rows[0];
      return { name, short_url, size };
    } else {
      throw new Error('Error saving file information to the database');
    }
  
}
    export async function DELETE(request: Request) {
      const { searchParams } = new URL(request.url);
      const urlToDelete = searchParams.get('url') as string;

      try {
        // Delete the file from Vercel Blob storage
        await del(urlToDelete);
        
        // Return a success response
        return new Response('File deleted successfully', {
          status: 200,
          headers: { 'Content-Type': 'text/plain' },
        });
      } catch (error) {
        // Handle any errors that occur during deletion
        return new Response('File deletion failed', {
          status: 500,
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    }
// export default async (req: NextApiRequest, res: NextResponse) => {
//   if (req.method === 'DELETE') {
//     const fileId = req.query.id as string; // Extract the file ID from the URL
//     try {
//       // Step 1: Get the file information from the database
//       const query = 'SELECT short_url FROM uploaded_files WHERE id = $1';
//       const result = await sql.query(query, [fileId]);
//       if (result.rows[0]) {
//         const { short_url } = result.rows[0];

//         // Step 2: Delete the file from storage
//         await del(short_url);

//         // Step 3: Delete the file record from the database
//         const deleteQuery = 'DELETE FROM uploaded_files WHERE id = $1';
//         await sql.query(deleteQuery, [fileId]);

//         res.status(200).json({ message: 'File deleted successfully' });
//       } else {
//         res.status(404).json({ message: 'File not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// };
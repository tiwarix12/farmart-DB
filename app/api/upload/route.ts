import { sql } from '@vercel/postgres';
import { PutBlobResult, put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'


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
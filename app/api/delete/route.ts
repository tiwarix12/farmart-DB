import {sql} from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import {del} from '@vercel/blob'

const runtime = 'edge'

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const short_url  = searchParams.get('short_url');
    const id=searchParams.get('id');
    const idString = Array.isArray(id) ? id[0] : id || '';
    const urlToDel = Array.isArray(short_url) ? short_url[0] : short_url || '';

    try {
        await del(urlToDel);
        const result = await sql`
          DELETE FROM uploaded_files
          WHERE id = ${idString};
        `;
        return NextResponse.json({result},{status: 200});
      } catch (error) {
        return NextResponse.json({ error: 'Failed to delete the file from Vercel Blob' },{status: 500});
      }
    }

export async function DELETE_AUTOMATICALLY(req: NextApiRequest, res: NextApiResponse) {
    setTimeout(async () => {

      const result = await sql`
        DELETE FROM uploaded_files
        WHERE upload_time < NOW() - INTERVAL '1 hour';
      `;
     return NextResponse.json({result},{status: 200}); 
    }, 3600000); 
  }
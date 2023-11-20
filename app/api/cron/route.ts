
import {sql} from '@vercel/postgres';
import { NextResponse } from 'next/server';
import {del} from '@vercel/blob'

export async function DELETE(req: Request) {

      try{
        const result = await sql`SELECT short_url FROM uploaded_files`;
        const files= result.rows;
        for (const file of files) {
          await del(file.short_url);
          await sql`
          DELETE FROM uploaded_files
          WHERE upload_time < NOW() - INTERVAL '1 hour';
        `;
        return NextResponse.json({ message: 'All files deleted' }, { status: 200 });
        }
      } catch (error) {
        return NextResponse.json({ error: 'Failed to delete the files' }, { status: 500 });
      }
  }

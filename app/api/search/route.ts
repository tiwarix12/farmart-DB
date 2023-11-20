import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export  async function GET(req:Request){
  const {searchParams} = new URL(req.url)
  const search = searchParams.get('q')

  const searchString= Array.isArray(search) ? search[0] : search || '';
  console.log('search',search,'SString',searchString, typeof searchString)
  if(searchString== null || searchString=='undefined'){ 
    const result= await sql `SELECT id, name, short_url, size, upload_time
    FROM uploaded_files`;
    return NextResponse.json({result},{status:200})
  }
  else {
  const result= await sql `SELECT id, name, short_url, size, upload_time
  FROM uploaded_files
  WHERE name ILIKE ${'%' + searchString + '%'};`;
  return NextResponse.json({result},{status:200})}
}

import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existsQuery = `
    SELECT * FROM "user" WHERE email = $1
  `;
  const existsParams = [email];
  const existsResult = await sql.query(existsQuery, existsParams);
  const exists = existsResult.rows[0];

  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {

    const createUserQuery = `
      INSERT INTO "user" (email, password) VALUES ($1, $2)
      RETURNING *
    `;
    const createUserParams = [email, await hash(password, 10)];
    const createUserResult = await sql.query(createUserQuery, createUserParams);
    const user = createUserResult.rows[0];

    console.log('users', user, 'nextresponse', NextResponse.json(user))
    return NextResponse.json(user);
  }

}


// export async function POST(req: Request) {
//   const { email, password } = await req.json();
//   const exists = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });
//   if (exists) {
//     return NextResponse.json({ error: "User already exists" }, { status: 400 });
//   } else {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: await hash(password, 10),
//       },
//     });
//   console.log('usersssssssssss',user, 'nextresponse',NextResponse.json(user))
//     return NextResponse.json(user);
//   }
// }


// Create a pool instance to establish a database connection

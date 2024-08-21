import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileHash = searchParams.get("fileHash");
  try {
    const result =
      await sql`SELECT * FROM Danmaku WHERE danmaku.file_hash = ${fileHash} ORDER BY offset_time ASC;`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

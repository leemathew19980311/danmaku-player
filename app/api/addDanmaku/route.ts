import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { file_hash, content, offset_time, file_metadata } = body;

  try {
    await sql`
    INSERT INTO Danmaku (file_hash, content, offset_time, file_metadata)
    VALUES (${file_hash}, ${content}, ${offset_time}, ${file_metadata})
  `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

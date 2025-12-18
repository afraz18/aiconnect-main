import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ meetings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

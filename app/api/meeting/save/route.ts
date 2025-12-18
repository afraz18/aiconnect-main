import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, date, startTime, endTime, durationMins } = body;

    const meeting = await prisma.meeting.create({
      data: {
        title,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        durationMins,
      },
    });

    return NextResponse.json({ success: true, meeting });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

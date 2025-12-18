import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  await prisma.meeting.createMany({
    data: [
      {
        title: "Daily Standup Meeting",
        date: new Date("2025-11-20"),
        startTime: new Date("2025-11-20T10:00:00"),
        endTime: new Date("2025-11-20T10:20:00"),
        durationMins: 20,
      },
      {
        title: "Project Update Call",
        date: new Date("2025-11-19"),
        startTime: new Date("2025-11-19T16:00:00"),
        endTime: new Date("2025-11-19T17:00:00"),
        durationMins: 60,
      },
    ],
  });

  return NextResponse.json({ ok: true });
}

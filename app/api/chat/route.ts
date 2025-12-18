import { NextResponse } from "next/server";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

let messages: Message[] = []; // in-memory storage

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  const filteredMessages = conversationId
    ? messages.filter((m) => m.conversationId === conversationId)
    : messages;

  return NextResponse.json(filteredMessages);
}

export async function POST(req: Request) {
  const body = await req.json();
  messages.push(body);
  return NextResponse.json({ success: true });
}

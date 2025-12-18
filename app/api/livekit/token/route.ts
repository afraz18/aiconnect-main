import { AccessToken } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const room = req.nextUrl.searchParams.get("room");
    const username = req.nextUrl.searchParams.get("username");

    if (!room || !username) {
        return NextResponse.json(
            { error: "Missing room or username parameter" },
            { status: 400 }
        );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
        return NextResponse.json(
            { error: "Server misconfigured - LiveKit credentials missing" },
            { status: 500 }
        );
    }

    try {
        const at = new AccessToken(apiKey, apiSecret, {
<<<<<<< HEAD
            identity: `${username}-${Math.floor(Math.random() * 10000)}`,

            ttl: 36000,   // 10 hours

=======
            identity: username,
            ttl: "10h", // Token valid for 10 hours
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
        });

        at.addGrant({
            room,
            roomJoin: true,
            canPublish: true,
            canPublishData: true,
            canSubscribe: true,
        });

        const token = await at.toJwt();

        return NextResponse.json({ token });
    } catch (error) {
        console.error("Error generating token:", error);
        return NextResponse.json(
            { error: "Failed to generate token" },
            { status: 500 }
        );
    }
}

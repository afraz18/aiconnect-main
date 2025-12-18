import { RoomEvent } from "livekit-client";

// Listen for incoming data messages
export function setupDataChannel(room, onMessage) {
    if (!room) {
        console.error("Room not ready for data channel");
        return;
    }

    // LiveKit new event listener
    room.on(RoomEvent.DataReceived, (payload, participant, kind) => {
        try {
            const decoded = new TextDecoder().decode(payload);
            const msg = JSON.parse(decoded);
            onMessage(msg, participant);
        } catch (e) {
            console.error("❌ Failed to decode incoming data:", e);
        }
    });

    console.log("✔ Data channel listener active");
}

// Send data to all participants
export function sendData(room, type, payload = {}) {
    if (!room || !room.localParticipant) {
        console.error("❌ Room or participant missing for sendData");
        return;
    }

    const message = JSON.stringify({ type, payload });

    try {
        room.localParticipant.publishData(
            new TextEncoder().encode(message),
            { reliable: true }
        );

        console.log("📤 DATA SENT:", type, payload);
    } catch (err) {
        console.error("❌ Failed to send data:", err);
    }
}

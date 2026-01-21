import { NextRequest, NextResponse } from 'next/server';
import { JaaSWebhookEvent } from '@/types/jitsi/webhooks';

export async function POST(req: NextRequest) {
    try {
        const event: JaaSWebhookEvent = await req.json();

        if (!event || !event.eventType) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        console.log(`[JaaS Webhook] Received event: ${event.eventType}`, {
            sessionId: event.sessionId,
            timestamp: new Date(event.timestamp || Date.now()).toISOString(),
            data: event.data
        });

        switch (event.eventType) {
            case 'ROOM_CREATED':
                break;
            case 'PARTICIPANT_JOINED':
                break;
            case 'RECORDING_UPLOADED':
                console.log("Recording Link:", event.data.preAuthenticatedLink);
                break;
        }

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('[JaaS Webhook] Error processing webhook:', error);
        return NextResponse.json({ error: 'Internal User Error' }, { status: 500 });
    }
}

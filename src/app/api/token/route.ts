import { NextRequest, NextResponse } from 'next/server';
import { generateJitsiToken } from '@/lib/jitsi';
// using crypto.randomUUID()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { room, name, isModerator } = body;

        if (!room || !name) {
            return NextResponse.json({ error: 'Room and Name are required' }, { status: 400 });
        }

        // Debug logging
        console.log("Generating token for:", { room, name, isModerator });
        console.log("Env Check:", {
            hasAppId: !!process.env.JITSI_APP_ID,
            hasKid: !!process.env.JITSI_KID,
            hasPrivateKey: !!process.env.JITSI_PRIVATE_KEY
        });

        const startRecording = false;
        const user = {
            id: crypto.randomUUID(),
            name: name,
            email: `${name.replace(/\s/g, '').toLowerCase()}@example.com`,
            isModerator: isModerator || false,
        };

        const token = generateJitsiToken({
            room,
            user,
            appId: process.env.JITSI_APP_ID || '', // Tenant ID
            kid: process.env.JITSI_KID || '',
            privateKey: (process.env.JITSI_PRIVATE_KEY || '').replace(/\\n/g, '\n'), // Handle newlines in env vars
        });

        return NextResponse.json({ token, room, user });
    } catch (error) {
        console.error('Error generating token:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

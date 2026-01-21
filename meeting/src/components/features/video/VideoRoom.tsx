"use client";

import React, { useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoRoomProps {
    roomName: string;
    userName: string;
    jwt?: string;
    password?: string;
    isSecure?: boolean;
}

export function VideoRoom({
    roomName,
    userName,
    jwt,
    password,
    isSecure = true,
}: VideoRoomProps) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Use NEXT_PUBLIC_JITSI_APP_ID or fallback for JaaS Tenant ID
    // Use NEXT_PUBLIC_JITSI_APP_ID for JaaS Tenant ID
    const APP_ID = process.env.NEXT_PUBLIC_JITSI_APP_ID;

    // For JaaS (8x8.vc), the room name MUST be prefixed with the Tenant ID
    // e.g. "vpaas-magic-cookie-xxx/RoomName"
    // If roomName already contains the AppID, don't prepend it again (prevent double prefixing)
    const prefix = `${APP_ID}/`;
    const fullRoomName = (APP_ID && !roomName.startsWith(prefix)) ? `${prefix}${roomName}` : roomName;

    // Domain is always 8x8.vc for JaaS if APP_ID is present
    const domain = APP_ID ? "8x8.vc" : (process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.jit.si");

    const [copied, setCopied] = useState(false);

    const handleReadyToClose = () => {
        router.push("/");
    };

    const copyMeetingLink = () => {
        // Construct the meeting URL (assuming standard Next.js route)
        // We clean the URL to just the room path, removing potential JWT params for sharing

        const urlObj = new URL(window.location.href);
        // Clean params for the link we show
        urlObj.searchParams.delete('jwt');
        // We keep password in the link for convenience or remove it if we want strict entry
        // Usually Zoom invites separate them, but we'll include the clean URL.
        const cleanLink = urlObj.toString();

        const inviteText = `
${userName || "Host"} is inviting you to a meeting.

Join the meeting:
${cleanLink}

Meeting ID: ${roomName}
${password ? `Password: ${password}` : ""}
`.trim();

        navigator.clipboard.writeText(inviteText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="h-screen w-full bg-slate-900 relative overflow-hidden">

            {/* Custom Share Button Overlay */}
            <div className="absolute top-4 right-4 z-[100] flex gap-2">
                <button
                    onClick={copyMeetingLink}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all font-medium backdrop-blur-sm bg-opacity-90"
                >
                    {copied ? (
                        <>
                            <span className="text-green-300">✓ Copied</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>
                            Share Meeting
                        </>
                    )}
                </button>
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900 text-white">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                    <span className="ml-4 text-lg">
                        Connecting to secure room...
                    </span>
                </div>
            )}

            {!jwt && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 px-4 py-2 rounded-lg backdrop-blur-md">
                    <p className="text-sm font-medium">
                        Demo Mode: No Jitsi JWT found. Authentication may fail.
                    </p>
                </div>
            )}

            <JitsiMeeting
                domain={domain}
                roomName={fullRoomName}
                jwt={jwt}
                configOverwrite={{
                    startWithAudioMuted: false,
                    disableThirdPartyRequests: true,
                    prejoinPageEnabled: false,
                    startScreenSharing: false,
                    enableEmailInStats: false,
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    TOOLBAR_BUTTONS: [
                        "microphone",
                        "camera",
                        "desktop",
                        "fullscreen",
                        "hangup",
                        "chat",
                        "raisehand",
                        "settings",
                        "tileview",
                        "invite",
                        "whiteboard", // Added whiteboard button
                    ],
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    DEFAULT_BACKGROUND: "#0f172a",
                }}
                userInfo={{
                    displayName: userName,
                    email: `${userName
                        .replace(/\s/g, "")
                        .toLowerCase()}@example.com`,
                }}
                onApiReady={(externalApi) => {
                    setLoading(false);

                    if (password) {
                        externalApi.executeCommand("password", password);
                    }
                }}
                onReadyToClose={handleReadyToClose}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = "100%";
                    iframeRef.style.width = "100%";
                    iframeRef.style.border = "none";
                }}
            />
        </div>
    );
}

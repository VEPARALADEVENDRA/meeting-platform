"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Lobby } from "@/components/features/lobby/Lobby";
import { VideoRoom } from "@/components/features/video/VideoRoom";
import { Loader2 } from "lucide-react";

export default function MeetingPage() {
    const params = useParams();
    const roomName = params.id as string;

    const searchParams = useSearchParams();
    const jwtParam = searchParams.get('jwt');
    const passwordParam = searchParams.get('password');

    const [step, setStep] = useState<"lobby" | "joining" | "room">("lobby");
    const [userDetails, setUserDetails] = useState<{ name: string } | null>(null);
    const [jwt, setJwt] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [isSecure, setIsSecure] = useState(true);

    useEffect(() => {
        setIsSecure(
            typeof window !== 'undefined' &&
            (window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        );

        if (passwordParam) {
            setPassword(passwordParam);
        }

        if (jwt) {
            // setJwt(jwtParam);
            setUserDetails({ name: "Host" }); // Default name for host, or could decode from token
            setStep("room");
        }
    }, [jwt]);

    const handleJoin = async (details: { name: string; audio: boolean; video: boolean }) => {
        setStep("joining");
        setUserDetails(details);

        try {
            // Attempt to generate a secure token
            // For a public server this might just return null or a basic token
            const response = await fetch("/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room: roomName,
                    name: details.name,
                    token : "token11",
                    // user details for avatar could be passed here
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Token response:", data);
                if (data.token) {
                    console.log("Token generated:", data.token);
                    setJwt(data.token);
                }
            } else {
                console.warn("Failed to fetch token, proceeding with anonymous/guest access if allowed");
            }
        } catch (error) {
            console.error("Token fetch error:", error);
        } finally {
            setStep("room");
        }
    };

    if (!isSecure) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4 text-center">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md">
                    <h2 className="text-xl font-bold text-red-500 mb-2">Insecure Connection Detected</h2>
                    <p className="text-slate-300 mb-4">
                        WebRTC (Camera & Microphone) requires a secure connection (HTTPS) to work properly.
                    </p>
                    <p className="text-slate-400 text-sm">
                        You are currently accessing this via <code>http://</code>. Please use <code>localhost</code> or set up HTTPS.
                    </p>
                </div>
            </div>
        );
    }

    if (!roomName) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        )
    }

    if (step === "room" && userDetails) {
        return (
            <VideoRoom
                roomName={roomName}
                userName={userDetails.name}
                jwt={jwt}
                password={password}
                isSecure={isSecure}
            />
        );
    }

    if (step === "joining") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white gap-4">
                <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
                <p className="text-slate-400">Securing your connection...</p>
            </div>
        )
    }

    return (
        <Lobby
            roomName={roomName}
            onJoin={handleJoin}
        />
    );
}

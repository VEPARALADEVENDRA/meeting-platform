"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

interface LobbyProps {
    roomName: string;
    onJoin: (details: { name: string; audio: boolean; video: boolean }) => void;
}

export function Lobby({ roomName, onJoin }: LobbyProps) {
    const [name, setName] = useState("");
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [hasPermissions, setHasPermissions] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let mounted = true;

        async function initMedia() {
            // ✅ WebRTC support check (CRITICAL FIX)
            // if (
            //     typeof window === "undefined" ||
            //     !navigator.mediaDevices ||
            //     !navigator.mediaDevices.getUserMedia ||
            //     !("RTCPeerConnection" in window)
            // ) {
            //     console.error("WebRTC not supported in this browser");
            //     setHasPermissions(false);
            //     return;
            // }
            const hasWebRTC =
                typeof window !== "undefined" &&
                (window.RTCPeerConnection ||
                    // Safari (older)
                    (window as any).webkitRTCPeerConnection ||
                    // Firefox (very old)
                    (window as any).mozRTCPeerConnection);

            if (
                !hasWebRTC ||
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {
                console.error("WebRTC not supported or blocked in this browser");
                setHasPermissions(false);
                return;
            }



            try {
                const localStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });

                if (!mounted) return;

                setStream(localStream);
                setHasPermissions(true);

                if (videoRef.current) {
                    videoRef.current.srcObject = localStream;
                }
            } catch (err) {
                console.error("Media permission denied:", err);
                setHasPermissions(false);
            }
        }

        initMedia();

        return () => {
            mounted = false;
            setStream((prev) => {
                prev?.getTracks().forEach((t) => t.stop());
                return null;
            });
        };

    }, []);


    useEffect(() => {
        if (stream) {
            stream.getAudioTracks().forEach((track) => (track.enabled = audioEnabled));
            stream.getVideoTracks().forEach((track) => (track.enabled = videoEnabled));
        }
    }, [audioEnabled, videoEnabled, stream]);

    const handleJoin = () => {
        if (name.trim()) {
            // Stop the lobby stream before joining so Jitsi can take over
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
            onJoin({ name, audio: audioEnabled, video: videoEnabled });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
            <Card className="w-full max-w-4xl grid md:grid-cols-2 gap-0 overflow-hidden border-0">
                {/* Preview Section */}
                <div className="relative h-[400px] md:h-auto bg-black flex items-center justify-center p-4">
                    <div className="relative w-full h-full max-h-[400px] rounded-2xl overflow-hidden bg-slate-800 ring-1 ring-white/10">
                        {hasPermissions ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className={cn(
                                    "w-full h-full object-cover transform scale-x-[-1]",
                                    !videoEnabled && "hidden"
                                )}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center px-6 p-4">
                                <h3 className="text-red-400 font-semibold text-lg mb-2">Camera Blocked</h3>
                                <p className="text-xs text-slate-500 mb-3">
                                    Browsers block camera access on insecure (HTTP) network connections.
                                </p>
                                <div className="text-left bg-slate-900/80 p-3 rounded border border-slate-700 w-full text-xs space-y-2">
                                    <p className="font-bold text-slate-300">To fix on Network (Chrome/Edge):</p>
                                    <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                                        <li>Go to <code className="text-blue-400 select-all">chrome://flags/#unsafely-treat-insecure-origin-as-secure</code></li>
                                        <li>
                                            Enable it & add:{" "}
                                            <code className="text-green-400 select-all">
                                                {typeof window !== "undefined" && window.location.origin
                                                    ? window.location.origin
                                                    : "https://localhost:3000"}
                                            </code>
                                        </li>

                                        <li>Relaunch browser</li>
                                    </ol>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4 border-slate-700 hover:bg-slate-800"
                                    onClick={() => setHasPermissions(true)}
                                >
                                    Try Anyway (Might Fail)
                                </Button>
                            </div>
                        )}


                        {!videoEnabled && hasPermissions && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                                <div className="h-24 w-24 rounded-full bg-slate-700 flex items-center justify-center">
                                    <span className="text-3xl font-semibold text-slate-400">
                                        {name ? name.charAt(0).toUpperCase() : "?"}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
                            <IconButton
                                variant={audioEnabled ? "default" : "danger"}
                                onClick={() => setAudioEnabled(!audioEnabled)}
                            >
                                {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                            </IconButton>
                            <IconButton
                                variant={videoEnabled ? "default" : "danger"}
                                onClick={() => setVideoEnabled(!videoEnabled)}
                            >
                                {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                            </IconButton>
                        </div>
                    </div>
                </div>

                {/* Join Control Section */}
                <div className="p-8 flex flex-col justify-center space-y-8 glass bg-slate-900/50">
                    <div>
                        <CardTitle className="text-3xl mb-2">Ready to join?</CardTitle>
                        <CardDescription className="text-base">
                            Configuring access for <strong>{roomName}</strong>
                        </CardDescription>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Display Name</label>
                            <Input
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-12 text-lg bg-slate-800/50 border-slate-700 focus:border-blue-500"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            size="lg"
                            className="w-full text-lg h-14"
                            onClick={handleJoin}
                            disabled={!name.trim()}
                        >
                            Join Meeting
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowLeft, Video, Calendar, Settings, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0px) scale(1); }
}
`;

export default function SchedulePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"conference" | "webinar">("conference");
    const [formData, setFormData] = useState({
        topic: "Design Video App",
        roomName: "", // will auto-generate or user input
        password: "",
        enableWaiting: false,
        muteOnEntry: true,
        enableFeedback: false,
        enableGroupChat: true,
        enableShareScreen: true,
        requestEmail: false,
        registrationRequired: false,
    });

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let pass = "";
        for (let i = 0; i < 8; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, password: pass });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const roomToUse = formData.roomName.trim() || `Meeting-${Math.random().toString(36).substring(7)}`;

        try {
            // Generate Token for Host (Moderator)
            const response = await fetch("/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room: roomToUse,
                    name: "Host User", // In real app, get from auth context
                    isModerator: true,
                    token : "token11",
                    features: {
                        recording: true, // Enable recording for host
                        livestreaming: mode === "webinar",
                        screenSharing: formData.enableShareScreen,
                    }
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Removed duplicate line
                let url = `/meeting/${roomToUse}?jwt=${data.token}`;
                if (formData.password) {
                    url += `&password=${encodeURIComponent(formData.password)}`;
                }
                router.push(url);
            } else {
                console.error("Failed to create meeting token");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen w-full bg-[#DCECF7] flex justify-center items-center overflow-auto py-10">
            <style>{styles}</style>

            {/* Decorative blobs */}
            <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-indigo-200/60 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite] pointer-events-none" />
            <div className="absolute bottom-[-60px] left-[-60px] w-60 h-60 bg-blue-200/60 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite] pointer-events-none" />

            <div className="relative w-full max-w-lg px-6 animate-[fadeIn_0.9s_ease-out] z-10">
                <div
                    className="
                        relative
                        rounded-3xl
                        overflow-hidden
                        border border-white/30
                        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                        px-6 py-8
                        backdrop-blur-xl
                    "
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-blue-500/35 to-indigo-700/40" />

                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-100px] -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <header className="mb-6 flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 text-[#1F2A44] hover:bg-white/20">
                                <ArrowLeft size={20} />
                            </Button>
                            <h1 className="text-[28px] font-bold text-[#1F2A44]">
                                Schedule Meeting
                            </h1>
                        </header>

                        <div className="p-1 bg-white/30 backdrop-blur rounded-xl flex gap-1 mb-6">
                            <button
                                type="button"
                                onClick={() => setMode("conference")}
                                className={cn(
                                    "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                                    mode === "conference" ? "bg-white text-indigo-600 shadow-sm" : "text-[#1F2A44]/70 hover:text-[#1F2A44]"
                                )}
                            >
                                Conference
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("webinar")}
                                className={cn(
                                    "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
                                    mode === "webinar" ? "bg-white text-purple-600 shadow-sm" : "text-[#1F2A44]/70 hover:text-[#1F2A44]"
                                )}
                            >
                                Webinar
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#1F2A44]">Meeting Topic</label>
                                    <Input
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        className="bg-white/60 border-white/40 text-[#1F2A44] placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#1F2A44]">Meeting / Room Name</label>
                                    <Input
                                        placeholder="Auto-generated if empty"
                                        value={formData.roomName}
                                        onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                                        className="bg-white/60 border-white/40 text-[#1F2A44] placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#1F2A44]">Password</label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="bg-white/60 border-white/40 text-[#1F2A44] placeholder:text-gray-400"
                                            placeholder="Optional"
                                        />
                                        <Button type="button" onClick={generatePassword} className="bg-white/70 text-indigo-600 hover:bg-white/90">
                                            Generate
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <CheckboxRow
                                    label="Enable Waiting"
                                    desc="Participant wait, till host let them in the room."
                                    checked={formData.enableWaiting}
                                    onChange={(c: boolean) => setFormData({ ...formData, enableWaiting: c })}
                                />
                                <CheckboxRow
                                    label="Participant can not unmute himself"
                                    desc="Participant do not have access to audio/video till host allows."
                                    checked={formData.muteOnEntry}
                                    onChange={(c: boolean) => setFormData({ ...formData, muteOnEntry: c })}
                                />
                                <CheckboxRow
                                    label="Enable Share Screen"
                                    desc="Participant will be allowed to share the screen."
                                    checked={formData.enableShareScreen}
                                    onChange={(c: boolean) => setFormData({ ...formData, enableShareScreen: c })}
                                />
                                <CheckboxRow
                                    label="Enable Group Chat"
                                    desc="Participant will be allowed to group chat."
                                    checked={formData.enableGroupChat}
                                    onChange={(c: boolean) => setFormData({ ...formData, enableGroupChat: c })}
                                />
                                {/* Visual separator */}
                                <div className="h-px bg-white/20 my-2" />

                                <CheckboxRow
                                    label="Registration is required for participant"
                                    desc="Participants will have to register with verified email address."
                                    checked={formData.registrationRequired}
                                    onChange={(c: boolean) => setFormData({ ...formData, registrationRequired: c })}
                                />
                            </div>

                            <Button
                                onClick={handleCreate}
                                className="w-full h-14 text-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold shadow-lg"
                                isLoading={loading}
                            >
                                Create {mode === 'conference' ? 'Conference' : 'Webinar'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function CheckboxRow({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <div className="flex items-start gap-3 group cursor-pointer" onClick={() => onChange(!checked)}>
            <div className={cn(
                "mt-0.5 h-5 w-5 rounded border flex items-center justify-center transition-colors",
                checked ? "bg-indigo-500 border-indigo-500" : "border-[#1F2A44]/30 bg-white/40 group-hover:border-indigo-400"
            )}>
                {checked && <Settings className="h-3 w-3 text-white" />}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-[#1F2A44]">{label}</p>
                <p className="text-xs text-[#6B7A99] leading-tight mt-0.5">{desc}</p>
            </div>
        </div>
    );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MessageSquare, Video } from "lucide-react";

export default function OTPPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md z-10">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 text-blue-500">
                        <div className="p-2 bg-blue-500/10 rounded-xl">
                            <Video size={32} />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            VideoMeet
                        </span>
                    </div>
                </div>

                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl">Verification</CardTitle>
                        <CardDescription>
                            Enter the OTP that you will receive on your mail ID
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2">
                                <div className="relative">
                                    <Input
                                        icon={<MessageSquare className="h-4 w-4" />}
                                        placeholder="OTP"
                                        type="text"
                                        maxLength={6}
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        className="bg-slate-950/50 border-slate-800 h-14 text-lg tracking-widest"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="h-8 w-8 rounded-full border border-blue-500/50 flex items-center justify-center text-xs text-blue-400 font-mono">
                                            {timer}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-slate-400 text-center leading-relaxed">
                                * One time password (OTP) has been sent on your email address. Please check your email for OTP. If you do not find in your index, please check your spam folder.
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                                isLoading={loading}
                            >
                                Verify
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

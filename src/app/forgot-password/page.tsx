"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Mail, ArrowLeft, Video } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate reset password API call
        setTimeout(() => {
            setLoading(false);
            // Navigate or show success message
            router.push("/otp?mode=reset");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
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
                    <CardHeader className="space-y-1 text-center relative">
                        <Link href="/login" className="absolute left-0 top-0 p-2 text-slate-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <CardTitle className="text-2xl">Forgot Password</CardTitle>
                        <CardDescription>
                            Enter the email address or mobile number to recover your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="space-y-2">
                                <Input
                                    icon={<Mail className="h-4 w-4" />}
                                    placeholder="Email Address"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-slate-950/50 border-slate-800"
                                />
                            </div>

                            <div className="flex justify-end">
                                <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                                    Forgot Password?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                                isLoading={loading}
                            >
                                Send Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

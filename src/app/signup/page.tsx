"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Lock, Mail, Video } from "lucide-react";

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

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    // const handleSignUp = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         // ✅ CHANGED: Direct redirect to dashboard, skipping OTP
    //         router.push("/dashboard");
    //     }, 1500);
    // };
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

        const emailExists = storedUsers.find(
            (user: any) => user.email === formData.email
        );

        if (emailExists) {
            setLoading(false);
            setError("This email is already registered. Please Sign In.");
            return;
        }

        const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };

        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        setLoading(false);
        router.push("/login");
    };


    return (
        <>
            <style>{styles}</style>

            {/* ✅ BACKGROUND SAME AS SIGN IN */}
            <main className="relative min-h-screen w-full bg-[#DCECF7] flex items-center justify-center overflow-hidden p-4">

                {/* Decorative blobs (same as signIn) with pointer-events-none */}
                <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-indigo-200/60 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite] pointer-events-none" />
                <div className="absolute top-40 left-[-60px] w-60 h-60 bg-blue-200/60 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite] pointer-events-none" />

                <section className="relative w-full max-w-md animate-[fadeIn_0.9s_ease-out] z-10">

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center gap-2 text-blue-600">
                            <div className="p-2 bg-blue-500/10 rounded-xl">
                                <Video size={32} />
                            </div>
                            <span className="text-2xl font-bold text-[#1F2A44]">
                                VideoMeet
                            </span>
                        </div>
                    </div>

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
                        {/* gradient layer matching Login exactly */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-blue-500/35 to-indigo-700/40" />

                        {/* soft glass blobs */}
                        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute top-40 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

                        <div className="relative z-10">

                            <header className="mb-6 text-center">
                                <h1 className="text-[28px] font-bold text-[#1F2A44]">
                                    Create Account
                                </h1>
                                <p className="mt-2 text-[14px] text-[#6B7A99]">
                                    Enter your details to create a new account
                                </p>
                            </header>
                            {error && (
                                <p className="mb-4 text-sm text-red-500 text-center">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSignUp} className="space-y-4">

                                <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
                                    <User className="text-gray-400" size={18} />
                                    <Input
                                        type="text"
                                        placeholder="User Name"
                                        required
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({ ...formData, username: e.target.value })
                                        }
                                        className="bg-transparent border-none shadow-none h-9 text-[14px] text-black placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
                                    <Mail className="text-gray-400" size={18} />
                                    <Input
                                        type="email"
                                        placeholder="you@gmail.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="bg-transparent border-none shadow-none h-9 text-[14px] text-black placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
                                    <Lock className="text-gray-400" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="bg-transparent border-none shadow-none h-9 text-[14px] text-black placeholder:text-gray-400"
                                    />
                                </div>

                                <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2">
                                    <Lock className="text-gray-400" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="bg-transparent border-none shadow-none h-9 text-[14px] text-black placeholder:text-gray-400"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    className="w-full mt-4 py-6 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg"
                                >
                                    Sign Up
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-indigo-500 font-medium">
                                    Sign In
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

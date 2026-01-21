"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Lock, Video } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

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

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         router.push("/dashboard");
    //     }, 1500);
    // };


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

        const validUser = storedUsers.find(
            (user: any) =>
                user.username === formData.username &&
                user.password === formData.password
        );

        if (!validUser) {
            setLoading(false);
            setError("Invalid username or password");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(validUser));
        setLoading(false);
        router.push("/dashboard");
    };

    return (
        <>
            <style>{styles}</style>

            <main className="relative min-h-screen w-full bg-[#DCECF7] flex justify-center items-center overflow-hidden">

                {/* Decorative blobs */}
                <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-indigo-200/60 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite] pointer-events-none" />
                <div className="absolute top-40 left-[-60px] w-60 h-60 bg-blue-200/60 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite] pointer-events-none" />

                <section className="relative w-full max-w-[400px] px-6 animate-[fadeIn_0.9s_ease-out]">

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
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-blue-500/35 to-indigo-700/40" />

                        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute top-40 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

                        <div className="relative z-10">

                            <header className="mb-6 text-center">
                                <h1 className="text-[28px] font-bold text-[#1F2A44]">
                                    Sign In
                                </h1>
                                <p className="mt-2 text-[14px] text-[#6B7A99]">
                                    Login to your existing account by entering your details.
                                </p>
                            </header>
                            {error && (
                                <p className="mb-4 text-sm text-red-500 text-center">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleLogin} className="space-y-4">

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

                                {/* ✅ MOVE BUTTON INSIDE FORM */}
                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    className="
      mt-5 w-full rounded-xl py-6
      bg-gradient-to-r from-indigo-500 to-blue-500
      text-white font-semibold shadow-lg
      flex flex-col items-center justify-center
    "
                                >
                                    Sign In
                                    <span className="block text-[11px] opacity-90">
                                        Experience HD Video Call
                                    </span>
                                </Button>

                            </form>


                            <p className="my-4 text-center text-[13px] text-gray-400">
                                or Sign in with
                            </p>

                            <div className="w-full flex items-center justify-center gap-3 rounded-xl py-3 bg-white/70 shadow-md backdrop-blur">
                                <FcGoogle size={20} />
                                <span className="text-[14px] text-gray-700 font-medium">
                                    Sign up with Google
                                </span>
                            </div>

                            <p className="mt-6 text-center text-[13px] text-gray-500">
                                Don’t have an account?{" "}
                                <Link href="/signup" className="text-indigo-500 font-medium">
                                    Let’s Sign Up
                                </Link>
                            </p>

                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

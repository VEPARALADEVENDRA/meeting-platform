"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Video, User, Sun, Moon, Link as LinkIcon, Calendar } from "lucide-react";
import { Globe, Instagram, Youtube, Facebook } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("Guest");

  const startMeeting = () => {
    // Generate random room if empty, or use entered one
    const room = roomName.trim() || Math.random().toString(36).substring(7);
    router.push(`/meeting/${room}`);
  };

  const goToSchedule = () => {
    router.push("/schedule");
  };

  return (
    <main className="min-h-screen w-full bg-[#DCECF7] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-slate-800">

      {/* Decorative Background Blobs */}
      {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" /> */}

      {/* Main Container Card */}
      <div className="w-full max-w-[400px] relative z-10 flex flex-col gap-6">

        {/* Header Row */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-[#4A43E9]">
            <Video className="fill-current w-6 h-6" />
            <span className="text-xl font-bold bg-clip-text text-[#1F2A44] tracking-tight">
              VideoMeet
            </span>
          </div>
          <div className="flex gap-3">
            {/* <button className="p-2 bg-[#4A43E9] rounded-md text-white shadow-md hover:bg-blue-700 transition">
              <Sun size={18} />
            </button> */}
            <div className="w-9 h-9 bg-slate-800 rounded-md flex items-center justify-center text-white">
              <User size={18} />
            </div>
          </div>
        </div>

        {/* Input Card Container */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-white/50">
          {/* User Name Field */}
          <div className="flex items-center gap-4 p-5 border-b border-white/50">
            <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium ml-1">User Name</span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent border-none outline-none text-[#1F2A44] font-semibold text-lg p-0 placeholder:text-slate-300"
                placeholder="Enter Name"
              />
            </div>
          </div>

          {/* Room Name Field */}
          <div className="flex items-center gap-4 p-5">
            <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500">
              <LinkIcon size={20} />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-xs text-slate-400 font-medium ml-1">Meeting / Room Name</span>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-transparent border-none outline-none text-[#1F2A44] font-medium text-lg p-0 w-full placeholder:text-slate-300"
                placeholder="Enter Room Name"
              />
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#4A43E9] to-transparent opacity-80" />
        </div>

        <p className="text-center text-[#4A43E9] text-sm font-medium">
          You will join Audio / Video Muted.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={startMeeting}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#594EF1] to-[#2B6DEC] hover:opacity-90 transition-all shadow-lg flex flex-col items-center justify-center gap-0.5"
          >
            <span className="text-lg font-bold">Start</span>
            <span className="text-xs font-normal opacity-90">Conference / Webinar</span>
          </Button>

          <Button
            onClick={goToSchedule}
            variant="outline"
            className="w-full h-16 rounded-2xl border-2 border-[#594EF1] text-[#594EF1] hover:bg-[#594EF1]/5 bg-transparent transition-all flex flex-col items-center justify-center gap-0.5"
          >
            <span className="text-lg font-bold">Scheduled</span>
            <span className="text-xs font-normal opacity-90">Conference / Webinar</span>
          </Button>
        </div>


        {/* Footer Section */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-[#4A43E9] font-medium">
            You Don't need to join a meeting
          </p>

          <Button
            className="w-full h-14 rounded-2xl bg-white/50 border border-[#594EF1]/30 hover:bg-white/80 text-[#4A43E9] shadow-sm flex flex-col items-center justify-center"
          >
            <span className="text-base font-bold">Sign UP/ Sign IN</span>
            <span className="text-[10px] opacity-80">To Host Meeting</span>
          </Button>

          <div className="pt-8 text-[10px] text-slate-500 leading-relaxed px-4">
            All Right Reserved by <span className="underline cursor-pointer">VideoMeet Private Limited</span> | <span className="underline cursor-pointer">Conferencing Solution</span> | <span className="underline cursor-pointer">Privacy policy / Terms of Service</span> | <span className="underline cursor-pointer">Help / Support Videos</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            {/* Website */}
            <a
              href="https://i2global.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A43E9] hover:scale-110 transition"
            >
              <Globe size={18} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/i2global_virtual_learning/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A43E9] hover:scale-110 transition"
            >
              <Instagram size={18} />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCYOz23hI2Op9xBZ6V0TMpcg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A43E9] hover:scale-110 transition"
            >
              <Youtube size={18} />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/i2globaltestprep/?locale=pt_PT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4A43E9] hover:scale-110 transition"
            >
              <Facebook size={18} />
            </a>
          </div>

        </div>

      </div>
    </main>
  );
}

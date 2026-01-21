'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';

const styles = `
@keyframes floatSlow {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0px); }
}

@keyframes fadeInScreen {
  0% { opacity: 0; transform: translateY(20px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0px) scale(1); }
}
`;

export default function SplashPage() {
  const router = useRouter();

  return (
    <>
      <style>{styles}</style>

      <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4
        bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700">

        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/i2g.png"
            alt="Background Pattern"
            fill
            className="object-cover opacity-20 mix-blend-screen"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />

        <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 blur-3xl rounded-full animate-[floatSlow_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 blur-3xl rounded-full animate-[floatSlow_9s_ease-in-out_infinite]" />

        <section
          className="
            relative 
            w-full 
            max-w-sm  
            rounded-3xl 
            overflow-hidden 
            shadow-2xl 
            animate-[fadeInScreen_1.2s_ease]
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/80 to-blue-800/80" />

          <div className="absolute -top-24 -right-24 h-72 w-72 rotate-12 bg-white/10 rounded-3xl animate-[floatSlow_7s_ease-in-out_infinite]" />
          <div className="absolute top-40 -left-32 h-80 w-80 -rotate-12 bg-white/5 rounded-3xl animate-[floatSlow_6s_ease-in-out_infinite]" />

          <div className="relative z-10 flex flex-col justify-between min-h-[560px]">

            <header className="px-8 pt-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-semibold tracking-wide">HD</span>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold tracking-wider drop-shadow-lg">
                VIDEOMEET
              </h1>

              <div className="mx-auto h-1 w-12 rounded-full bg-white/40 my-4" />

              <p className="text-sm opacity-90 leading-relaxed">
                Enjoy Mask Free <br /> Meetings
              </p>
            </header>

            <footer className="px-8 pb-10 text-center text-white">
              <p className="text-sm tracking-wide opacity-90">Made in India</p>
              <p className="text-xs opacity-70 mb-6">Made for World</p>

              <button
                onClick={() => router.push('/login')}
                className="
                  w-full 
                  rounded-full 
                  py-3 
                  bg-white/20 
                  text-white 
                  font-semibold 
                  hover:bg-white/30 
                  transition 
                  backdrop-blur-md 
                  shadow-lg
                "
              >
                Continue
              </button>

              <p className="mt-3 text-xs opacity-80">
                or{' '}
                <Link href="/signup" className="underline">
                  Create account
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

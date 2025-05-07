import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen   flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Friend AI Assistant
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
              Meet Friend, your personal AI companion with a lifelike 3D avatar
              that listens, talks, and helps you stay organized throughout your
              day.
            </p>
            <Link href={"/app"}>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-white opacity-50 blur"></div>

              <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                <Image
                  width={600}
                  height={600}
                  src={"/images/intro.png"}
                  alt="intro.png"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-black text-black dark:text-white rounded-full py-2 px-4 shadow-lg border border-gray-200 dark:border-gray-800">
                <p className="text-sm font-medium">AI Powered</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} VoiceFriend. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

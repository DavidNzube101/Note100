'use client'

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/image-assets/logo1.png"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const registerLink = "/onboarding/register"
  const loginLink = "/onboarding/login"

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-500">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <motion.main 
          className="flex flex-col items-center gap-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              className="dark:invert"
              src={logo}
              alt="Next.js logo"
              width={220}
              height={46}
              priority
            />
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to Your Learning Journey
          </motion.h1>

          <motion.ol 
            className="list-inside list-decimal text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-[family-name:var(--font-geist-mono)] space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <li>Get started by registering.</li>
            <li>Gain access to lecture notes.</li>
          </motion.ol>

          <motion.div 
            className="flex gap-6 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href={loginLink}>
              <motion.button
                className="px-8 py-3 bg-black text-white rounded-full text-lg font-semibold transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </Link>
            <Link href={registerLink}>
              <motion.button
                className="px-8 py-3 bg-white text-black border-2 border-black rounded-full text-lg font-semibold transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </Link>
          </motion.div>
        </motion.main>
      </div>

      <motion.footer 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <a
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
          href="https://www.github.com/DavidNzube101"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/globe.svg"
            alt="Globe icon"
            width={20}
            height={20}
            className="dark:invert"
          />
          <span className="text-lg">Developer →</span>
        </a>
      </motion.footer>
    </div>
  );
}


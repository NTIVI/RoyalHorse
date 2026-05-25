"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-[#120E0A] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/25 font-sans relative overflow-hidden mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="text-center md:text-left space-y-2">
          <Link href="/" className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
            ROYAL<span className="text-[#D4AF37]">HORSE</span>
          </Link>
          <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
            {t[lang].footerText}
          </p>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-5">
          <a 
            href="https://www.facebook.com/royalhorse.burgas"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 hover:border-gold/30 flex items-center justify-center text-white transition-all duration-300 text-xs font-semibold shadow-sm"
          >
            FB
          </a>
          <a 
            href="https://www.youtube.com/watch?v=7NOH8v2e2wE"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 hover:border-gold/30 flex items-center justify-center text-white transition-all duration-300 text-xs font-semibold shadow-sm"
          >
            YT
          </a>
        </div>
      </div>
    </footer>
  );
}

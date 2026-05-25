"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-[#120E0A] text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-[#D4AF37]/25 font-sans relative overflow-hidden mt-auto">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <Link href="/" className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
              ROYAL<span className="text-[#D4AF37]">HORSE</span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
              {t[lang].footerText}
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.facebook.com/royalhorse.burgas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/40 shadow-[0_0_12px_rgba(24,119,242,0.3)] hover:shadow-[0_0_22px_rgba(24,119,242,0.75)] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 text-sm font-semibold tracking-wide"
            >
              Facebook
            </a>
            <a 
              href="https://www.youtube.com/watch?v=7NOH8v2e2wE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000]/40 shadow-[0_0_12px_rgba(255,0,0,0.3)] hover:shadow-[0_0_22px_rgba(255,0,0,0.75)] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] flex items-center justify-center transition-all duration-300 text-sm font-semibold tracking-wide"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Divider & Agile Business Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 font-light">
            © {new Date().getFullYear()} ROYAL HORSE. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-gray-400 font-light">
            <span>
              {lang === "bg" 
                ? "Сайтът е създаден от" 
                : lang === "ru" 
                  ? "Сайт был создан" 
                  : "Website created by"}
            </span>
            <a
              href="https://agile-business-pro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/45 shadow-[0_0_12px_rgba(212,175,55,0.25)] hover:shadow-[0_0_22px_rgba(212,175,55,0.6)] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-bold text-[11px] tracking-wider"
            >
              Agile Business
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t[lang].navHome },
    { href: "/about", label: t[lang].navAbout },
    { href: "/riding", label: t[lang].navRiding },
    { href: "/services", label: t[lang].navServices },
    { href: "/prices", label: t[lang].navPrices },
    { href: "/gallery", label: t[lang].navGallery },
    { href: "/contacts", label: t[lang].navContacts },
  ];

  return (
    <nav className="sticky top-0 z-45 bg-[#FCFBF9]/90 backdrop-blur-lg border-b border-[#D4AF37]/15 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-bold tracking-[0.15em] text-[#111111] group-hover:text-gold transition-colors duration-300">
            ROYAL<span className="text-[#D4AF37] group-hover:text-black transition-colors duration-300">HORSE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-semibold tracking-wide text-gray-700">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-gold ${isActive ? "text-[#D4AF37] font-bold" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side controls (Language & CTA) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex bg-[#111111]/5 p-1 rounded-full text-xs font-bold border border-[#D4AF37]/10">
            <button
              onClick={() => setLang("bg")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "bg" ? "bg-[#111111] text-[#FCFBF9] shadow-sm" : "text-gray-500 hover:text-black cursor-pointer"
              }`}
            >
              BG
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "en" ? "bg-[#111111] text-[#FCFBF9] shadow-sm" : "text-gray-500 hover:text-black cursor-pointer"
              }`}
            >
              EN
            </button>
          </div>

          {/* CRM Booking CTA */}
          <Link
            href="/contacts"
            className="bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-[#FCFBF9] font-sans text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md border border-[#D4AF37]/20 hover:border-transparent active:scale-95"
          >
            {t[lang].navBookBtn}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          {/* Language switcher for mobile */}
          <button 
            onClick={() => setLang(lang === "bg" ? "en" : "bg")}
            className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 cursor-pointer"
          >
            {lang === "bg" ? "EN" : "BG"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black p-1 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-6 px-6 space-y-4 animate-fade-in-up font-sans">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-semibold transition-colors hover:text-gold ${isActive ? "text-[#D4AF37] font-bold" : "text-gray-800"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="block bg-[#111111] text-white text-center py-3 rounded-xl font-semibold text-sm"
          >
            {t[lang].navBookBtn}
          </Link>
        </div>
      )}
    </nav>
  );
}

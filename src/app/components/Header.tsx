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
    { href: "/articles", label: t[lang].navArticles },
    { href: "/contacts", label: t[lang].navContacts },
  ];

  return (
    <nav className="sticky top-0 z-45 bg-[#E8D1A7]/90 backdrop-blur-lg border-b border-[#84592B]/15 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 lg:gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <img 
            src="/images/horse_logo.png" 
            alt="RoyalHorse Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          />
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#442D1C] group-hover:text-orange-500 transition-colors duration-300">
            ROYAL<span className="text-[#84592B] group-hover:text-black transition-colors duration-300">HORSE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 lg:gap-5 font-sans text-xs xl:text-sm font-semibold tracking-wide text-gray-700 w-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap transition-colors hover:text-orange-500 ${isActive ? "text-[#84592B] font-bold" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side controls (Language & CTA) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex bg-[#442D1C]/5 p-1 rounded-full text-xs font-bold border border-[#84592B]/10">
            <button
              onClick={() => setLang("bg")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "bg" ? "bg-[#E8D1A7] text-[#442D1C] border border-[#84592B]/20 shadow-sm font-bold" : "text-gray-500 hover:text-[#442D1C] cursor-pointer"
              }`}
            >
              BG
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "ru" ? "bg-[#E8D1A7] text-[#442D1C] border border-[#84592B]/20 shadow-sm font-bold" : "text-gray-500 hover:text-[#442D1C] cursor-pointer"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "en" ? "bg-[#E8D1A7] text-[#442D1C] border border-[#84592B]/20 shadow-sm font-bold" : "text-gray-500 hover:text-[#442D1C] cursor-pointer"
              }`}
            >
              EN
            </button>
          </div>

          {/* CRM Booking CTA */}
          <Link
            href="/contacts"
            className="btn-animate bg-[#442D1C] hover:bg-[#84592B] hover:text-[#442D1C] text-[#E8D1A7] font-sans text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-full shadow-md border border-[#84592B]/20 hover:border-transparent"
          >
            {t[lang].navBookBtn}
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          {/* Language switcher for mobile */}
          <button 
            onClick={() => setLang(lang === "bg" ? "ru" : lang === "ru" ? "en" : "bg")}
            className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 cursor-pointer"
          >
            {lang === "bg" ? "RU" : lang === "ru" ? "EN" : "BG"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black p-1 hover:text-[#84592B] transition-colors cursor-pointer"
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
                className={`block text-base font-semibold transition-colors hover:text-orange-500 ${isActive ? "text-[#84592B] font-bold" : "text-gray-800"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-animate block bg-[#442D1C] text-white text-center py-3 rounded-xl font-semibold text-sm"
          >
            {t[lang].navBookBtn}
          </Link>
        </div>
      )}
    </nav>
  );
}

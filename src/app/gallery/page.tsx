"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, galleryItems } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("all");

  const filterCategories = [
    { id: "all", label: t[lang].filterAll },
    { id: "opening", label: t[lang].filterOpening },
    { id: "doors", label: t[lang].filterDoors },
    { id: "farm", label: t[lang].filterFarm },
    { id: "birthdays", label: t[lang].filterBirthdays },
    { id: "photoshoots", label: t[lang].filterPhotoshoots },
  ];

  const filteredItems = filter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.filter === filter);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCFBF9] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4 flex items-center justify-center gap-3">
              <ImageIcon className="w-10 h-10 text-[#D4AF37]" />
              {t[lang].galleryTitle}
            </h1>
            <p className="text-lg text-[#D4AF37] font-serif italic">
              {t[lang].gallerySub}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  filter === cat.id
                    ? "bg-[#111111] border-transparent text-[#FCFBF9] shadow-md"
                    : "bg-white border-gray-200 text-gray-600 hover:text-black hover:border-gray-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group relative aspect-[4/3]"
              >
                <img
                  src={item.url}
                  alt={lang === "bg" ? item.titleBg : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      {filterCategories.find(c => c.id === item.filter)?.label}
                    </p>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {lang === "bg" ? item.titleBg : item.titleEn}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Optional Message if Empty */}
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              {lang === "bg" ? "Няма снимки в тази категория." : "No photos available in this category."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

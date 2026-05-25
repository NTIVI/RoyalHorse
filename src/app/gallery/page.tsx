"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, translate } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultGallery = [
    { title_bg: "Голямото Откриване", title_en: "The Grand Opening", desc_bg: "Кадри от първия ден на отваряне", desc_en: "Grand opening day", image_url: "/images/gallery_image_1.jpg", extra_info: "opening" },
    { title_bg: "Отворени Врати", title_en: "Open Doors Day", desc_bg: "Деца и родители се запознават с понита", desc_en: "Pony meeting", image_url: "/images/gallery_image_2.jpg", extra_info: "doors" },
    { title_bg: "Животът във фермата", title_en: "Life at the Farm", desc_bg: "Хранене на зайците и редките видове токачки", desc_en: "Farm rabbits", image_url: "/images/gallery_image_3.jpg", extra_info: "farm" },
    { title_bg: "Рожден ден на открито", title_en: "Outdoor Birthday", desc_bg: "Рожден ден с езда на пони", desc_en: "Kids birthday", image_url: "/images/gallery_image_4.jpg", extra_info: "birthdays" },
    { title_bg: "Професионална Фотосесия", title_en: "Photoshoot in Nature", desc_bg: "Сесия с черен жребец", desc_en: "Nature photo session", image_url: "/images/gallery_image_5.jpg", extra_info: "photoshoots" },
  ];

  useEffect(() => {
    fetch("/api/content?category=gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryPhotos(data);
        } else {
          setGalleryPhotos(defaultGallery);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setGalleryPhotos(defaultGallery);
        setLoading(false);
      });
  }, []);

  const filterCategories = [
    { id: "all", label: t[lang].filterAll },
    { id: "opening", label: t[lang].filterOpening },
    { id: "doors", label: t[lang].filterDoors },
    { id: "farm", label: t[lang].filterFarm },
    { id: "birthdays", label: t[lang].filterBirthdays },
    { id: "photoshoots", label: t[lang].filterPhotoshoots },
  ];

  const filteredItems = filter === "all" 
    ? galleryPhotos 
    : galleryPhotos.filter(item => item.extra_info === filter);

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
            {filteredItems.map((item, index) => {
              const title = lang === "bg" ? item.title_bg : lang === "ru" ? translate(item.title_bg, "ru") : item.title_en;
              const filterLabel = filterCategories.find(c => c.id === item.extra_info)?.label || "";

              return (
                <div
                  key={item.id || index}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group relative aspect-[4/3]"
                >
                  <img
                    src={item.image_url}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        {filterLabel}
                      </p>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              {lang === "bg" ? "Няма снимки в тази категория." : lang === "ru" ? "В этой категории нет фотографий." : "No photos available in this category."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, translate } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { GraduationCap, Trees, Compass } from "lucide-react";

export default function RidingPage() {
  const { lang } = useLanguage();
  const [ridingItems, setRidingItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Default hardcoded list
  const defaultRiding = [
    {
      title_bg: t[lang].rideKids,
      title_en: t[lang].rideKidsText,
      desc_bg: t[lang].rideKidsText,
      desc_en: "Pony riding sessions, individual coaching, and dedicated hippotherapy for kids.",
      image_url: "/images/riding_lessons_image_1.jpg",
      iconType: "kids"
    },
    {
      title_bg: t[lang].rideAdults,
      title_en: t[lang].rideAdultsText,
      desc_bg: t[lang].rideAdultsText,
      desc_en: "Professional training, dressage skills development, and trial rides for adult riders.",
      image_url: "/images/riding_horse_image_1.jpg",
      iconType: "adults"
    },
    {
      title_bg: t[lang].rideExcursions,
      title_en: t[lang].rideExcursionsText,
      desc_bg: t[lang].rideExcursionsText,
      desc_en: "Riding tours through scenic mountain paths of Strandzha and coastlines.",
      image_url: "/images/riding_excursions_image_1.jpg",
      iconType: "nature"
    }
  ];

  useEffect(() => {
    fetch("/api/content?category=riding")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRidingItems(data);
        } else {
          setRidingItems(defaultRiding);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setRidingItems(defaultRiding);
        setLoading(false);
      });
  }, [lang]);

  const getIcon = (titleBg: string) => {
    if (titleBg.includes("деца") || titleBg.includes("Kids") || titleBg.includes("pony")) {
      return <GraduationCap className="w-8 h-8 text-[#84592B]" />;
    }
    if (titleBg.includes("преходи") || titleBg.includes("Разходки") || titleBg.includes("Trails") || titleBg.includes("excursion")) {
      return <Trees className="w-8 h-8 text-[#84592B]" />;
    }
    return <Compass className="w-8 h-8 text-[#84592B]" />;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#E8D1A7] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-block px-5 py-2 border border-[#84592B]/40 text-xs font-bold tracking-[0.2em] text-[#84592B] rounded-full uppercase bg-white/20 backdrop-blur-sm">
              {t[lang].ridingSub}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900">
              {t[lang].ridingTitle}
            </h1>
          </div>

          {/* Service Sections */}
          <div className="space-y-24">
            {ridingItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const title = lang === "bg" ? item.title_bg : lang === "ru" ? translate(item.title_bg, "ru") : item.title_en;
              const desc = lang === "bg" ? item.desc_bg : lang === "ru" ? translate(item.desc_bg, "ru") : item.desc_en;

              return (
                <div
                  key={item.id || index}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text Column */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="inline-flex p-3 bg-white border border-[#84592B]/20 rounded-2xl shadow-md">
                      {getIcon(item.title_bg)}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{title}</h2>
                    <p className="text-gray-600 leading-relaxed text-base">{desc}</p>

                    <div className="pt-4">
                      <Link
                        href={`/contacts?service=${encodeURIComponent(title)}`}
                        className="inline-flex bg-[#442D1C] hover:bg-[#84592B] hover:text-[#442D1C] text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-transparent shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                      >
                        {lang === "bg" ? "Заяви час за тази услуга" : lang === "ru" ? "Забронировать эту услугу" : "Book this service"}
                      </Link>
                    </div>
                  </div>

                  {/* Visual Column */}
                  <div className="w-full lg:w-1/2">
                    <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                      <img
                        src={item.image_url}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

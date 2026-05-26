"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, translate } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Dog, ShieldCheck, Cake, Utensils, Zap, Flame } from "lucide-react";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultServices = [
    { title_bg: "Хотел за любимци", title_en: "Pet Hotel", desc_bg: t[lang].servPetHotelDesc, desc_en: "Professional pet hotel care for dogs and cats during your travels.", image_url: "/images/services_pet_hotel_image_3.jpg" },
    { title_bg: "Хотел за коне", title_en: "Horse Boarding", desc_bg: t[lang].servHorseHotelDesc, desc_en: "Full stable boarding with custom feeding, grazing, and veterinary monitoring.", image_url: "/images/services_horse_hotel_image_1.jpg" },
    { title_bg: "Детски рождени дни", title_en: "Kids Birthdays", desc_bg: t[lang].servBirthdayDesc, desc_en: "Unique open-air birthday parties with ponies, farm tour, and animators.", image_url: "/images/services_birthday_image_4.jpg" },
    { title_bg: "Домашна кухня", title_en: "Home Kitchen & Dining", desc_bg: t[lang].servKitchenDesc, desc_en: "Eco-sourced restaurant serving traditional Bulgarian and Russian specialties.", image_url: "/images/services_restaurant_image_1.jpg" },
    { title_bg: "АТВ Разходки", title_en: "ATV Tours", desc_bg: t[lang].servATVDesc, desc_en: "Exciting off-road 450cc ATV rentals with mountain guides.", image_url: "/images/services_atv_image_1.jpg" },
    { title_bg: "Руска баня", title_en: "Russian Bathhouse", desc_bg: t[lang].servBathDesc, desc_en: "Traditional wood-fired sauna with steam sessions and herbal tea room.", image_url: "/images/services_sauna_image_1.jpg" },
  ];

  useEffect(() => {
    fetch("/api/content?category=services")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        } else {
          setServicesList(defaultServices);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setServicesList(defaultServices);
        setLoading(false);
      });
  }, [lang]);

  const getIcon = (titleBg: string) => {
    const text = titleBg.toLowerCase();
    if (text.includes("любимци") || text.includes("куче") || text.includes("pet")) return <Dog className="w-6 h-6 text-[#F97316]" />;
    if (text.includes("коне") || text.includes(" boarding") || text.includes("кон ")) return <ShieldCheck className="w-6 h-6 text-[#F97316]" />;
    if (text.includes("рождени") || text.includes("birthday")) return <Cake className="w-6 h-6 text-[#F97316]" />;
    if (text.includes("кухня") || text.includes("ресторант") || text.includes("kitchen") || text.includes("dining")) return <Utensils className="w-6 h-6 text-[#F97316]" />;
    if (text.includes("атв") || text.includes("atv")) return <Zap className="w-6 h-6 text-[#F97316]" />;
    return <Flame className="w-6 h-6 text-[#F97316]" />;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCFBF9] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4">
              {t[lang].servicesTitle}
            </h1>
            <p className="text-lg text-[#F97316] font-serif italic">
              {t[lang].servicesSub}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => {
              const title = lang === "bg" ? service.title_bg : lang === "ru" ? translate(service.title_bg, "ru") : service.title_en;
              const desc = lang === "bg" ? service.desc_bg : lang === "ru" ? translate(service.desc_bg, "ru") : service.desc_en;

              return (
                <div
                  key={service.id || idx}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Header */}
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={service.image_url}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-[#F97316]/15 shadow-md">
                      {getIcon(service.title_bg)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-bold text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{desc}</p>
                    </div>

                    <div className="pt-4 mt-auto">
                      <Link
                        href={`/contacts?service=${encodeURIComponent(title)}`}
                        className="block text-center w-full bg-[#111111] hover:bg-[#F97316] hover:text-[#111111] text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-colors duration-300 cursor-pointer"
                      >
                        {lang === "bg" ? "Резервирай сега" : lang === "ru" ? "Забронировать" : "Book now"}
                      </Link>
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

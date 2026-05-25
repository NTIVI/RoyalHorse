"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"place" | "team" | "horses">("place");

  // Local photos mapped for sections
  const placeImages = [
    "/images/about_place_image_1.jpg",
    "/images/about_place_image_2.jpg",
    "/images/about_place_image_3.jpg",
    "/images/about_place_image_4.jpg",
    "/images/about_place_image_5.jpg",
    "/images/about_place_image_6.jpg",
    "/images/about_place_image_7.jpg",
    "/images/about_place_image_8.jpg",
    "/images/about_place_image_9.jpg",
    "/images/about_place_image_10.jpg",
  ];

  const teamMembers = [
    { nameBg: "Димитър Василев", nameEn: "Dimitar Vasilev", roleBg: "Главен Инструктор", roleEn: "Head Instructor", img: "/images/about_team_image_1.jpg" },
    { nameBg: "Елена Петрова", nameEn: "Elena Petrova", roleBg: "Инструктор по терапевтична езда", roleEn: "Therapeutic Riding Instructor", img: "/images/about_team_image_2.jpg" },
    { nameBg: "Николай Иванов", nameEn: "Nikolay Ivanov", roleBg: "Инструктор & Водач", roleEn: "Instructor & Guide", img: "/images/about_team_image_3.jpg" },
    { nameBg: "Мария Георгиева", nameEn: "Mariya Georgieva", roleBg: "Грижа за конете", roleEn: "Stable Manager", img: "/images/about_team_image_4.jpg" },
  ];

  const horses = [
    { nameBg: "Силвър", nameEn: "Silver", descBg: "Спокоен и величествен сив жребец, идеален за напреднали ездачи.", descEn: "A calm and majestic grey stallion, ideal for advanced riders.", img: "/images/about_horses_image_1.jpg" },
    { nameBg: "Барон", nameEn: "Baron", descBg: "Опитен и кротък кон за обучение на деца и възрастни.", descEn: "Experienced and gentle horse for teaching kids and adults.", img: "/images/about_horses_image_2.jpg" },
    { nameBg: "Карина", nameEn: "Karina", descBg: "Темпераментна и изящна кобила, любимка на спортните ездачи.", descEn: "A spirited and elegant mare, a favorite of sport riders.", img: "/images/about_horses_image_3.jpg" },
    { nameBg: "Звезда", nameEn: "Zvezda", descBg: "Изключително нежна кобила, използвана основно за хипотерапия.", descEn: "An exceptionally gentle mare, used primarily for hippotherapy.", img: "/images/about_horses_image_4.jpg" },
    { nameBg: "Шоколад", nameEn: "Chocolate", descBg: "Очарователно и дружелюбно пони, любимец на най-малките гости.", descEn: "Charming and friendly pony, a favorite of our youngest guests.", img: "/images/about_horses_image_5.jpg" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCFBF9] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4">
              {t[lang].aboutTitle}
            </h1>
            <p className="text-lg text-[#D4AF37] font-serif italic">
              {t[lang].aboutSub}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center border-b border-gray-200 mb-12">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("place")}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all duration-300 ${
                  activeTab === "place"
                    ? "border-[#D4AF37] text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t[lang].tabPlace}
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all duration-300 ${
                  activeTab === "team"
                    ? "border-[#D4AF37] text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t[lang].tabTeam}
              </button>
              <button
                onClick={() => setActiveTab("horses")}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all duration-300 ${
                  activeTab === "horses"
                    ? "border-[#D4AF37] text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t[lang].tabHorses}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in-up">
            {activeTab === "place" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{t[lang].tabPlace}</h2>
                    <p className="text-gray-600 leading-relaxed text-base">{t[lang].placeText1}</p>
                    <p className="text-gray-600 leading-relaxed text-base">{t[lang].placeText2}</p>
                  </div>
                  <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={placeImages[0]}
                      alt="Royal Horse Place"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Photo Grid */}
                <div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-gray-800">
                    {lang === "bg" ? "Снимки от комплекса" : "Photos from the complex"}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {placeImages.slice(1).map((img, index) => (
                      <div key={index} className="aspect-square rounded-2xl overflow-hidden shadow-md group border border-gray-100">
                        <img
                          src={img}
                          alt={`Place ${index + 2}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{t[lang].tabTeam}</h2>
                    <p className="text-gray-600 leading-relaxed text-base">{t[lang].teamText1}</p>
                    <p className="text-gray-600 leading-relaxed text-base">{t[lang].teamText2}</p>
                  </div>
                  <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src="/images/about_place_image_8.jpg"
                      alt="Team Work"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="h-64 overflow-hidden relative">
                        <img
                          src={member.img}
                          alt={lang === "bg" ? member.nameBg : member.nameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h4 className="font-serif text-lg font-bold text-gray-900">
                          {lang === "bg" ? member.nameBg : member.nameEn}
                        </h4>
                        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">
                          {lang === "bg" ? member.roleBg : member.roleEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "horses" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{t[lang].tabHorses}</h2>
                    <p className="text-gray-600 leading-relaxed text-base">{t[lang].horsesText1}</p>
                    <p className="text-gray-600 leading-relaxed text-base">{t[lang].horsesText2}</p>
                  </div>
                  <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={horses[0].img}
                      alt="Noble Horse"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Horses Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
                  {horses.map((horse, index) => (
                    <div key={index} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg flex flex-col hover:shadow-xl transition-all duration-300">
                      <div className="h-56 overflow-hidden">
                        <img
                          src={horse.img}
                          alt={lang === "bg" ? horse.nameBg : horse.nameEn}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6 space-y-2 flex-grow">
                        <h4 className="font-serif text-xl font-bold text-gray-900">
                          {lang === "bg" ? horse.nameBg : horse.nameEn}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {lang === "bg" ? horse.descBg : horse.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

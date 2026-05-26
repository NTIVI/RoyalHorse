"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, translate } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"place" | "team" | "horses">("place");
  const [loading, setLoading] = useState(true);

  // Defaults to fallback lists
  const [placeImages, setPlaceImages] = useState<any[]>([
    { image_url: "/images/about_place_image_1.jpg", title_bg: "Комплексът", title_en: "The Complex", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_2.jpg", title_bg: "Комплексът 2", title_en: "Complex 2", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_3.jpg", title_bg: "Комплексът 3", title_en: "Complex 3", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_4.jpg", title_bg: "Комплексът 4", title_en: "Complex 4", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_5.jpg", title_bg: "Комплексът 5", title_en: "Complex 5", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_6.jpg", title_bg: "Комплексът 6", title_en: "Complex 6", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_7.jpg", title_bg: "Комплексът 7", title_en: "Complex 7", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_8.jpg", title_bg: "Комплексът 8", title_en: "Complex 8", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_9.jpg", title_bg: "Комплексът 9", title_en: "Complex 9", desc_bg: "", desc_en: "" },
    { image_url: "/images/about_place_image_10.jpg", title_bg: "Комплексът 10", title_en: "Complex 10", desc_bg: "", desc_en: "" },
  ]);

  const [teamMembers, setTeamMembers] = useState<any[]>([
    { title_bg: "Димитър Василев", title_en: "Dimitar Vasilev", desc_bg: "Главен Инструктор", desc_en: "Head Instructor", image_url: "/images/about_team_image_1.jpg" },
    { title_bg: "Елена Петрова", title_en: "Elena Petrova", desc_bg: "Инструктор по терапевтична езда", desc_en: "Therapeutic Riding Instructor", image_url: "/images/about_team_image_2.jpg" },
    { title_bg: "Николай Иванов", title_en: "Nikolay Ivanov", desc_bg: "Инструктор & Водач", desc_en: "Instructor & Guide", image_url: "/images/about_team_image_3.jpg" },
    { title_bg: "Мария Георгиева", title_en: "Mariya Georgieva", desc_bg: "Грижа за конете", desc_en: "Stable Manager", image_url: "/images/about_team_image_4.jpg" },
  ]);

  const [horses, setHorses] = useState<any[]>([
    { title_bg: "Силвър", title_en: "Silver", desc_bg: "Спокоен и величествен сив жребец, идеален за напреднали ездачи.", desc_en: "A calm and majestic grey stallion, ideal for advanced riders.", image_url: "/images/about_horses_image_1.jpg" },
    { title_bg: "Барон", title_en: "Baron", desc_bg: "Опитен и кротък кон за обучение на деца и възрастни.", desc_en: "Experienced and gentle horse for teaching kids and adults.", image_url: "/images/about_horses_image_2.jpg" },
    { title_bg: "Карина", title_en: "Karina", desc_bg: "Темпераментна и изящна кобила, любимка на спортните ездачи.", desc_en: "A spirited and elegant mare, a favorite of sport riders.", image_url: "/images/about_horses_image_3.jpg" },
    { title_bg: "Звезда", title_en: "Zvezda", desc_bg: "Изключително нежна кобила, използвана основно за хипотерапия.", desc_en: "An exceptionally gentle mare, used primarily for hippotherapy.", image_url: "/images/about_horses_image_4.jpg" },
    { title_bg: "Шоколад", title_en: "Chocolate", desc_bg: "Очарователно и дружелюбно пони, любимец на най-малките гости.", desc_en: "Charming and friendly pony, a favorite of our youngest guests.", image_url: "/images/about_horses_image_5.jpg" },
  ]);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const place = data.filter((item) => item.category === "about_place");
          const team = data.filter((item) => item.category === "about_team");
          const horseList = data.filter((item) => item.category === "about_horses");

          if (place.length > 0) setPlaceImages(place);
          if (team.length > 0) setTeamMembers(team);
          if (horseList.length > 0) setHorses(horseList);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dynamic content:", err);
        setLoading(false);
      });
  }, []);

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
            <p className="text-lg text-[#F97316] font-serif italic">
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
                    ? "border-[#F97316] text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t[lang].tabPlace}
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all duration-300 ${
                  activeTab === "team"
                    ? "border-[#F97316] text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t[lang].tabTeam}
              </button>
              <button
                onClick={() => setActiveTab("horses")}
                className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all duration-300 ${
                  activeTab === "horses"
                    ? "border-[#F97316] text-gray-900"
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
                    <h2 className="text-3xl font-serif font-bold text-gray-900">
                      {lang === "bg" ? placeImages[0]?.title_bg : lang === "ru" ? translate(placeImages[0]?.title_bg, "ru") : placeImages[0]?.title_en}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {lang === "bg" ? placeImages[0]?.desc_bg || t[lang].placeText1 : lang === "ru" ? translate(placeImages[0]?.desc_bg || t[lang].placeText1, "ru") : placeImages[0]?.desc_en || t[lang].placeText1}
                    </p>
                    {placeImages[1] && (
                      <p className="text-gray-600 leading-relaxed text-base">
                        {lang === "bg" ? placeImages[1]?.desc_bg || t[lang].placeText2 : lang === "ru" ? translate(placeImages[1]?.desc_bg || t[lang].placeText2, "ru") : placeImages[1]?.desc_en || t[lang].placeText2}
                      </p>
                    )}
                  </div>
                  <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={placeImages[0]?.image_url}
                      alt="Royal Horse Place"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Photo Grid */}
                <div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-gray-800">
                    {lang === "bg" ? "Снимки от комплекса" : lang === "ru" ? "Фотографии комплекса" : "Photos from the complex"}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {placeImages.slice(1).map((img, index) => (
                      <div key={index} className="aspect-square rounded-2xl overflow-hidden shadow-md group border border-gray-100">
                        <img
                          src={img.image_url}
                          alt={lang === "bg" ? img.title_bg : lang === "ru" ? translate(img.title_bg, "ru") : img.title_en}
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
                          src={member.image_url}
                          alt={lang === "bg" ? member.title_bg : lang === "ru" ? translate(member.title_bg, "ru") : member.title_en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h4 className="font-serif text-lg font-bold text-gray-900">
                          {lang === "bg" ? member.title_bg : lang === "ru" ? translate(member.title_bg, "ru") : member.title_en}
                        </h4>
                        <p className="text-xs uppercase tracking-widest text-[#F97316] font-semibold mt-1">
                          {lang === "bg" ? member.desc_bg : lang === "ru" ? translate(member.desc_bg, "ru") : member.desc_en}
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
                      src={horses[0]?.image_url}
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
                          src={horse.image_url}
                          alt={lang === "bg" ? horse.title_bg : lang === "ru" ? translate(horse.title_bg, "ru") : horse.title_en}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6 space-y-2 flex-grow">
                        <h4 className="font-serif text-xl font-bold text-gray-900">
                          {lang === "bg" ? horse.title_bg : lang === "ru" ? translate(horse.title_bg, "ru") : horse.title_en}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {lang === "bg" ? horse.desc_bg : lang === "ru" ? translate(horse.desc_bg, "ru") : horse.desc_en}
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

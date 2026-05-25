"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Calendar } from "lucide-react";

export default function NewsPage() {
  const { lang } = useLanguage();

  const newsItems = [
    {
      titleBg: "Успешно участие в турнира по прескачане на препятствия",
      titleEn: "Successful participation in the show jumping tournament",
      date: "12.05.2026",
      img: "/images/news_image_1.jpg",
      textBg: "Нашите състезатели показаха отлична подготовка и грабнаха три златни отличия на регионалния турнир в Южна България. Гордеем се с Вас!",
      textEn: "Our riders demonstrated exceptional performance and won three gold medals at the regional jumping tournament. We are proud of you!"
    },
    {
      titleBg: "Работно време през летния сезон",
      titleEn: "Opening hours for the summer season",
      date: "01.05.2026",
      img: "/images/news_image_2.jpg",
      textBg: "Във връзка с летните горещини и грижата за здравето на конете, преминаваме към двуразово работно време: сутрин от 8:00 до 11:00 и вечер от 17:00 до 21:00 часа.",
      textEn: "Due to the summer heat and for our horses' health, we are transitioning to double shift hours: mornings 8:00 - 11:00 and evenings 17:00 - 21:00."
    },
    {
      titleBg: "Ден на отворените врати в RoyalHorse",
      titleEn: "Open Doors Day at RoyalHorse",
      date: "15.04.2026",
      img: "/images/news_image_3.jpg",
      textBg: "Заповядайте на нашия празник с безплатни разходки с пони за деца, демонстрации по обездка и хранене на животните във фермата. Очакваме Ви!",
      textEn: "Join us for our holiday with free pony rides for children, dressage demonstrations, and animal feeding at the farm. We look forward to seeing you!"
    },
    {
      titleBg: "Нови попълнения в нашия екип",
      titleEn: "New members in our coaching staff",
      date: "10.04.2026",
      img: "/images/news_image_4.jpg",
      textBg: "Радваме се да приветстваме двама нови квалифицирани треньори с богат международен опит в прескачането на препятствия и обездката. Запишете своя час сега!",
      textEn: "We are glad to welcome two new certified instructors with extensive international experience in show jumping and dressage. Book your lesson today!"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCFBF9] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4">
              {lang === "bg" ? "Новини & Събития" : "News & Events"}
            </h1>
            <p className="text-lg text-[#D4AF37] font-serif italic">
              {lang === "bg" ? "Следете последните събития от живота на клуба" : "Follow the latest happenings from the stable life"}
            </p>
          </div>

          {/* News Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Photo */}
                <div className="w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={lang === "bg" ? item.titleBg : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between w-full sm:w-3/5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {lang === "bg" ? item.titleBg : item.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {lang === "bg" ? item.textBg : item.textEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { GraduationCap, Trees, Compass } from "lucide-react";

export default function RidingPage() {
  const { lang } = useLanguage();

  const services = [
    {
      title: t[lang].rideKids,
      desc: t[lang].rideKidsText,
      icon: <GraduationCap className="w-8 h-8 text-[#D4AF37]" />,
      images: [
        "/images/riding_lessons_image_1.jpg",
        "/images/riding_pony_image_1.jpg",
        "/images/riding_pony_image_2.jpg",
        "/images/riding_pony_image_3.jpg",
      ],
      detailsBg: [
        "Обучение на деца над 4 години на пони",
        "Индивидуални тренировки с квалифициран треньор",
        "Специализирана хипотерапия с обучени терапевтични коне",
        "Развитие на баланс, координация и любов към животните",
      ],
      detailsEn: [
        "Pony lessons for children over 4 years old",
        "Private lessons with certified professional coaches",
        "Specialized hippotherapy with trained therapy horses",
        "Develop balance, coordination, and animal connection",
      ],
    },
    {
      title: t[lang].rideAdults,
      desc: t[lang].rideAdultsText,
      icon: <Compass className="w-8 h-8 text-[#D4AF37]" />,
      images: [
        "/images/riding_horse_image_1.jpg",
        "/images/riding_horse_image_2.jpg",
        "/images/riding_horse_image_3.jpg",
        "/images/riding_horse_image_4.jpg",
      ],
      detailsBg: [
        "Обучение за напълно начинаещи и напреднали ездачи",
        "Обиколки в затворен професионален манеж",
        "Усъвършенстване на стойка, управление и тръс/галоп",
        "Подходящо оборудване и защитни каски, включени в цената",
      ],
      detailsEn: [
        "Lessons for complete beginners to advanced riders",
        "Riding sessions inside a closed, professional arena",
        "Improve posture, control, and trot/canter/gallop gait",
        "All safety helmets and protective gear included",
      ],
    },
    {
      title: t[lang].rideExcursions,
      desc: t[lang].rideExcursionsText,
      icon: <Trees className="w-8 h-8 text-[#D4AF37]" />,
      images: [
        "/images/riding_excursions_image_1.jpg",
        "/images/riding_excursions_image_2.jpg",
        "/images/riding_nature_image_1.jpg",
        "/images/riding_nature_image_2.jpg",
      ],
      detailsBg: [
        "Преходи сред девствените пътеки на Странджа планина",
        "Разходки край живописния морски бряг на Ченгене Скеле",
        "Екскурзии и разходки с автентична файтон каруца",
        "Опитен водач, придружаващ групата през целия преход",
      ],
      detailsEn: [
        "Trail riding through pristine paths of Strandzha mountain",
        "Rides along the picturesque sea coast of Chengene Skele",
        "Carriage and wagon excursions for groups or couples",
        "Experienced trail guide accompanying the group at all times",
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCFBF9] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4">
              {t[lang].ridingTitle}
            </h1>
            <p className="text-lg text-[#D4AF37] font-serif italic">
              {t[lang].ridingSub}
            </p>
          </div>

          {/* Service Sections */}
          <div className="space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text Column */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="inline-flex p-3 bg-white border border-[#D4AF37]/20 rounded-2xl shadow-md">
                      {service.icon}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{service.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-base">{service.desc}</p>
                    
                    <ul className="space-y-3 pt-2">
                      {(lang === "bg" ? service.detailsBg : service.detailsEn).map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="text-[#D4AF37] mt-1 font-bold">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Link
                        href={`/contacts?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full transition-all duration-300 border border-transparent shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                      >
                        {lang === "bg" ? "Заяви час за тази услуга" : "Book this service"}
                      </Link>
                    </div>
                  </div>

                  {/* Visual Grid Column */}
                  <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                    {service.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-100 group ${
                          imgIdx === 0
                            ? "col-span-2 aspect-[2/1]"
                            : ""
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${service.title} image ${imgIdx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
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

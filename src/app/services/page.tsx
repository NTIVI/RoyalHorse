"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { Dog, ShieldCheck, Cake, Utensils, Zap, Flame } from "lucide-react";

export default function ServicesPage() {
  const { lang } = useLanguage();

  const services = [
    {
      title: t[lang].servPetHotel,
      desc: t[lang].servPetHotelDesc,
      icon: <Dog className="w-6 h-6 text-[#D4AF37]" />,
      img: "/images/services_pet_hotel_image_3.jpg",
      detailsBg: [
        "Напълно оборудвани самостоятелни къщички с индивидуални дворчета",
        "Всекидневни разходки и игри с аниматори на зелени поляни",
        "Хранене според Вашите изисквания и навици на домашния любимец",
        "Постоянен видео и ветеринарен контрол за безопасност",
      ],
      detailsEn: [
        "Fully equipped private mini-houses with individual backyards",
        "Daily walks and playtime with professional animators in grass fields",
        "Dietary plans matching your feeding preferences and schedule",
        "24/7 video surveillance and professional veterinary control",
      ]
    },
    {
      title: t[lang].servHorseHotel,
      desc: t[lang].servHorseHotelDesc,
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      img: "/images/services_horse_hotel_image_1.jpg",
      detailsBg: [
        "Модерна конюшня с просторни и светли боксове (3x3.5м)",
        "Ежедневно почистване, свежа постеля и качествена храна",
        "Свободна паша в оградени тревни левади (падоци)",
        "Абонаментно почистване, обезпаразитяване и ковашки услуги при нужда",
      ],
      detailsEn: [
        "Modern stables with spacious and clean boxes (3x3.5m)",
        "Daily stall cleaning, fresh bedding, and premium quality feed",
        "Daily turnout in secured grass paddocks for grazing",
        "Comprehensive health tracking, deworming, and farrier services",
      ]
    },
    {
      title: t[lang].servBirthday,
      desc: t[lang].servBirthdayDesc,
      icon: <Cake className="w-6 h-6 text-[#D4AF37]" />,
      img: "/images/services_birthday_image_4.jpg",
      detailsBg: [
        "Езда на пони/коне за рожденика и неговите малки гости",
        "Обезопасена детска площадка, батут и забавления на открито",
        "Разходка с хранене на животните във фермата и зоокъта",
        "Възможност за кетъринг, професионален аниматор и фотограф",
      ],
      detailsEn: [
        "Pony/horse riding for the birthday child and their guests",
        "Fully secured playground, trampoline, and open-air games",
        "Interactive farm animal tour with hand feeding",
        "Optional catering options, children animators, and photographers",
      ]
    },
    {
      title: t[lang].servKitchen,
      desc: t[lang].servKitchenDesc,
      icon: <Utensils className="w-6 h-6 text-[#D4AF37]" />,
      img: "/images/services_restaurant_image_1.jpg",
      detailsBg: [
        "Автентични български ястия и руски специалитети (пельмени, борш)",
        "Използване на свежи продукти от нашата екологична ферма",
        "Уютна закрита зала и просторна лятна градина с барбекю зона",
        "Подходящо място за семейни обеди, фирмени партита и тържества",
      ],
      detailsEn: [
        "Authentic Bulgarian dishes and Russian specialties (pelmeni, borscht)",
        "Fresh ingredients sourced directly from our ecological farm",
        "Cozy indoor dining room and a large summer garden with BBQ zone",
        "Perfect venue for family lunches, corporate events, and parties",
      ]
    },
    {
      title: t[lang].servATV,
      desc: t[lang].servATVDesc,
      icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
      img: "/images/services_atv_image_1.jpg",
      detailsBg: [
        "Модерни 450сс едноместни и двуместни АТВ машини под наем",
        "Опитен водач и инструктаж преди всяко потегляне",
        "Преходи по утвърдени панорамни офроуд маршрути в Странджа",
        "Осигурено предпазно оборудване (каска, очила, боне)",
      ],
      detailsEn: [
        "Modern 450cc single and double ATV vehicles for rent",
        "Experienced trail guide and full safety briefing before start",
        "Scenic off-road routes through panoramic trails of Strandzha",
        "All protective gear provided (helmet, goggles, balaclava)",
      ]
    },
    {
      title: t[lang].servBath,
      desc: t[lang].servBathDesc,
      icon: <Flame className="w-6 h-6 text-[#D4AF37]" />,
      img: "/images/services_sauna_image_1.jpg",
      detailsBg: [
        "Традиционна руска баня на дърва с гореща пара",
        "Използване на брезови и дъбови метлички за масаж",
        "Стая за отдих с чаша билков чай и домашен мед",
        "Ползотворно влияние върху тонуса, кожата и дихателните пътища",
      ],
      detailsEn: [
        "Traditional wood-fired Russian sauna with high wet steam",
        "Use of therapeutic birch and oak twigs (venik) for massage",
        "Relaxation room serving freshly brewed herbal tea and local honey",
        "Boosts blood circulation, purifies skin, and improves respiration",
      ]
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
              {t[lang].servicesTitle}
            </h1>
            <p className="text-lg text-[#D4AF37] font-serif italic">
              {t[lang].servicesSub}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo Header */}
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-[#D4AF37]/15 shadow-md">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">{service.desc}</p>
                  </div>

                  <ul className="space-y-3 flex-grow border-t border-gray-100 pt-6">
                    {(lang === "bg" ? service.detailsBg : service.detailsEn).map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-gray-600">
                        <span className="text-[#D4AF37] font-semibold">•</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      href={`/contacts?service=${encodeURIComponent(service.title)}`}
                      className="block text-center w-full bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-colors duration-300 cursor-pointer"
                    >
                      {lang === "bg" ? "Резервирай сега" : "Book now"}
                    </Link>
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

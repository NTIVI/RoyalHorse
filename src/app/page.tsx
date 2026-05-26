"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import HorseIntro from "./components/HorseIntro";
import Link from "next/link";
import gsap from "gsap";
import Lenis from "lenis";
import { Compass, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function HomeView() {
  const { lang } = useLanguage();
  const [introFinished, setIntroFinished] = useState(false);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleIntroFinished = () => {
    setIntroFinished(true);
    // Animate hero text on enter
    gsap.from(".hero-animate", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.25,
      ease: "power4.out",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF9]">
      {/* 1. INTRO ANIMATION SCREEN */}
      {!introFinished && (
        <HorseIntro lang={lang} onFinished={handleIntroFinished} />
      )}

      {/* Main Page Content (visible after animation starts or finishes) */}
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[85svh] flex items-center bg-[#090807] overflow-hidden">
          {/* Hero background image - made opacity-75 and lighter overlays for great visibility of the horse */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://bipbap.ru/wp-content/uploads/2017/05/1358793764_loshadi-2.jpeg"
              alt="Majestic Horses"
              className="w-full h-full object-cover opacity-90 object-center scale-105 transition-transform duration-10000"
            />
            {/* Soft, warm overlay gradients that keep text highly readable while showing the horse background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#090807]/80 via-[#090807]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090807]/20 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 text-left">
            <div className="max-w-2xl space-y-6">
              <span className="hero-animate inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#F97316] border-l-2 border-[#F97316] pl-3">
                {t[lang].siteTitle}
              </span>
              <h1 className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {t[lang].heroTitle}
              </h1>
              <p className="hero-animate text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-xl">
                {t[lang].heroSubtitle}
              </p>
              
              <div className="hero-animate pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contacts"
                  className="bg-[#F97316] hover:bg-[#FB923C] text-[#090807] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-colors cursor-pointer"
                >
                  {t[lang].heroCTA1}
                </Link>
                <Link
                  href="/services"
                  className="border border-white/20 hover:border-white hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all cursor-pointer"
                >
                  {t[lang].heroCTA2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES / PROMO SECTION */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">
                {lang === "bg" ? "Професионализъм" : lang === "ru" ? "Профессионализм" : "Professionalism"}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {lang === "bg" 
                  ? "Нашите сертифицирани инструктори ще Ви преведат през всяка стъпка на обучението."
                  : lang === "ru"
                    ? "Наши сертифицированные инструкторы проведут вас через каждый этап обучения."
                    : "Our certified instructors guide you through every stage of your riding journey."}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">
                {lang === "bg" ? "Безопасност" : lang === "ru" ? "Безопасность" : "Safety First"}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {lang === "bg" 
                  ? "Разполагаме с най-високо ниво защитна екипировка и напълно спокойни, обучени коне."
                  : lang === "ru"
                    ? "Мы предоставляем защитное снаряжение высочайшего уровня и спокойных, обученных лошадей."
                    : "We provide professional protective equipment and gentle, highly trained horses."}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">
                {lang === "bg" ? "Грижа & Любов" : lang === "ru" ? "Забота & Любовь" : "Care & Passion"}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {lang === "bg" 
                  ? "Хранене, поддръжка и чисти падоци за конете, съчетани с любов към природата."
                  : lang === "ru"
                    ? "Качественное питание, чистые левады и абсолютная преданность заботе о наших лошадях."
                    : "Quality feed, clean paddocks, and absolute devotion to the well-being of our horses."}
              </p>
            </div>
          </div>
        </section>

        {/* PROMO: RIDING & SERVICES SPLIT */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                {lang === "bg" ? "Преживейте магията в RoyalHorse" : lang === "ru" ? "Почувствуйте магию в RoyalHorse" : "Experience the magic at RoyalHorse"}
              </h2>
              <p className="text-sm text-gray-500 font-light">
                {lang === "bg" 
                  ? "Изберете Вашето занимание и се насладете на невероятно време на открито"
                  : lang === "ru"
                    ? "Выберите занятие по душе и наслаждайтесь отличным временем на свежем воздухе"
                    : "Select your activity and enjoy an amazing outdoor adventure"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Riding Promo */}
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/riding_horse_image_2.jpg"
                    alt="Horse riding lessons"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-gray-900">{t[lang].ridingTitle}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {lang === "bg" 
                      ? "Предлагаме професионално обучение за деца и възрастни, разходки сред живописните пътеки на Странджа планина и край морето."
                      : lang === "ru"
                        ? "Мы предлагаем профессиональное обучение детей и взрослых, конные прогулки по живописным тропам Странджи и побережью."
                        : "We offer professional training for kids and adults, along with trail rides through Strandzha mountain and by the sea."}
                  </p>
                  <Link
                    href="/riding"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F97316] hover:text-[#111111] transition-colors"
                  >
                    <span>{lang === "bg" ? "Виж детайли за ездата" : lang === "ru" ? "Подробнее о верховой езде" : "View Riding Details"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Services Promo */}
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src="/images/services_pet_hotel_image_4.jpg"
                    alt="Pet hotel and boarding services"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-gray-900">{t[lang].servicesTitle}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {lang === "bg" 
                      ? "Комплексът включва хотел за кучета и котки, професионален пансион за коне, руска баня на дърва, АТВ под наем и домашна кухня."
                      : lang === "ru"
                        ? "Комплекс включает гостиницу для собак и кошек, профессиональный пансион для лошадей, русскую баню, АТВ и домашнюю кухню."
                        : "Our complex includes a pet hotel for dogs/cats, a horse boarding stable, a wood-fired sauna, ATV rentals, and homemade dining."}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F97316] hover:text-[#111111] transition-colors"
                  >
                    <span>{lang === "bg" ? "Виж всички услуги" : lang === "ru" ? "Все услуги" : "View All Services"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING SECTION ON MAIN PAGE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                {lang === "bg" ? "Заявете Вашето посещение" : lang === "ru" ? "Запланируйте свой визит" : "Book Your Experience"}
              </h2>
              <p className="text-sm text-gray-500 font-light">
                {lang === "bg"
                  ? "Попълнете формата и изберете желаната услуга, за да се свържем с Вас"
                  : lang === "ru"
                    ? "Заполните форму и выберите желаемую услугу, и мы свяжемся с вами"
                    : "Fill out the booking form and select your desired service to get in touch"}
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

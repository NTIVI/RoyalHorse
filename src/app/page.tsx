"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import Link from "next/link";
import gsap from "gsap";
import Lenis from "lenis";
import { Compass, ShieldCheck, Heart, ArrowRight } from "lucide-react";

export default function HomeView() {
  const { lang } = useLanguage();

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

    // Animate hero text on page load
    gsap.from(".hero-animate", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.25,
      ease: "power4.out",
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#E8D1A7]">
      {/* Main Page Content */}
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[85svh] flex items-center bg-[#E8D1A7] overflow-hidden">
          {/* Hero background image - object-contain prevents cropping, mix-blend-multiply blends its background with the section background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <img
              src="/images/horses/bg_hero_horse.jpg"
              alt="Majestic Horse"
              className="w-full h-full object-cover object-right md:object-center opacity-100"
            />
          </div>

          <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8 relative z-10 w-full py-20 text-left">
            <div className="max-w-2xl space-y-6 bg-[#E8D1A7]/30 backdrop-blur-md border border-[#442D1C]/20 rounded-[3rem] p-8 sm:p-12 shadow-2xl">
              <span className="hero-animate inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#84592B] border border-[#84592B]/40 px-5 py-2 rounded-full bg-[#E8D1A7]/20 backdrop-blur-sm">
                {t[lang].siteTitle}
              </span>
              <h1 className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#442D1C] tracking-tight leading-tight drop-shadow-sm">
                {t[lang].heroTitle}
              </h1>
              <p className="hero-animate text-base sm:text-lg text-[#442D1C]/90 font-semibold leading-relaxed max-w-xl">
                {t[lang].heroSubtitle}
              </p>
              
              <div className="hero-animate pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contacts"
                  className="btn-animate bg-[#84592B] hover:bg-[#9D9167] text-[#E8D1A7] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-colors cursor-pointer"
                >
                  {t[lang].heroCTA1}
                </Link>
                <Link
                  href="/services"
                  className="btn-animate border-2 border-[#442D1C]/40 hover:border-[#442D1C] hover:bg-[#442D1C]/10 text-[#442D1C] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all cursor-pointer bg-white/20"
                >
                  {t[lang].heroCTA2}
                </Link>
              </div>
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
                <div className="h-64 sm:h-72 overflow-hidden relative bg-black/5">
                  <img
                    src="/images/horses/promo_riding.png"
                    alt="Horse riding lessons"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
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
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#84592B] hover:text-[#442D1C] transition-colors"
                  >
                    <span>{lang === "bg" ? "Виж детайли за ездата" : lang === "ru" ? "Подробнее о верховой езде" : "View Riding Details"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Services Promo */}
              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="h-64 sm:h-72 overflow-hidden relative bg-black/5">
                  <img
                    src="/images/horses/promo_services.png"
                    alt="Pet hotel and boarding services"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
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
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#84592B] hover:text-[#442D1C] transition-colors"
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

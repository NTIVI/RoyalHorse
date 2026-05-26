"use client";

import React, { Suspense } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

function ContactFormWithParams() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";
  const message = searchParams.get("message") || "";

  return <ContactForm initialService={service} initialMessage={message} />;
}

export default function ContactsPage() {
  const { lang } = useLanguage();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#E8D1A7] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4">
              {t[lang].contactsTitle}
            </h1>
            <p className="text-lg text-[#84592B] font-serif italic">
              {t[lang].contactsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Info Column */}
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Phone */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#84592B]/10 flex items-center justify-center text-[#84592B]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t[lang].cPhone}</h4>
                    <p className="text-base font-semibold text-gray-900">+359 88 591 9788</p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#84592B]/10 flex items-center justify-center text-[#84592B]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t[lang].cEmail}</h4>
                    <p className="text-base font-semibold text-gray-900">office@royalhorse.bg</p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 sm:col-span-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#84592B]/10 flex items-center justify-center text-[#84592B]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t[lang].cLoc}</h4>
                    <p className="text-base font-semibold text-gray-900">
                      {lang === "bg" 
                        ? "гр. Бургас, местност Ченгене Юрт (до Рибарско селище)" 
                        : "Burgas, Chengene Yurt area (near the Fishing Village)"}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 sm:col-span-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#84592B]/10 flex items-center justify-center text-[#84592B]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t[lang].cHours}</h4>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      {t[lang].cHoursText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg h-72 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.007629555198!2d27.525547676741753!3d42.435741679181975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6c6a6784d0097%3A0xe9633e8b4e77cb8a!2sRoyal%20Horse%20Club!5e1!3m2!1sbg!2sbg!4v1716500000000!5m2!1sbg!2sbg"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Royal Horse Google Map"
                />
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:sticky lg:top-28">
              <Suspense fallback={
                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl flex items-center justify-center h-96">
                  <p className="text-gray-400 font-light">Loading form...</p>
                </div>
              }>
                <ContactFormWithParams />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

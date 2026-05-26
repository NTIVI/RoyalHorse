"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ArticlesPage() {
  const { lang } = useLanguage();

  const article = {
    bg: {
      title: "Защо конната езда стана толкова популярна в България?",
      date: "25 Май 2026",
      content: `
        През последните години конната езда в България преживява истински ренесанс. Все повече хора от всички възрасти избират да прекарат почивните си дни не пред екраните, а сред природата, в компанията на тези благородни животни. Но на какво се дължи този нарастващ интерес?

        Първо, това е стремежът към бягство от градския стрес. Ездата предлага уникална комбинация от физическа активност и психологическо разтоварване. Контактът с конете доказано намалява нивата на кортизол и помага при тревожност. 
        
        Второ, България разполага с изключителни природни дадености. Места като планината Странджа, където се намира и нашият комплекс RoyalHorse, предлагат спиращи дъха маршрути. Язденето през вековни гори и открити поляни е преживяване, което трудно може да се сравни с друго.

        Трето, развитието на конната инфраструктура. Бази като нашата инвестират не само в отлични условия за отглеждане на конете, но и в сертифицирани инструктори. Това прави спорта достъпен и безопасен както за деца, така и за напълно начинаещи възрастни. 

        Конната езда вече не се възприема просто като елитен спорт, а като достъпен начин за постигане на хармония между тялото и духа.
      `
    },
    ru: {
      title: "Почему верховая езда стала так популярна в Болгарии?",
      date: "25 Мая 2026",
      content: `
        В последние годы верховая езда в Болгарии переживает настоящий ренессанс. Все больше людей всех возрастов предпочитают проводить выходные не перед экранами, а на природе, в компании этих благородных животных. Но чем вызван этот растущий интерес?

        Во-первых, это стремление избежать городского стресса. Верховая езда предлагает уникальное сочетание физической активности и психологической разгрузки. Доказано, что контакт с лошадьми снижает уровень кортизола и помогает при тревожности.
        
        Во-вторых, Болгария обладает исключительными природными условиями. Такие места, как горы Странджа, где расположен наш комплекс RoyalHorse, предлагают захватывающие дух маршруты. Езда по вековым лесам и открытым полянам — это опыт, который трудно с чем-либо сравнить.

        В-третьих, развитие конной инфраструктуры. Такие базы, как наша, инвестируют не только в отличные условия содержания лошадей, но и в сертифицированных инструкторов. Это делает спорт доступным и безопасным как для детей, так и для абсолютных новичков.

        Верховая езда больше не воспринимается просто как элитный спорт, а как доступный способ достижения гармонии между телом и духом.
      `
    },
    en: {
      title: "Why Has Horse Riding Become So Popular in Bulgaria?",
      date: "May 25, 2026",
      content: `
        In recent years, horse riding in Bulgaria has experienced a true renaissance. More and more people of all ages choose to spend their weekends not in front of screens, but in nature, in the company of these noble animals. But what is driving this growing interest?

        First, it is the desire to escape urban stress. Riding offers a unique combination of physical activity and psychological relief. Contact with horses has been proven to reduce cortisol levels and help with anxiety.
        
        Second, Bulgaria boasts exceptional natural conditions. Places like the Strandzha Mountains, where our RoyalHorse complex is located, offer breathtaking trail routes. Riding through ancient forests and open meadows is an experience that is hard to compare with anything else.

        Third, the development of equestrian infrastructure. Stables like ours invest not only in excellent conditions for horse keeping but also in certified instructors. This makes the sport accessible and safe for both children and complete beginners.

        Horse riding is no longer perceived simply as an elite sport, but as an accessible way to achieve harmony between body and spirit.
      `
    }
  };

  const currentArticle = article[lang as keyof typeof article];

  return (
    <div className="min-h-screen flex flex-col bg-[#E8D1A7]">
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 animate-fade-in-up">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#442D1C] mb-4">
              {currentArticle.title}
            </h1>
            <p className="text-sm text-[#84592B] font-semibold tracking-wider uppercase">
              {currentArticle.date}
            </p>
          </div>
          
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img 
              src="/images/horses/horse_2.jpg" 
              alt="Horse riding in nature" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
            {currentArticle.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

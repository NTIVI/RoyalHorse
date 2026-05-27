"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Clock, User, Share2 } from "lucide-react";

export default function ArticlesPage() {
  const { lang } = useLanguage();

  const article = {
    bg: {
      title: "Защо конната езда стана толкова популярна в България?",
      date: "25 Май 2026",
      author: "Редакция RoyalHorse",
      readTime: "4 мин. четене",
      content: `През последните години конната езда в България преживява истински ренесанс. Все повече хора от всички възрасти избират да прекарат почивните си дни не пред екраните, а сред природата, в компанията на тези благородни животни. Но на какво се дължи този нарастващ интерес?

Първо, това е стремежът към бягство от градския стрес. Ездата предлага уникална комбинация от физическа активност и психологическо разтоварване. Контактът с конете доказано намалява нивата на кортизол и помага при тревожност. 

Второ, България разполага с изключителни природни дадености. Места като планината Странджа, където се намира и нашият комплекс RoyalHorse, предлагат спиращи дъха маршрути. Язденето през вековни гори и открити поляни е преживяване, което трудно може да се сравни с друго.

Трето, развитието на конната инфраструктура. Бази като нашата инвестират не само в отлични условия за отглеждане на конете, но и в сертифицирани инструктори. Това прави спорта достъпен и безопасен както за деца, така и за напълно начинаещи възрастни. 

Конната езда вече не се възприема просто като елитен спорт, а като достъпен начин за постигане на хармония между тялото и духа.`
    },
    ru: {
      title: "Почему верховая езда стала так популярна в Болгарии?",
      date: "25 Мая 2026",
      author: "Редакция RoyalHorse",
      readTime: "4 мин. чтения",
      content: `В последние годы верховая езда в Болгарии переживает настоящий ренессанс. Все больше людей всех возрастов предпочитают проводить выходные не перед экранами, а на природе, в компании этих благородных животных. Но чем вызван этот растущий интерес?

Во-первых, это стремление избежать городского стресса. Верховая езда предлагает уникальное сочетание физической активности и психологической разгрузки. Доказано, что контакт с лошадьми снижает уровень кортизола и помогает при тревожности.

Во-вторых, Болгария обладает исключительными природными условиями. Такие места, как горы Странджа, где расположен наш комплекс RoyalHorse, предлагают захватывающие дух маршруты. Езда по вековым лесам и открытым полянам — это опыт, который трудно с чем-либо сравнить.

В-третьих, развитие конной инфраструктуры. Такие базы, как наша, инвестируют не только в отличные условия содержания лошадей, но и в сертифицированных инструкторов. Это делает спорт доступным и безопасным как для детей, так и для абсолютных новичков.

Верховая езда больше не воспринимается просто как элитный спорт, а как доступный способ достижения гармонии между телом и духом.`
    },
    en: {
      title: "Why Has Horse Riding Become So Popular in Bulgaria?",
      date: "May 25, 2026",
      author: "RoyalHorse Editorial",
      readTime: "4 min read",
      content: `In recent years, horse riding in Bulgaria has experienced a true renaissance. More and more people of all ages choose to spend their weekends not in front of screens, but in nature, in the company of these noble animals. But what is driving this growing interest?

First, it is the desire to escape urban stress. Riding offers a unique combination of physical activity and psychological relief. Contact with horses has been proven to reduce cortisol levels and help with anxiety.

Second, Bulgaria boasts exceptional natural conditions. Places like the Strandzha Mountains, where our RoyalHorse complex is located, offer breathtaking trail routes. Riding through ancient forests and open meadows is an experience that is hard to compare with anything else.

Third, the development of equestrian infrastructure. Stables like ours invest not only in excellent conditions for horse keeping but also in certified instructors. This makes the sport accessible and safe for both children and complete beginners.

Horse riding is no longer perceived simply as an elite sport, but as an accessible way to achieve harmony between body and spirit.`
    }
  };

  const currentArticle = article[lang as keyof typeof article];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE9]">
      <Header />
      
      {/* Article Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 lg:p-20 shadow-xl border border-gray-100">
          
          {/* Article Header Inside Block */}
          <div className="text-center mb-16 border-b border-gray-100 pb-12">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#84592B] mb-6 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {currentArticle.readTime}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {currentArticle.author}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#442D1C] mb-6 leading-tight">
              {currentArticle.title}
            </h1>
            <p className="text-gray-400 tracking-widest uppercase text-xs font-bold">
              {currentArticle.date}
            </p>
          </div>

          <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 space-y-8 leading-loose font-serif">
            {currentArticle.content.split('\n\n').map((paragraph, idx) => {
              const p = paragraph.trim();
              if (!p) return null;
              
              {/* Drop cap for first paragraph */}
              if (idx === 0) {
                return (
                  <p key={idx} className="first-letter:text-7xl first-letter:font-bold first-letter:text-[#84592B] first-letter:mr-4 first-letter:float-left first-line:uppercase tracking-wide text-gray-900">
                    {p}
                  </p>
                );
              }
              
              {/* Pull quote for 3rd paragraph */}
              if (idx === 2) {
                return (
                  <blockquote key={idx} className="border-l-4 border-[#84592B] pl-8 my-14 italic text-lg md:text-xl text-[#442D1C] font-medium bg-gradient-to-r from-[#E8D1A7]/30 to-transparent p-8 rounded-r-3xl">
                    &ldquo;{p}&rdquo;
                  </blockquote>
                );
              }

              return <p key={idx} className="text-gray-700 tracking-wide">{p}</p>;
            })}
          </div>

          {/* Social Share / Footer of Article */}
          <div className="mt-16 pt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="/images/horse_logo.png" 
                alt="Author" 
                className="w-12 h-12 object-contain" 
              />
              <div>
                <p className="font-bold text-[#442D1C] font-serif">{currentArticle.author}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">RoyalHorse Club</p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E8D1A7]/50 hover:bg-[#84592B] text-[#442D1C] hover:text-white transition-all font-semibold text-xs uppercase tracking-widest">
              <Share2 className="w-4 h-4" />
              {lang === 'bg' ? 'Сподели' : lang === 'ru' ? 'Поделиться' : 'Share'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

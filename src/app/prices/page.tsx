"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, pricingList } from "@/lib/translations";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { Calculator, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  nameBg: string;
  nameEn: string;
  nameRu?: string;
  price: number;
  qty: number;
}

export default function PricesPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"riding" | "services" | "tours">("riding");
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAdd = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: item.id, nameBg: item.nameBg, nameEn: item.nameEn, nameRu: item.nameRu, price: item.price, qty: 1 }];
    });
  };

  const handleRemove = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const handleClear = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleBook = () => {
    if (cart.length === 0) return;
    
    // Generate inquiry text description based on selected items
    const selectedList = cart
      .map((item) => `${lang === "bg" ? item.nameBg : lang === "ru" ? item.nameRu || item.nameBg : item.nameEn} x${item.qty} (${item.price * item.qty}€)`)
      .join(", ");
    
    const message = lang === "bg" 
      ? `Здравейте, бих искал да направя резервация за следните избрани услуги: ${selectedList}. Обща прогнозна цена: ${getTotalPrice()} евро.`
      : lang === "ru"
        ? `Здравствуйте, я хотел бы сделать заказ на следующие выбранные услуги: ${selectedList}. Общая ориентировочная стоимость: ${getTotalPrice()} евро.`
        : `Hello, I'd like to book the following selected services: ${selectedList}. Estimated total price: ${getTotalPrice()} EUR.`;

    // Redirect to contact form with prepopulated services
    const query = new URLSearchParams({
      service: lang === "bg" ? "Избрани от калкулатора услуги" : lang === "ru" ? "Выбранные из калькулятора услуги" : "Selected Calculator Services",
      message: message
    });
    router.push(`/contacts?${query.toString()}`);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FCFBF9] text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4">
              {t[lang].pricesTitle}
            </h1>
            <p className="text-lg text-[#D4AF37] font-serif italic">
              {t[lang].pricesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Calculator Catalog Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Category tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("riding")}
                  className={`pb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 px-4 transition-all duration-300 ${
                    activeTab === "riding"
                      ? "border-[#D4AF37] text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {t[lang].calcCatRiding}
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className={`pb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 px-4 transition-all duration-300 ${
                    activeTab === "services"
                      ? "border-[#D4AF37] text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {t[lang].calcCatServices}
                </button>
                <button
                  onClick={() => setActiveTab("tours")}
                  className={`pb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 px-4 transition-all duration-300 ${
                    activeTab === "tours"
                      ? "border-[#D4AF37] text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {t[lang].calcCatATV}
                </button>
              </div>

              {/* Catalog Items */}
              <div className="space-y-4">
                {pricingList[activeTab].map((item) => {
                  const cartItem = cart.find((i) => i.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between gap-6 hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                          {lang === "bg" ? item.nameBg : lang === "ru" ? item.nameRu : item.nameEn}
                        </h4>
                        <p className="text-xs text-[#D4AF37] font-semibold">
                          {item.price} € / {lang === "bg" ? item.unitBg : lang === "ru" ? item.unitRu : item.unitEn}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {cartItem && (
                          <>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-sm w-4 text-center">{cartItem.qty}</span>
                          </>
                        )}
                        <button
                          onClick={() => handleAdd(item)}
                          className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Calculator Widget Column */}
            <div className="bg-white border border-[#D4AF37]/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <Calculator className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].calcSelected}</h3>
              </div>

              {cart.length === 0 ? (
                <p className="text-sm text-gray-400 font-light leading-relaxed py-6 text-center">
                  {t[lang].calcEmpty}
                </p>
              ) : (
                <>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-4 text-sm">
                        <div className="space-y-0.5">
                          <p className="font-medium text-gray-800 leading-tight">
                            {lang === "bg" ? item.nameBg : lang === "ru" ? item.nameRu : item.nameEn}
                          </p>
                          <p className="text-xs text-gray-400 font-light">
                            {item.qty} x {item.price}€
                          </p>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-gray-900 shrink-0">
                          <span>{item.price * item.qty}€</span>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-6 space-y-4">
                    <div className="flex justify-between text-base font-bold text-gray-900">
                      <span>{t[lang].calcTotal}</span>
                      <span className="text-xl text-[#D4AF37]">{getTotalPrice()} €</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2.5">
                      <button
                        onClick={handleClear}
                        className="col-span-1 border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-xl flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                        title="Clear quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleBook}
                        className="col-span-4 bg-[#111111] hover:bg-[#D4AF37] hover:text-black text-white font-semibold text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-colors duration-300 text-center cursor-pointer"
                      >
                        {t[lang].calcBookNow}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

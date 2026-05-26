"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { t, formServicesList } from "@/lib/translations";
import { CheckCircle2, RefreshCw } from "lucide-react";

interface ContactFormProps {
  initialMessage?: string;
  initialService?: string;
}

export default function ContactForm({ initialMessage = "", initialService = "" }: ContactFormProps) {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "", service: "" });
  const [formErrors, setFormErrors] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^\d+]/g, "");
    
    if (input.startsWith("0")) {
      input = "+359 " + input.substring(1);
    }
    
    if (input.startsWith("+359")) {
      const rest = input.substring(4).replace(/\s/g, "");
      let formatted = "+359";
      if (rest.length > 0) formatted += " " + rest.substring(0, 2);
      if (rest.length > 2) formatted += " " + rest.substring(2, 5);
      if (rest.length > 5) formatted += " " + rest.substring(5, 9);
      input = formatted.trim();
    }
    setFormData({ ...formData, phone: input });
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", phone: "", email: "" };

    if (!formData.name.trim()) {
      errors.name = lang === "bg" ? "Името е задължително" : lang === "ru" ? "Имя обязательно для заполнения" : "Name is required";
      valid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = lang === "bg" ? "Имейлът е задължителен" : lang === "ru" ? "Email обязателен для заполнения" : "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = lang === "bg" ? "Невалиден имейл формат" : lang === "ru" ? "Неверный формат email" : "Invalid email format";
      valid = false;
    }

    const phoneDigits = formData.phone.replace(/\s/g, "");
    if (!formData.phone.trim()) {
      errors.phone = lang === "bg" ? "Телефонът е задължителен" : lang === "ru" ? "Телефон обязателен для заполнения" : "Phone is required";
      valid = false;
    } else if (phoneDigits.length < 8) {
      errors.phone = lang === "bg" ? "Невалиден телефонен номер" : lang === "ru" ? "Неверный номер телефона" : "Invalid phone number";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "", service: "" });
        setTimeout(() => setSubmitSuccess(false), 8000);
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#E8D1A7] to-white border border-[#84592B]/15 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/5 to-transparent rounded-full filter blur-2xl pointer-events-none" />

      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 tracking-wide relative z-10">{t[lang].formTitle}</h3>
      
      {submitSuccess ? (
        <div className="bg-emerald-50/50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl flex items-start gap-4 animate-fade-in-up relative z-10">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed font-semibold">{t[lang].formSuccess}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {t[lang].formName} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-[#E8D1A7] border rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300 ${
                  formErrors.name ? "border-red-400" : "border-gray-200"
                }`}
                placeholder={lang === "bg" ? "Иван Петров" : lang === "ru" ? "Иван Петров" : "John Doe"}
              />
              {formErrors.name && (
                <span className="text-xs text-red-500 mt-1 block">{formErrors.name}</span>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {t[lang].formPhone} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`w-full bg-[#E8D1A7] border rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300 ${
                  formErrors.phone ? "border-red-400" : "border-gray-200"
                }`}
                placeholder="+359 88 591 9788"
              />
              {formErrors.phone && (
                <span className="text-xs text-red-500 mt-1 block">{formErrors.phone}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {t[lang].formEmail} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-[#E8D1A7] border rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300 ${
                  formErrors.email ? "border-red-400" : "border-gray-200"
                }`}
                placeholder="example@mail.com"
              />
              {formErrors.email && (
                <span className="text-xs text-red-500 mt-1 block">{formErrors.email}</span>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {t[lang].formService}
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#E8D1A7] border border-gray-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300"
              >
                <option value="">{t[lang].formServicePlaceholder}</option>
                {formServicesList.map((srv) => (
                  <option key={srv.id} value={lang === "bg" ? srv.bg : lang === "ru" ? srv.ru : srv.en}>
                    {lang === "bg" ? srv.bg : lang === "ru" ? srv.ru : srv.en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              {t[lang].formMsg}
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#E8D1A7] border border-gray-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-300"
              placeholder="..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#442D1C] hover:bg-gradient-to-r hover:from-gold-dark hover:via-gold hover:to-gold-light hover:text-[#442D1C] text-white font-semibold text-xs uppercase tracking-widest py-4.5 rounded-xl shadow-lg transition-all duration-500 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
            ) : (
              <span>{t[lang].formSubmit}</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

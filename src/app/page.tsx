"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Compass, 
  Award, 
  Heart, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Calendar,
  DollarSign,
  Maximize2,
  X,
  Menu,
  CheckCircle2,
  Users,
  Utensils,
  Flame,
  Gift,
  Home,
  Check,
  RefreshCw
} from "lucide-react";
import gsap from "gsap";
import Lenis from "lenis";

// Type definitions
type Lang = "bg" | "en";

export default function HomeView() {
  const [lang, setLang] = useState<Lang>("bg");
  const [introFinished, setIntroFinished] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState<"place" | "team" | "horses">("place");
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Quote Planner State
  const [selectedCategory, setSelectedCategory] = useState<"riding" | "services" | "tours">("riding");
  const [quoteItems, setQuoteItems] = useState<{ [key: string]: number }>({});
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for animations
  const introRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const logoTextRef = useRef<HTMLHeadingElement>(null);

  // Dictionary translations
  const t = {
    bg: {
      siteTitle: "RoyalHorse Club",
      tagline: "Конна База Бургас",
      navAbout: "За Нас",
      navRiding: "Конна Езда",
      navServices: "Услуги",
      navPrices: "Цени",
      navGallery: "Галерия",
      navContacts: "Контакти",
      navBookBtn: "Заяви Час",
      
      heroTitle: "Елегантност и сила сред природата",
      heroSubtitle: "Елитен конно-спортен комплекс в полите на Странджа планина, само на 10 км от Бургас. Изпитайте свободата на конната езда.",
      heroCTA1: "Резервирай урок",
      heroCTA2: "Виж услугите",
      
      aboutTitle: "За RoyalHorse",
      aboutSub: "Открийте нашето кътче за спорт и релакс",
      tabPlace: "Мястото",
      tabTeam: "Кои сме ние",
      tabHorses: "Нашите коне",
      
      placeText1: "Разположен в полите на Странджанския балкан, в местността Ченгене Юрт (Ченгене Скеле), Royal Horse Club се намира близо до морския бряг, само на десет километра от град Бургас.",
      placeText2: "Базата е разположена върху площ от 25 декара и разполага с няколко професионално подготвени плаца, собствена зооградина (токачки, френски гълъби, зайци и редки породи петли) и детска площадка. Предлагаме отлични условия за езда, почивка и забавление за цялото семейство.",
      
      teamText1: "Нашият екип се състои от лицензирани и опитни инструктори, които обичат работата си и се грижат за Вашата безопасност и правилно обучение.",
      teamText2: "Независимо дали сте напълно начинаещ, или опитен ездач, нашите треньори ще Ви предложат персонализирана програма за усъвършенстване на Вашите умения.",
      
      horsesText1: "В Royal Horse Club се грижим за 11 расови коня и понита. Всички животни се отглеждат в отлични, природосъобразни условия, с ежедневни разходки и специализиран хранителен режим.",
      horsesText2: "Нашите коне са спокойни, добре обучени и свикнали с хора, което ги прави идеални партньори както за терапевтични сесии, така и за спортни занимания.",
      
      ridingTitle: "Конна Езда",
      ridingSub: "Обучение и разходки за всички възрасти",
      rideKids: "Езда за деца",
      rideKidsText: "Обиколки на пони, индивидуални уроци и специализирана хипотерапия с инструктори за деца до 12 години.",
      rideAdults: "Езда за възрастни",
      rideAdultsText: "Професионални тренировки в манеж, свободни разходки сред природата на Странджа и подготовка за напреднали.",
      rideExcursions: "Горски разходки",
      rideExcursionsText: "Разходки на кон сред живописните пътеки на Странджа планина и край морския бряг за невероятни емоции.",
      
      servicesTitle: "Нашите Услуги",
      servicesSub: "Повече от конна база - пълен комплекс за почивка",
      servPetHotel: "Хотел за любимци",
      servPetHotelDesc: "Професионални грижи за Вашите кучета (до 15 кг) и котки по време на Вашето отсъствие.",
      servHorseHotel: "Хотел за коне",
      servHorseHotelDesc: "Пансион за коне с включена ежедневна грижа, чистене на боксове, паша и хранене.",
      servBirthday: "Детски рождени дни",
      servBirthdayDesc: "Незабравими празници на открито с езда, батут, детска площадка и разходка във фермата.",
      servKitchen: "Домашна кухня",
      servKitchenDesc: "Нашият уютен ресторант предлага вкусна българска и руска кухня, приготвена с домашни продукти.",
      servATV: "АТВ Разходки",
      servATVDesc: "Вълнуващи турове с едноместни и двуместни АТВ-та (450cc) в района на Странджа.",
      servBath: "Руска баня",
      servBathDesc: "Автентична руска баня на дърва за пълно отпускане и детоксикация на тялото.",
      
      pricesTitle: "Ценоразпис & Калкулатор",
      pricesSub: "Планирайте Вашето посещение и изчислете цената",
      calcCatRiding: "Конна езда",
      calcCatServices: "Услуги & Наеми",
      calcCatATV: "АТВ Разходки",
      calcSelected: "Избрани услуги",
      calcTotal: "Обща сума",
      calcBookNow: "Заяви Избраното",
      calcEmpty: "Не сте избрали услуги. Кликнете на бутоните, за да добавите.",
      
      galleryTitle: "Галерия",
      gallerySub: "Уловете духа и атмосферата на RoyalHorse",
      filterAll: "Всички",
      filterOpening: "Откриване",
      filterDoors: "Отворени врати",
      filterFarm: "Фермата",
      filterBirthdays: "Рождени дни",
      filterPhotoshoots: "Фотосесии",
      
      contactsTitle: "Контакти",
      contactsSub: "Свържете се с нас или ни посетете на място",
      cPhone: "Телефон за връзка",
      cLoc: "Нашата локация",
      cHours: "Работно време (Лято)",
      cHoursText: "Всеки ден: 8:00 - 11:00 и 17:00 - 21:00 (с грижа за конете в жегите)",
      cEmail: "Имейл адрес",
      cMapBtn: "Виж в Google Maps",
      
      formTitle: "Направи Запитване",
      formName: "Вашето име",
      formPhone: "Телефонен номер",
      formEmail: "Електронна поща (Email)",
      formMsg: "Допълнителна информация (желана дата/час/услуга)",
      formSubmit: "Изпрати Заявка",
      formSuccess: "Благодарим Ви! Вашата заявка е приета успешно. Ще се свържем с Вас съвсем скоро!",
      
      footerText: "Езда град Бургас, местност Ченгене Скеле до Рибарско селище. Всички права запазени."
    },
    en: {
      siteTitle: "RoyalHorse Club",
      tagline: "Equestrian Club Burgas",
      navAbout: "About Us",
      navRiding: "Horse Riding",
      navServices: "Services",
      navPrices: "Prices",
      navGallery: "Gallery",
      navContacts: "Contacts",
      navBookBtn: "Book Now",
      
      heroTitle: "Elegance and power in nature",
      heroSubtitle: "An elite equestrian complex at the foot of the Strandzha Mountain, just 10 km from Burgas. Experience the true freedom of riding.",
      heroCTA1: "Book a Lesson",
      heroCTA2: "View Services",
      
      aboutTitle: "About RoyalHorse",
      aboutSub: "Discover our haven for sports and relaxation",
      tabPlace: "The Place",
      tabTeam: "Who We Are",
      tabHorses: "Our Horses",
      
      placeText1: "Located in the foothills of the Strandzha Balkan, in the area of Chengene Yurt (Chengene Skele), Royal Horse Club is situated close to the sea, just 10 kilometers south of Burgas.",
      placeText2: "The base extends over an area of 25 decares, featuring several professionally prepared arenas, its own mini-zoo (guinea fowls, French pigeons, rabbits, and rare rooster breeds), and a children's playground. We offer excellent conditions for riding, resting, and family fun.",
      
      teamText1: "Our team consists of licensed and experienced instructors who love their work and prioritize your safety and correct training.",
      teamText2: "Whether you are a complete beginner or an advanced rider, our coaches will create a personalized program to enhance your equestrian skills.",
      
      horsesText1: "At Royal Horse Club, we take care of 11 pedigree horses and ponies. All animals are raised in excellent, natural conditions, with daily grazing and specialized diets.",
      horsesText2: "Our horses are calm, well-trained, and accustomed to people, making them perfect partners for both therapeutic sessions and sport training.",
      
      ridingTitle: "Horse Riding",
      ridingSub: "Lessons and trail rides for all ages",
      rideKids: "Riding for Children",
      rideKidsText: "Pony arena laps, individual lessons, and specialized hippotherapy with certified instructors for kids under 12.",
      rideAdults: "Riding for Adults",
      rideAdultsText: "Professional training in the arena, forest trail rides through Strandzha, and advanced equestrian training.",
      rideExcursions: "Nature Walks",
      rideExcursionsText: "Horseback trail riding through scenic paths of Strandzha mountain and along the sea coast for unforgettable memories.",
      
      servicesTitle: "Our Services",
      servicesSub: "More than a stable - a complete leisure destination",
      servPetHotel: "Pet Hotel",
      servPetHotelDesc: "Professional daily care for your dogs (up to 15 kg) and cats while you are away from home.",
      servHorseHotel: "Horse Boarding",
      servHorseHotelDesc: "Pedigree horse pension including daily turnout, stall cleaning, quality feed, and expert care.",
      servBirthday: "Kids Birthdays",
      servBirthdayDesc: "Unforgettable outdoor parties with horse riding, trampolines, a playground, and zoo tours.",
      servKitchen: "Homemade Dining",
      servKitchenDesc: "Our cozy restaurant serves delicious Bulgarian and Russian homemade dishes prepared from local products.",
      servATV: "ATV Tours",
      servATVDesc: "Thrilling off-road tours on single and double ATVs (450cc) around the Strandzha area.",
      servBath: "Russian Bath",
      servBathDesc: "Authentic wood-fired Russian sauna for complete relaxation, body warming, and detoxification.",
      
      pricesTitle: "Price List & Calculator",
      pricesSub: "Plan your visit and calculate the estimated cost",
      calcCatRiding: "Horse Riding",
      calcCatServices: "Services & Rentals",
      calcCatATV: "ATV Riding",
      calcSelected: "Selected services",
      calcTotal: "Total price",
      calcBookNow: "Request Selection",
      calcEmpty: "No services selected. Click the buttons above to add services to your quote.",
      
      galleryTitle: "Gallery",
      gallerySub: "Capture the spirit and atmosphere of RoyalHorse",
      filterAll: "All",
      filterOpening: "Grand Opening",
      filterDoors: "Open Doors",
      filterFarm: "The Farm",
      filterBirthdays: "Birthdays",
      filterPhotoshoots: "Photoshoots",
      
      contactsTitle: "Contacts",
      contactsSub: "Get in touch with us or visit us in person",
      cPhone: "Phone number",
      cLoc: "Our Location",
      cHours: "Opening Hours (Summer)",
      cHoursText: "Every day: 8:00 - 11:00 and 17:00 - 21:00 (adjusted for the horses' welfare during heat)",
      cEmail: "Email address",
      cMapBtn: "Open in Google Maps",
      
      formTitle: "Make an Inquiry",
      formName: "Your name",
      formPhone: "Phone number",
      formEmail: "Email address",
      formMsg: "Additional details (preferred date/time/selected services)",
      formSubmit: "Send Request",
      formSuccess: "Thank you! Your request has been successfully submitted. We will contact you very soon!",
      
      footerText: "Horse riding Burgas, Chengene Skele area next to the Fishing Village. All rights reserved."
    }
  };

  // Pricing Data (value in Euro)
  const pricingList = {
    riding: [
      { id: "kid_lap", nameBg: "Обиколка в манеж на пони/кон (деца)", nameEn: "Pony/horse arena lap (kids)", price: 4, unitBg: "обиколка", unitEn: "lap" },
      { id: "kid_lesson", nameBg: "Урок по езда с инструктор (деца, 40 мин)", nameEn: "Riding lesson with instructor (kids, 40m)", price: 30, unitBg: "урок", unitEn: "lesson" },
      { id: "hippo_1", nameBg: "Хипотерапия с 1 инструктор (30 мин)", nameEn: "Hippotherapy with 1 instructor (30m)", price: 25, unitBg: "сесия", unitEn: "session" },
      { id: "hippo_2", nameBg: "Хипотерапия с 2 инструктори (30 мин)", nameEn: "Hippotherapy with 2 instructors (30m)", price: 30, unitBg: "сесия", unitEn: "session" },
      { id: "adult_lap", nameBg: "Обиколка в манеж на кон (възрастни)", nameEn: "Horse arena lap (adults)", price: 4, unitBg: "обиколка", unitEn: "lap" },
      { id: "adult_walk", nameBg: "Разходка с кон в природата (30 мин)", nameEn: "Horse trail ride in nature (30m)", price: 20, unitBg: "разходка", unitEn: "ride" },
      { id: "adult_lesson", nameBg: "Урок по езда с инструктор (възрастни, 40 мин)", nameEn: "Riding lesson with instructor (adults, 40m)", price: 35, unitBg: "урок", unitEn: "lesson" },
    ],
    services: [
      { id: "bbq", nameBg: "Наем на барбекю зона (10:00 - 17:00)", nameEn: "BBQ area rental (10:00 - 17:00)", price: 30, unitBg: "ден", unitEn: "day" },
      { id: "photoshoot", nameBg: "Фотосесия с кон (наем на кон + инструктор)", nameEn: "Photoshoot with horse (horse rental + guide)", price: 35, unitBg: "час", unitEn: "hour" },
      { id: "pet_dog", nameBg: "Хотел за домашни любимци (куче до 15 кг)", nameEn: "Pet hotel (dog up to 15 kg)", price: 20, unitBg: "ден", unitEn: "day" },
      { id: "pet_cat", nameBg: "Хотел за домашни любимци (котка)", nameEn: "Pet hotel (cat)", price: 10, unitBg: "ден", unitEn: "day" },
      { id: "farm_tour", nameBg: "Екскурзия във фермата с хранене на животни", nameEn: "Farm tour with animal feeding", price: 3, unitBg: "човек", unitEn: "person" },
      { id: "archery", nameBg: "Стрелба с лък или пушка (10 изстрела)", nameEn: "Archery or rifle shooting (10 shots)", price: 4, unitBg: "сесия", unitEn: "session" },
    ],
    tours: [
      { id: "atv_1h_single", nameBg: "1 час АТВ тур (Едноместно)", nameEn: "1 hour ATV tour (Single rider)", price: 50, unitBg: "АТВ", unitEn: "ATV" },
      { id: "atv_1h_double", nameBg: "1 час АТВ тур (Двуместно)", nameEn: "1 hour ATV tour (Double riders)", price: 80, unitBg: "АТВ", unitEn: "ATV" },
      { id: "atv_30m_single", nameBg: "30 мин АТВ тур (Едноместно)", nameEn: "30 min ATV tour (Single rider)", price: 30, unitBg: "АТВ", unitEn: "ATV" },
      { id: "atv_30m_double", nameBg: "30 мин АТВ тур (Двуместно)", nameEn: "30 min ATV tour (Double riders)", price: 50, unitBg: "АТВ", unitEn: "ATV" },
    ]
  };

  // Gallery items with descriptions and Unsplash URLs
  const galleryItems = [
    { id: 1, filter: "opening", titleBg: "Официално откриване", titleEn: "Official Grand Opening", url: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=800" },
    { id: 2, filter: "doors", titleBg: "Ден на отворените врати", titleEn: "Open Doors Day", url: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=800" },
    { id: 3, filter: "farm", titleBg: "Разходка във фермата", titleEn: "Mini-zoo and Farm", url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800" },
    { id: 4, filter: "birthdays", titleBg: "Детски рожден ден на открито", titleEn: "Kids Birthday Party", url: "https://images.unsplash.com/photo-1530101121893-8072750bb7f9?auto=format&fit=crop&q=80&w=800" },
    { id: 5, filter: "photoshoots", titleBg: "Сватбена фотосесия с коне", titleEn: "Wedding Photoshoot", url: "https://images.unsplash.com/photo-1498603993951-8a027a8a8f84?auto=format&fit=crop&q=80&w=800" },
    { id: 6, filter: "photoshoots", titleBg: "Фотосесия в стил Уестърн", titleEn: "Western Style Photoshoot", url: "https://images.unsplash.com/photo-1507504038482-76210f8ecbd6?auto=format&fit=crop&q=80&w=800" },
    { id: 7, filter: "opening", titleBg: "Красиви пасища", titleEn: "Beautiful pastures", url: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800" },
    { id: 8, filter: "doors", titleBg: "Тренировка в манежа", titleEn: "Arena Training Lesson", url: "https://images.unsplash.com/photo-1518467166076-74fc775260a8?auto=format&fit=crop&q=80&w=800" },
    { id: 9, filter: "farm", titleBg: "Обитатели на нашата зооградина", titleEn: "Mini-Zoo Rabbits", url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800" },
  ];

  // Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    // Only init Lenis after intro is done
    if (!introFinished) {
      // Check if user already saw the intro in this session
      const hasSeenIntro = sessionStorage.getItem("royal_horse_intro_seen");
      if (hasSeenIntro) {
        setIntroFinished(true);
      }
      return;
    }

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
  }, [introFinished]);

  // Intro Animation trigger
  useEffect(() => {
    if (introFinished) return;

    // GSAP Intro Sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the overlay
        gsap.to(introRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            setIntroFinished(true);
            sessionStorage.setItem("royal_horse_intro_seen", "true");
          }
        });
      }
    });

    // 1. Video fades in and plays
    tl.to(introVideoRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
    });

    // 2. Play video, wait for horse to 'stop' (simulated by sequence timing)
    tl.to({}, { duration: 2.5 }); // Wait 2.5 seconds of horse running

    // 3. Logo text appears with blur and fade-in
    tl.fromTo(
      logoTextRef.current,
      { opacity: 0, filter: "blur(20px)", scale: 0.85 },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "back.out(1.5)" }
    );

    // 4. Hold the screen for a moment
    tl.to({}, { duration: 1.5 });

  }, [introFinished]);

  // Skip Intro Handler
  const skipIntro = () => {
    if (introRef.current) {
      gsap.to(introRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setIntroFinished(true);
          sessionStorage.setItem("royal_horse_intro_seen", "true");
        }
      });
    }
  };

  // Custom phone number formatting / masking
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^\d+]/g, ""); // Keep digits and plus sign
    
    // Automatic mask formatting for Bulgarian numbers
    // 0885 919 788 -> +359 88 591 9788
    if (input.startsWith("0")) {
      input = "+359 " + input.substring(1);
    }
    
    // Add custom spaces for readability
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

  // Form Validation
  const validateForm = () => {
    let valid = true;
    const errors = { name: "", phone: "", email: "" };

    if (!formData.name.trim()) {
      errors.name = lang === "bg" ? "Името е задължително" : "Name is required";
      valid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = lang === "bg" ? "Имейлът е задължителен" : "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = lang === "bg" ? "Невалиден имейл формат" : "Invalid email format";
      valid = false;
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\s/g, "");
    if (!formData.phone.trim()) {
      errors.phone = lang === "bg" ? "Телефонът е задължителен" : "Phone is required";
      valid = false;
    } else if (phoneDigits.length < 8) {
      errors.phone = lang === "bg" ? "Невалиден телефонен номер" : "Invalid phone number";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // Submit Inquiry Form
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
        setFormData({ name: "", phone: "", email: "", message: "" });
        // Clear success message after 8s
        setTimeout(() => setSubmitSuccess(false), 8000);
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quote Planner Helpers
  const toggleQuoteItem = (itemId: string) => {
    setQuoteItems(prev => {
      const copy = { ...prev };
      if (copy[itemId]) {
        delete copy[itemId];
      } else {
        copy[itemId] = 1; // Default qty = 1
      }
      return copy;
    });
  };

  const updateQuoteQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      toggleQuoteItem(itemId);
      return;
    }
    setQuoteItems(prev => ({ ...prev, [itemId]: qty }));
  };

  const calculateTotal = () => {
    let sum = 0;
    Object.entries(quoteItems).forEach(([id, qty]) => {
      // Find item in pricing database
      let item = pricingList.riding.find(i => i.id === id) || 
                 pricingList.services.find(i => i.id === id) || 
                 pricingList.tours.find(i => i.id === id);
      if (item) {
        sum += item.price * qty;
      }
    });
    return sum;
  };

  const applyQuoteToForm = () => {
    // Generate text of selected items
    const selectedText: string[] = [];
    Object.entries(quoteItems).forEach(([id, qty]) => {
      let item = pricingList.riding.find(i => i.id === id) || 
                 pricingList.services.find(i => i.id === id) || 
                 pricingList.tours.find(i => i.id === id);
      if (item) {
        const name = lang === "bg" ? item.nameBg : item.nameEn;
        selectedText.push(`${name} (x${qty})`);
      }
    });

    const msg = lang === "bg" 
      ? `Избрани услуги от калкулатора:\n- ${selectedText.join("\n- ")}\n\nОбща сума: ${calculateTotal()}€`
      : `Selected services from planner:\n- ${selectedText.join("\n- ")}\n\nTotal estimated price: ${calculateTotal()}€`;

    setFormData(prev => ({ ...prev, message: msg }));
    
    // Smooth scroll to contacts section where form is
    const contactSection = document.getElementById("contacts");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filtered gallery photos
  const filteredGallery = activeGalleryFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.filter === activeGalleryFilter);

  return (
    <div className="relative min-h-screen">
      
      {/* 1. INTRO ANIMATION SCREEN */}
      {!introFinished && (
        <div 
          ref={introRef}
          className="fixed inset-0 z-50 bg-[#111111] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Running Horse Video Backdrop with blend overlay */}
          <video
            ref={introVideoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-wild-horse-running-in-nature-41584-large.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none mix-blend-screen scale-105"
          />
          
          {/* Subtle gold gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

          {/* Reveal Content */}
          <div className="relative z-10 text-center px-4 max-w-2xl">
            <h1 
              ref={logoTextRef}
              className="text-5xl md:text-7xl font-serif text-white tracking-[0.2em] font-semibold drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] opacity-0"
            >
              ROYAL<span className="text-gold">HORSE</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-4 font-sans font-light">
              {lang === "bg" ? "ЕЛИ ТЕН  К О Н Е Н  К Л У Б" : "E L I T E  E Q U E S T R I A N  C L U B"}
            </p>
          </div>

          {/* Skip button */}
          <button 
            onClick={skipIntro}
            className="absolute bottom-8 right-8 z-20 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-white border border-gray-800 hover:border-gray-500 px-4 py-2.5 rounded-full transition-all"
          >
            {lang === "bg" ? "Пропусни" : "Skip Intro"}
          </button>
        </div>
      )}

      {/* 2. MAIN WEBSITE CONTENT */}
      <div className={`${!introFinished ? "h-screen overflow-hidden" : ""}`}>
        
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-bold tracking-wider text-black group-hover:text-gold transition-colors">
                ROYAL<span className="text-gold group-hover:text-black transition-colors">HORSE</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold tracking-wide text-gray-700">
              <a href="#about" className="hover:text-gold transition-colors">{t[lang].navAbout}</a>
              <a href="#riding" className="hover:text-gold transition-colors">{t[lang].navRiding}</a>
              <a href="#services" className="hover:text-gold transition-colors">{t[lang].navServices}</a>
              <a href="#prices" className="hover:text-gold transition-colors">{t[lang].navPrices}</a>
              <a href="#gallery" className="hover:text-gold transition-colors">{t[lang].navGallery}</a>
              <a href="#contacts" className="hover:text-gold transition-colors">{t[lang].navContacts}</a>
            </div>

            {/* Right side controls (Language & CTA) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex bg-gray-100 p-1 rounded-full text-xs font-bold border border-gray-200">
                <button
                  onClick={() => setLang("bg")}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    lang === "bg" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                  }`}
                >
                  BG
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    lang === "en" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* CRM Booking CTA */}
              <a
                href="#contacts"
                className="bg-[#111111] hover:bg-gold hover:text-black text-[#FCFBF9] font-sans text-xs uppercase tracking-wider font-semibold px-5 py-3 rounded-full transition-all shadow-md shadow-black/5"
              >
                {t[lang].navBookBtn}
              </a>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex md:hidden items-center gap-3">
              {/* Language switcher for mobile */}
              <button 
                onClick={() => setLang(lang === "bg" ? "en" : "bg")}
                className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200"
              >
                {lang === "bg" ? "EN" : "BG"}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black p-1 hover:text-gold transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-6 px-6 space-y-4 animate-fade-in-up font-sans">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-gold"
              >
                {t[lang].navAbout}
              </a>
              <a
                href="#riding"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-gold"
              >
                {t[lang].navRiding}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-gold"
              >
                {t[lang].navServices}
              </a>
              <a
                href="#prices"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-gold"
              >
                {t[lang].navPrices}
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-gold"
              >
                {t[lang].navGallery}
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-gray-800 hover:text-gold"
              >
                {t[lang].navContacts}
              </a>
              <a
                href="#contacts"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-[#111111] text-white text-center py-3 rounded-xl font-semibold text-sm"
              >
                {t[lang].navBookBtn}
              </a>
            </div>
          )}
        </nav>

        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center bg-[#111111] overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=1920"
              alt="Majestic Horse Running"
              className="w-full h-full object-cover opacity-45 object-center"
            />
            {/* Elegant overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FCFBF9] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white w-full">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5" />
                {t[lang].tagline}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight tracking-wide">
                {t[lang].heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                {t[lang].heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#contacts"
                  className="bg-gold hover:bg-gold-dark text-black font-semibold px-7 py-4 rounded-full transition-all flex items-center gap-2 group text-sm"
                >
                  <span>{t[lang].heroCTA1}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#services"
                  className="bg-transparent border border-white/30 hover:border-white text-white font-semibold px-7 py-4 rounded-full transition-all text-sm"
                >
                  {t[lang].heroCTA2}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-[#FCFBF9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t[lang].aboutTitle}</h2>
              <div className="w-12 h-1 bg-gold mx-auto" />
              <p className="text-gray-500 font-light text-base md:text-lg">{t[lang].aboutSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Image with golden border */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold rounded-2xl pointer-events-none z-0" />
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[3/4]">
                  <img
                    src={
                      activeAboutTab === "place"
                        ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
                        : activeAboutTab === "team"
                        ? "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800"
                        : "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800"
                    }
                    alt="RoyalHorse"
                    className="w-full h-full object-cover transition-all duration-700"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column: Custom tabs content */}
              <div className="lg:col-span-7 space-y-8">
                {/* Tabs header */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveAboutTab("place")}
                    className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 mr-8 transition-all ${
                      activeAboutTab === "place"
                        ? "border-gold text-black font-bold"
                        : "border-transparent text-gray-400 hover:text-black"
                    }`}
                  >
                    {t[lang].tabPlace}
                  </button>
                  <button
                    onClick={() => setActiveAboutTab("team")}
                    className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 mr-8 transition-all ${
                      activeAboutTab === "team"
                        ? "border-gold text-black font-bold"
                        : "border-transparent text-gray-400 hover:text-black"
                    }`}
                  >
                    {t[lang].tabTeam}
                  </button>
                  <button
                    onClick={() => setActiveAboutTab("horses")}
                    className={`pb-4 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
                      activeAboutTab === "horses"
                        ? "border-gold text-black font-bold"
                        : "border-transparent text-gray-400 hover:text-black"
                    }`}
                  >
                    {t[lang].tabHorses}
                  </button>
                </div>

                {/* Tabs body */}
                <div className="min-h-[220px] flex flex-col justify-center space-y-4">
                  {activeAboutTab === "place" && (
                    <>
                      <p className="text-gray-700 leading-relaxed text-base font-light">{t[lang].placeText1}</p>
                      <p className="text-gray-600 leading-relaxed text-sm font-light">{t[lang].placeText2}</p>
                    </>
                  )}
                  {activeAboutTab === "team" && (
                    <>
                      <p className="text-gray-700 leading-relaxed text-base font-light">{t[lang].teamText1}</p>
                      <p className="text-gray-600 leading-relaxed text-sm font-light">{t[lang].teamText2}</p>
                    </>
                  )}
                  {activeAboutTab === "horses" && (
                    <>
                      <p className="text-gray-700 leading-relaxed text-base font-light">{t[lang].horsesText1}</p>
                      <p className="text-gray-600 leading-relaxed text-sm font-light">{t[lang].horsesText2}</p>
                    </>
                  )}
                </div>

                {/* Mini trust-badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">Elite Standards</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">Animal Care</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">100% Safety</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HORSE RIDING SECTION */}
        <section id="riding" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t[lang].ridingTitle}</h2>
              <div className="w-12 h-1 bg-gold mx-auto" />
              <p className="text-gray-500 font-light text-base md:text-lg">{t[lang].ridingSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-[#FCFBF9] border border-gray-100 rounded-2xl p-8 hover-gold-grow flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="inline-flex p-3 bg-amber-50 rounded-xl text-gold">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">{t[lang].rideKids}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{t[lang].rideKidsText}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <a href="#prices" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-black transition-colors uppercase tracking-wider">
                    <span>{lang === "bg" ? "Виж цени" : "View prices"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FCFBF9] border border-gray-100 rounded-2xl p-8 hover-gold-grow flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="inline-flex p-3 bg-amber-50 rounded-xl text-gold">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">{t[lang].rideAdults}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{t[lang].rideAdultsText}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <a href="#prices" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-black transition-colors uppercase tracking-wider">
                    <span>{lang === "bg" ? "Виж цени" : "View prices"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#FCFBF9] border border-gray-100 rounded-2xl p-8 hover-gold-grow flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="inline-flex p-3 bg-amber-50 rounded-xl text-gold">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">{t[lang].rideExcursions}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{t[lang].rideExcursionsText}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <a href="#prices" className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-black transition-colors uppercase tracking-wider">
                    <span>{lang === "bg" ? "Виж цени" : "View prices"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-[#FCFBF9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t[lang].servicesTitle}</h2>
              <div className="w-12 h-1 bg-gold mx-auto" />
              <p className="text-gray-500 font-light text-base md:text-lg">{t[lang].servicesSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service item 1 */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
                    alt="Pet Hotel"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Home className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].servPetHotel}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{t[lang].servPetHotelDesc}</p>
                </div>
              </div>

              {/* Service item 2 */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800"
                    alt="Horse Pension"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Award className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].servHorseHotel}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{t[lang].servHorseHotelDesc}</p>
                </div>
              </div>

              {/* Service item 3 */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1530101121893-8072750bb7f9?auto=format&fit=crop&q=80&w=800"
                    alt="Kids Birthdays"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Gift className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].servBirthday}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{t[lang].servBirthdayDesc}</p>
                </div>
              </div>

              {/* Service item 4 */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
                    alt="Restaurant"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Utensils className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].servKitchen}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{t[lang].servKitchenDesc}</p>
                </div>
              </div>

              {/* Service item 5 */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
                    alt="ATV Riding"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Compass className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].servATV}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{t[lang].servATVDesc}</p>
                </div>
              </div>

              {/* Service item 6 */}
              <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                    alt="Russian Sauna"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-gold">
                    <Flame className="w-5 h-5" />
                    <h3 className="text-lg font-serif font-bold text-gray-900">{t[lang].servBath}</h3>
                  </div>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{t[lang].servBathDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICE LIST & CALCULATOR SECTION */}
        <section id="prices" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t[lang].pricesTitle}</h2>
              <div className="w-12 h-1 bg-gold mx-auto" />
              <p className="text-gray-500 font-light text-base md:text-lg">{t[lang].pricesSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Service Selector (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Category toggles */}
                <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200/50 max-w-md">
                  <button
                    onClick={() => setSelectedCategory("riding")}
                    className={`flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                      selectedCategory === "riding" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {t[lang].calcCatRiding}
                  </button>
                  <button
                    onClick={() => setSelectedCategory("services")}
                    className={`flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                      selectedCategory === "services" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {t[lang].calcCatServices}
                  </button>
                  <button
                    onClick={() => setSelectedCategory("tours")}
                    className={`flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                      selectedCategory === "tours" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {t[lang].calcCatATV}
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {pricingList[selectedCategory].map((item) => {
                    const isSelected = !!quoteItems[item.id];
                    const name = lang === "bg" ? item.nameBg : item.nameEn;
                    const unit = lang === "bg" ? item.unitBg : item.unitEn;

                    return (
                      <div 
                        key={item.id}
                        onClick={() => toggleQuoteItem(item.id)}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                          isSelected 
                            ? "bg-amber-50/40 border-gold shadow-sm" 
                            : "bg-[#FCFBF9] border-gray-200/80 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected ? "bg-gold border-gold text-black" : "border-gray-300 bg-white"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                          </div>
                          <div>
                            <h4 className="font-sans font-semibold text-gray-900 text-sm sm:text-base">{name}</h4>
                            <p className="text-xs text-gray-400 font-light mt-0.5">Единица: 1 {unit}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-serif font-bold text-gray-900 text-lg sm:text-xl">
                            {item.price}€
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Quote Summary Card (4 cols) */}
              <div className="lg:col-span-4 bg-[#111111] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 lg:sticky lg:top-28">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold tracking-wide">{t[lang].calcSelected}</h3>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold text-gold">Summary Quote</p>
                </div>

                {/* Selected list */}
                <div className="space-y-4 max-h-[220px] overflow-y-auto no-scrollbar">
                  {Object.keys(quoteItems).length === 0 ? (
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{t[lang].calcEmpty}</p>
                  ) : (
                    Object.entries(quoteItems).map(([id, qty]) => {
                      const item = pricingList.riding.find(i => i.id === id) || 
                                   pricingList.services.find(i => i.id === id) || 
                                   pricingList.tours.find(i => i.id === id);
                      if (!item) return null;
                      const name = lang === "bg" ? item.nameBg : item.nameEn;

                      return (
                        <div key={id} className="flex items-center justify-between text-xs gap-3">
                          <div className="flex-1 truncate">
                            <span className="font-medium">{name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              value={qty}
                              onChange={(e) => updateQuoteQty(id, parseInt(e.target.value) || 1)}
                              className="w-10 bg-white/10 border border-white/10 text-white text-center rounded py-0.5 focus:outline-none focus:border-gold text-xs font-bold"
                            />
                            <span className="font-bold text-gold w-10 text-right">{item.price * qty}€</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Total */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-300">{t[lang].calcTotal}:</span>
                  <span className="font-serif text-2xl font-bold text-gold">{calculateTotal()}€</span>
                </div>

                {/* Submit to Form CTA */}
                <button
                  onClick={applyQuoteToForm}
                  disabled={Object.keys(quoteItems).length === 0}
                  className="w-full bg-gold hover:bg-gold-dark disabled:bg-gray-800 disabled:text-gray-500 text-black font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
                >
                  {t[lang].calcBookNow}
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-24 bg-[#FCFBF9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t[lang].galleryTitle}</h2>
              <div className="w-12 h-1 bg-gold mx-auto" />
              <p className="text-gray-500 font-light text-base md:text-lg">{t[lang].gallerySub}</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { filter: "all", labelBg: t.bg.filterAll, labelEn: t.en.filterAll },
                { filter: "opening", labelBg: t.bg.filterOpening, labelEn: t.en.filterOpening },
                { filter: "doors", labelBg: t.bg.filterDoors, labelEn: t.en.filterDoors },
                { filter: "farm", labelBg: t.bg.filterFarm, labelEn: t.en.filterFarm },
                { filter: "birthdays", labelBg: t.bg.filterBirthdays, labelEn: t.en.filterBirthdays },
                { filter: "photoshoots", labelBg: t.bg.filterPhotoshoots, labelEn: t.en.filterPhotoshoots }
              ].map((btn) => (
                <button
                  key={btn.filter}
                  onClick={() => setActiveGalleryFilter(btn.filter)}
                  className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all border ${
                    activeGalleryFilter === btn.filter
                      ? "bg-[#111111] text-[#FCFBF9] border-black shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {lang === "bg" ? btn.labelBg : btn.labelEn}
                </button>
              ))}
            </div>

            {/* Photos grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedImage(item.url)}
                  className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer aspect-square hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={item.url}
                    alt={lang === "bg" ? item.titleBg : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">
                      {item.filter.toUpperCase()}
                    </span>
                    <h4 className="text-white font-serif font-semibold text-lg leading-tight flex items-center justify-between">
                      <span>{lang === "bg" ? item.titleBg : item.titleEn}</span>
                      <Maximize2 className="w-4 h-4 shrink-0 text-gold" />
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="max-w-5xl max-h-[85vh] overflow-hidden rounded-xl shadow-2xl relative">
                <img
                  src={selectedImage}
                  alt="Enlarged gallery view"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </div>
            </div>
          )}
        </section>

        {/* CONTACTS & FORM SECTION */}
        <section id="contacts" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Contact details (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t[lang].contactsTitle}</h2>
                  <div className="w-12 h-1 bg-gold mt-3 mb-6" />
                  <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">{t[lang].contactsSub}</p>
                </div>

                <div className="space-y-6">
                  {/* Contact detail item 1 */}
                  <div className="flex gap-4">
                    <div className="p-3 bg-amber-50 text-gold rounded-xl shrink-0 h-fit">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{t[lang].cPhone}</h4>
                      <a href="tel:0885919788" className="text-base text-[#c5a059] font-bold hover:underline mt-1 block">
                        0885 919 788
                      </a>
                    </div>
                  </div>

                  {/* Contact detail item 2 */}
                  <div className="flex gap-4">
                    <div className="p-3 bg-amber-50 text-gold rounded-xl shrink-0 h-fit">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{t[lang].cLoc}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {lang === "bg" 
                          ? "гр. Бургас, местност Ченгене Скеле (близо до Рибарско селище)"
                          : "Burgas, Chengene Skele area (near the Fishing Village)"}
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Royal+Horse+Burgas+Ченгене+Скеле"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-black font-semibold mt-2 transition-colors uppercase tracking-wider"
                      >
                        <span>{t[lang].cMapBtn}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Contact detail item 3 */}
                  <div className="flex gap-4">
                    <div className="p-3 bg-amber-50 text-gold rounded-xl shrink-0 h-fit">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{t[lang].cHours}</h4>
                      <p className="text-xs text-gray-500 font-light mt-1 leading-relaxed">
                        {t[lang].cHoursText}
                      </p>
                    </div>
                  </div>

                  {/* Contact detail item 4 */}
                  <div className="flex gap-4">
                    <div className="p-3 bg-amber-50 text-gold rounded-xl shrink-0 h-fit">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{t[lang].cEmail}</h4>
                      <a href="mailto:info@royalhorse.bg" className="text-sm text-gray-600 hover:text-gold block mt-1">
                        info@royalhorse.bg
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Form (7 cols) */}
              <div className="lg:col-span-7 bg-[#FCFBF9] border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">{t[lang].formTitle}</h3>
                
                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex items-start gap-4 animate-fade-in-up">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed font-semibold">{t[lang].formSuccess}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          {t[lang].formName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-white border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-gold transition-all ${
                            formErrors.name ? "border-red-400" : "border-gray-200"
                          }`}
                          placeholder="Иван Петров"
                        />
                        {formErrors.name && (
                          <span className="text-xs text-red-500 mt-1 block">{formErrors.name}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          {t[lang].formPhone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={`w-full bg-white border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-gold transition-all ${
                            formErrors.phone ? "border-red-400" : "border-gray-200"
                          }`}
                          placeholder="+359 88 591 9788"
                        />
                        {formErrors.phone && (
                          <span className="text-xs text-red-500 mt-1 block">{formErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t[lang].formEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-white border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-gold transition-all ${
                          formErrors.email ? "border-red-400" : "border-gray-200"
                        }`}
                        placeholder="example@mail.com"
                      />
                      {formErrors.email && (
                        <span className="text-xs text-red-500 mt-1 block">{formErrors.email}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        {t[lang].formMsg}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-gold transition-all"
                        placeholder="..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#111111] hover:bg-gold hover:text-black text-white font-semibold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-gold" />
                      ) : (
                        <span>{t[lang].formSubmit}</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#111111] text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 font-sans">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="font-serif text-xl font-bold tracking-wider text-white">
                ROYAL<span className="text-gold">HORSE</span>
              </span>
              <p className="text-xs text-gray-500 mt-1 max-w-sm font-light">
                {t[lang].footerText}
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/royalhorse.burgas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/10 hover:text-gold border border-white/10 flex items-center justify-center text-white transition-all text-xs font-semibold"
              >
                FB
              </a>
              <a 
                href="https://www.youtube.com/watch?v=7NOH8v2e2wE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/10 hover:text-gold border border-white/10 flex items-center justify-center text-white transition-all text-xs font-semibold"
              >
                YT
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

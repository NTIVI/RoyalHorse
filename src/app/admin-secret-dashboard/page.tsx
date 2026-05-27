"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  User,
  LogOut,
  Trash2,
  CheckCircle,
  Clock,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Layers,
  Inbox,
  CheckSquare,
  MessageSquare,
  XCircle,
  Plus,
  Edit2,
  ImageIcon,
  X,
  FileText,
  Eye,
  MapPin,
  Users,
  Star,
  Compass,
  Image as LucideImage,
  Sun,
  Moon,
  ChevronDown,
  Check
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  service?: string;
  created_at: string;
  status: string;
  notes: string;
}

interface CmsItem {
  id: number;
  category: string;
  title_bg: string;
  title_en: string;
  desc_bg: string;
  desc_en: string;
  image_url: string;
  extra_info: string;
  created_at: string;
}

const adminTranslations = {
  bg: {
    panelTitle: "Панел за управление",
    loginLabel: "Вход в системата",
    username: "Потребителско име",
    password: "Парола",
    loginError: "Невалидно потребителско име или парола",
    loginBtn: "Вход в системата",
    adminRole: "Администратор",
    logoutBtn: "Изход от панела",
    tabInquiries: "Заявки за резервация",
    tabCms: "Редактор на страници (CMS)",
    inquiriesTitle: "Заявки от клиенти",
    inquiriesDesc: "Преглед и потвърждение на входящи резервации",
    refreshBtn: "Обнови",
    statTotal: "Всички заявки",
    statNew: "Нови",
    statActive: "В работа",
    statCompleted: "Потвърдени",
    filterAll: "Всички заявки",
    filterNew: "Нови",
    filterActive: "В работа",
    filterCompleted: "Потвърдени",
    noInquiries: "Няма намерени заявки",
    name: "Име",
    phone: "Телефон",
    email: "Имейл",
    service: "Услуга",
    date: "Дата",
    notes: "Бележки",
    saveNotes: "Запази бележка",
    deleteInq: "Изтрий заявка",
    confirmDelete: "Изтриване?",
    yes: "Да",
    no: "Не",
    statusNew: "Нов",
    statusActive: "В работа",
    statusCompleted: "Потвърден",
    cmsTitle: "Управление на съдържанието",
    cmsDesc: "Добавяне, редактиране и изтриване на публикации по категории",
    addPostBtn: "Добави пост",
    postTitleBg: "Заглавие (БГ)",
    postTitleEn: "Заглавие (EN)",
    postImage: "Снимка (качване от устройство)",
    postDescBg: "Описание (БГ)",
    postDescEn: "Описание (EN)",
    postExtra: "Етикети (Extra Info / Филтър)",
    createBtn: "Създай запис",
    saveBtn: "Запази промените",
    cancelBtn: "Отказ",
    editPostTitle: "Редактиране на пост",
    addPostTitle: "Добави нов пост",
    selectCategory: "Выберите раздел меню (Категорию)",
    compressing: "Свиване на изображението...",
    clickToUpload: "Натиснете за избор на файл",
    uploadFormat: "JPEG или PNG (авто-компресиране)",
    noCmsItems: "Няма намерени записи в тази категория",
    preview: "Преглед",
    section: "Раздел",
    backToWork: "Върни в работа",
    confirmBtn: "Потвърди",
    editCmsPost: "Редактирай пост",
    imageLink: "Линк към снимката",
    labelTag: "Етикет (дата/тег)"
  },
  ru: {
    panelTitle: "Панель управления",
    loginLabel: "Войти в систему",
    username: "Логин",
    password: "Пароль",
    loginError: "Неверный логин или пароль",
    loginBtn: "Войти в систему",
    adminRole: "Администратор",
    logoutBtn: "Выйти из панели",
    tabInquiries: "Заявки на бронь",
    tabCms: "Редактор страниц (CMS)",
    inquiriesTitle: "Заявки от клиентов",
    inquiriesDesc: "Просмотр и подтверждение входящих бронирований",
    refreshBtn: "Обновить",
    statTotal: "Всего заявок",
    statNew: "Новых",
    statActive: "В обработке",
    statCompleted: "Подтверждённых",
    filterAll: "Все заявки",
    filterNew: "Новые",
    filterActive: "В работе",
    filterCompleted: "Подтверждённые",
    noInquiries: "Заявок не обнаружено",
    name: "Имя",
    phone: "Телефон",
    email: "Email",
    service: "Услуга",
    date: "Дата",
    notes: "Заметки",
    saveNotes: "Сохранить заметку",
    deleteInq: "Удалить заявку",
    confirmDelete: "Удалить?",
    yes: "Да",
    no: "Нет",
    statusNew: "Новый",
    statusActive: "В работе",
    statusCompleted: "Подтверждён",
    cmsTitle: "Управление контентом",
    cmsDesc: "Добавление, редактирование и удаление публикаций по категориям",
    addPostBtn: "Добавить пост",
    postTitleBg: "Заголовок (БГ)",
    postTitleEn: "Заголовок (EN)",
    postImage: "Фотография (загрузка с устройства)",
    postDescBg: "Описание (БГ)",
    postDescEn: "Описание (EN)",
    postExtra: "Метки (Extra Info / Фильтр)",
    createBtn: "Создать запись",
    saveBtn: "Сохранить изменения",
    cancelBtn: "Отмена",
    editPostTitle: "Редактировать пост",
    addPostTitle: "Добавить новый пост",
    selectCategory: "Выберите раздел меню (Категорию)",
    compressing: "Сжатие изображения...",
    clickToUpload: "Нажмите для выбора файла",
    uploadFormat: "JPEG или PNG (авто-сжатие)",
    noCmsItems: "В этой категории пока нет записей",
    preview: "Просмотр",
    section: "Раздел",
    backToWork: "Вернуть в работу",
    confirmBtn: "Подтвердить",
    editCmsPost: "Редактировать пост",
    imageLink: "Ссылка на фото",
    labelTag: "Метка (дата/тег)"
  },
  en: {
    panelTitle: "Control Panel",
    loginLabel: "Log In",
    username: "Username",
    password: "Password",
    loginError: "Invalid username or password",
    loginBtn: "Log In",
    adminRole: "Administrator",
    logoutBtn: "Log Out",
    tabInquiries: "Booking Requests",
    tabCms: "Page Editor (CMS)",
    inquiriesTitle: "Customer Requests",
    inquiriesDesc: "View and confirm incoming bookings",
    refreshBtn: "Refresh",
    statTotal: "Total Requests",
    statNew: "New",
    statActive: "In Progress",
    statCompleted: "Confirmed",
    filterAll: "All Requests",
    filterNew: "New",
    filterActive: "In Progress",
    filterCompleted: "Confirmed",
    noInquiries: "No requests found",
    name: "Name",
    phone: "Phone",
    email: "Email",
    service: "Service",
    date: "Date",
    notes: "Notes",
    saveNotes: "Save Note",
    deleteInq: "Delete Request",
    confirmDelete: "Delete?",
    yes: "Yes",
    no: "No",
    statusNew: "New",
    statusActive: "In Progress",
    statusCompleted: "Confirmed",
    cmsTitle: "Content Management",
    cmsDesc: "Add, edit, and delete publications by categories",
    addPostBtn: "Add Post",
    postTitleBg: "Title (BG)",
    postTitleEn: "Title (EN)",
    postImage: "Image (upload from device)",
    postDescBg: "Description (BG)",
    postDescEn: "Description (EN)",
    postExtra: "Tags (Extra Info / Filter)",
    createBtn: "Create Record",
    saveBtn: "Save Changes",
    cancelBtn: "Cancel",
    editPostTitle: "Edit Post",
    addPostTitle: "Add New Post",
    selectCategory: "Select Menu Section (Category)",
    compressing: "Compressing image...",
    clickToUpload: "Click to upload file",
    uploadFormat: "JPEG or PNG (auto-compress)",
    noCmsItems: "No records found in this category",
    preview: "Preview",
    section: "Section",
    backToWork: "Revert to Work",
    confirmBtn: "Confirm",
    editCmsPost: "Edit Post",
    imageLink: "Image URL",
    labelTag: "Label (date/tag)"
  }
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Localization and theme states
  const [adminLang, setAdminLang] = useState<"bg" | "ru" | "en">("ru");
  const [theme, setTheme] = useState<"light" | "dark">("light"); // Defaults to light mode
  const isDark = theme === "dark";
  const t = adminTranslations[adminLang];

  // Unified CMS State
  const [activeAdminTab, setActiveAdminTab] = useState<"inquiries" | "cms">("inquiries");
  const [cmsContent, setCmsContent] = useState<CmsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("about_place");
  const [editingItem, setEditingItem] = useState<CmsItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [confirmDeleteCmsId, setConfirmDeleteCmsId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);

  const [newItem, setNewItem] = useState({
    category: "about_place",
    title_bg: "",
    title_en: "",
    desc_bg: "",
    desc_en: "",
    image_url: "",
    extra_info: ""
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
            resolve(dataUrl);
          } else {
            reject(new Error("Failed to get canvas 2d context"));
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      const compressedBase64 = await compressImage(file);
      if (isEdit && editingItem) {
        setEditingItem({ ...editingItem, image_url: compressedBase64 });
      } else {
        setNewItem({ ...newItem, image_url: compressedBase64 });
      }
    } catch (err) {
      console.error("Compression error:", err);
      alert("Ошибка при обработке изображения");
    } finally {
      setCompressing(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth");
      if (res.ok) {
        setIsAuthenticated(true);
        fetchInquiries();
        fetchCmsContent();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        fetchInquiries();
        fetchCmsContent();
      } else {
        setLoginError(data.error || t.loginError);
      }
    } catch {
      setLoginError("Ошибка соединения с сервером");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setInquiries([]);
    setCmsContent([]);
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error loading inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCmsContent = async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setCmsContent(data);
      }
    } catch (err) {
      console.error("Error loading CMS content:", err);
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) =>
          inq.id === id ? { ...inq, status: "Completed" } : inq
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetInProgress = async (id: number) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "In Progress" }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) =>
          inq.id === id ? { ...inq, status: "In Progress" } : inq
        ));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        setConfirmDeleteId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Unified CMS Operations
  const handleCreateCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
      });

      if (res.ok) {
        setIsAddingNew(false);
        setNewItem({
          category: "about_place",
          title_bg: "",
          title_en: "",
          desc_bg: "",
          desc_en: "",
          image_url: "",
          extra_info: ""
        });
        fetchCmsContent();
      } else {
        alert("Ошибка при добавлении записи");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetch(`/api/content/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem)
      });

      if (res.ok) {
        setEditingItem(null);
        fetchCmsContent();
      } else {
        alert("Ошибка при сохранении изменений");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCms = async (id: number) => {
    try {
      const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCmsContent(cmsContent.filter(item => item.id !== id));
        setConfirmDeleteCmsId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const activeCount = inquiries.filter((i) => i.status === "In Progress").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "New") return inq.status === "New";
    if (filterStatus === "In Progress") return inq.status === "In Progress";
    return inq.status === filterStatus;
  });

  const filteredCms = cmsContent.filter(item => item.category === selectedCategory);

  const statusLabel: Record<string, string> = {
    "New": t.statusNew,
    "In Progress": t.statusActive,
    "Completed": t.statusCompleted,
  };

  const statusStyle: Record<string, string> = {
    "New": "bg-red-500/10 text-red-400 border-red-500/20",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const cmsCategories = [
    { key: "about_place", label: adminLang === "bg" ? "За Нас — База" : adminLang === "en" ? "About Us — Base" : "За Нас — База" },
    { key: "about_team", label: adminLang === "bg" ? "За Нас — Екип" : adminLang === "en" ? "About Us — Team" : "За Нас — Команда" },
    { key: "about_horses", label: adminLang === "bg" ? "За Нас — Коне" : adminLang === "en" ? "About Us — Horses" : "За Нас — Лошади" },
    { key: "riding", label: adminLang === "bg" ? "Конна Езда" : adminLang === "en" ? "Horse Riding" : "Конна Езда" },
    { key: "services", label: adminLang === "bg" ? "Услуги" : adminLang === "en" ? "Services" : "Услуги" },
    { key: "gallery", label: adminLang === "bg" ? "Галерия" : adminLang === "en" ? "Gallery" : "Галерия" },
    { key: "news", label: adminLang === "bg" ? "Новини" : adminLang === "en" ? "News" : "Новини" }
  ];

  if (isAuthenticated === null) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? "bg-[#442D1C]" : "bg-gray-100"}`}>
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#84592B] animate-spin" />
          <p className={`text-xs tracking-widest font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>LOADING PANEL...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 font-sans relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#442D1C]" : "bg-gray-100"}`}>
        {/* Header Language & Theme Toggles for Login Screen */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          <div className={`flex items-center p-1 rounded-xl border ${isDark ? "bg-black/20 border-white/5" : "bg-white border-black/10 shadow-sm"}`}>
            {(["bg", "ru", "en"] as const).map((langKey) => (
              <button
                key={langKey}
                onClick={() => setAdminLang(langKey)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase transition-all cursor-pointer ${adminLang === langKey
                    ? "bg-[#442D1C] text-[#E8D1A7] border-transparent shadow-sm font-bold"
                    : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#442D1C] font-semibold"
                  }`}
              >
                {langKey}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isDark ? "bg-black/20 border-white/5 hover:bg-black/30 text-[#84592B]" : "bg-white border-black/10 hover:bg-gray-50 text-orange-800 shadow-sm"
              }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#84592B]/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#84592B]/3 rounded-full filter blur-[120px] pointer-events-none" />

        <div className={`max-w-md w-full backdrop-blur-md border rounded-3xl p-10 shadow-2xl space-y-8 relative z-10 transition-colors ${isDark ? "bg-[#121110]/80 border-[#84592B]/15" : "bg-white/95 border-black/5"}`}>
          <div className="text-center space-y-2">
            <span className={`font-serif text-2xl font-bold tracking-[0.2em] ${isDark ? "text-white" : "text-gray-900"}`}>
              ROYAL<span className="text-[#84592B]">HORSE</span>
            </span>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold mt-1">{t.panelTitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.username}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full border rounded-xl py-3.5 px-4 pl-11 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/25 transition-all ${isDark ? "bg-[#1C1A18] border-[#84592B]/10 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                  placeholder="admin"
                />
                <User className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.password}</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-xl py-3.5 px-4 pl-11 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/25 transition-all ${isDark ? "bg-[#1C1A18] border-[#84592B]/10 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-400 text-center font-medium bg-red-950/20 border border-red-900/30 py-3 rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#E8D1A7] hover:bg-[#E8D1A7]/80 text-[#442D1C] border border-[#84592B]/25 font-bold py-4 px-4 rounded-xl transition-all text-xs tracking-widest uppercase shadow-md active:scale-[0.98] cursor-pointer"
            >
              {t.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col lg:flex-row transition-colors duration-300 ${isDark ? "bg-[#0E0D0C] text-gray-200" : "bg-gray-50 text-gray-900"}`}>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`w-full lg:w-72 lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r flex flex-col shrink-0 z-40 transition-colors ${isDark ? "bg-[#121110] border-white/5" : "bg-white border-gray-200/80 shadow-sm"}`}>
        <div className="p-4 lg:p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#84592B] text-black w-8 h-8 rounded-lg font-serif font-bold flex items-center justify-center text-sm shadow-md shadow-[#84592B]/15">
              RH
            </div>
            <div>
              <h2 className={`text-sm font-serif font-bold tracking-wide leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>RoyalHorse</h2>
              <p className="text-[9px] text-[#84592B] font-semibold tracking-wider uppercase">{t.adminRole}</p>
            </div>
          </div>
          {/* Mobile Theme Toggle & Logout */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${isDark ? "bg-black/20 border-white/5 text-[#84592B]" : "bg-gray-100 border-black/5 text-orange-800"}`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleLogout}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${isDark ? "text-red-400 bg-red-950/20 border-red-900/30" : "text-red-600 bg-red-50 border-red-200"}`}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Theme and Language toggles (Desktop) */}
        <div className="hidden lg:block px-6 py-4 border-b border-white/5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className={`flex items-center p-1 rounded-xl border ${isDark ? "bg-black/20 border-white/5" : "bg-gray-100 border-black/5"}`}>
              {(["bg", "ru", "en"] as const).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => setAdminLang(langKey)}
                  className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase transition-all cursor-pointer ${adminLang === langKey
                      ? "bg-[#442D1C] text-[#E8D1A7] border-transparent shadow-sm font-bold"
                      : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#442D1C] font-semibold"
                    }`}
                >
                  {langKey}
                </button>
              ))}
            </div>

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${isDark ? "bg-black/20 border-white/5 text-[#84592B] hover:bg-black/30" : "bg-gray-100 border-black/5 text-orange-800 hover:bg-gray-200"
                }`}
              title={isDark ? "Светлая тема" : "Темная тема"}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <nav className="p-2 lg:p-4 flex-grow flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-1 scrollbar-hide">
          <button
            onClick={() => setActiveAdminTab("inquiries")}
            className={`whitespace-nowrap lg:w-full flex items-center gap-3 text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer ${activeAdminTab === "inquiries"
                ? isDark
                  ? "bg-[#84592B]/10 text-[#84592B] lg:border-l-2 lg:border-[#84592B]"
                  : "bg-[#84592B]/15 text-[#C2410C] lg:border-l-2 lg:border-[#84592B] font-bold"
                : isDark
                  ? "text-gray-400 hover:bg-white/5 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
          >
            <Inbox className="w-4 h-4 shrink-0" />
            <span>{t.tabInquiries}</span>
            {newCount > 0 && (
              <span className="bg-red-500 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 ml-1 lg:ml-auto">
                {newCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab("cms")}
            className={`whitespace-nowrap lg:w-full flex items-center gap-3 text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer ${activeAdminTab === "cms"
                ? isDark
                  ? "bg-[#84592B]/10 text-[#84592B] lg:border-l-2 lg:border-[#84592B]"
                  : "bg-[#84592B]/15 text-[#C2410C] lg:border-l-2 lg:border-[#84592B] font-bold"
                : isDark
                  ? "text-gray-400 hover:bg-white/5 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>{t.tabCms}</span>
          </button>
        </nav>

        <div className="hidden lg:block p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer ${isDark ? "text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/30 border border-red-900/30" : "text-red-600 hover:text-red-500 bg-red-50 hover:bg-red-100/80 border border-red-200"}`}
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logoutBtn}</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-6 sm:p-10 space-y-6 max-h-screen overflow-y-auto">

        {/* ======================================================== */}
        {/* INQUIRIES WORKSPACE */}
        {/* ======================================================== */}
        {activeAdminTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className={`text-2xl font-serif font-bold tracking-wide ${isDark ? "text-white" : "text-gray-900"}`}>{t.inquiriesTitle}</h1>
                <p className="text-xs text-gray-500 mt-1">{t.inquiriesDesc}</p>
              </div>
              <button
                onClick={fetchInquiries}
                className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all border ${isDark ? "text-gray-300 bg-white/5 border-white/10 hover:bg-white/10" : "text-gray-700 bg-white border-gray-200 hover:bg-gray-50"}`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#84592B]" : ""}`} />
                <span>{t.refreshBtn}</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t.statTotal, value: totalCount, icon: <Layers className="w-4.5 h-4.5" />, color: "bg-amber-500/10 text-[#84592B] border-amber-500/20" },
                { label: t.statNew, value: newCount, icon: <Inbox className="w-4.5 h-4.5" />, color: "bg-red-500/10 text-red-400 border-red-500/20" },
                { label: t.statActive, value: activeCount, icon: <Clock className="w-4.5 h-4.5" />, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                { label: t.statCompleted, value: completedCount, icon: <CheckSquare className="w-4.5 h-4.5" />, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
              ].map((stat) => (
                <div key={stat.label} className={`border rounded-2xl p-5 shadow-sm flex items-center gap-4 transition-colors ${isDark ? "bg-[#121110] border-white/5" : "bg-white border-gray-200"}`}>
                  <div className={`p-3 rounded-xl border ${stat.color}`}>{stat.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    <p className={`text-2xl font-bold mt-0.5 ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
              {[
                { key: "All", label: t.filterAll },
                { key: "New", label: t.filterNew },
                { key: "In Progress", label: t.filterActive },
                { key: "Completed", label: t.filterCompleted },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all border cursor-pointer ${filterStatus === f.key
                      ? "bg-[#E8D1A7] text-[#442D1C] border-[#84592B]/35 shadow-md font-bold"
                      : isDark
                        ? "bg-[#121110] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Cards List */}
            {filteredInquiries.length === 0 ? (
              <div className={`rounded-3xl border py-24 text-center shadow-sm transition-colors ${isDark ? "bg-[#121110] border-white/5" : "bg-white border-gray-200"}`}>
                <Inbox className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-medium text-sm">{t.noInquiries}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${isDark ? "bg-[#121110] border-white/5" : "bg-white border-gray-200"}`}
                  >
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-[#84592B] font-serif font-bold text-lg shrink-0 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{inq.name}</h3>
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${statusStyle[inq.status]}`}>
                              {statusLabel[inq.status]}
                            </span>
                            {inq.service && (
                              <span className="text-[9px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/5 text-[#84592B] border border-[#84592B]/20 uppercase tracking-wider">
                                {inq.service}
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400 font-mono">#{inq.id}</span>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-400">
                            <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-[#84592B] transition-colors">
                              <Phone className="w-3.5 h-3.5 text-[#84592B]" /> {inq.phone}
                            </a>
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-[#84592B] transition-colors">
                              <Mail className="w-3.5 h-3.5 text-[#84592B]" /> {inq.email}
                            </a>
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(inq.created_at).toLocaleString(adminLang === "bg" ? "bg-BG" : adminLang === "en" ? "en-US" : "ru-RU")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                        {inq.status !== "Completed" && (
                          <>
                            {inq.status === "New" && (
                              <button
                                onClick={() => handleSetInProgress(inq.id)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all cursor-pointer"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                {t.statusActive}
                              </button>
                            )}
                            <button
                              onClick={() => handleConfirm(inq.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              {t.confirmBtn}
                            </button>
                          </>
                        )}
                        {inq.status === "Completed" && (
                          <button
                            onClick={() => handleSetInProgress(inq.id)}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-400 border-white/10" : "bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200"}`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            {t.backToWork}
                          </button>
                        )}

                        {inq.message && (
                          <button
                            onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#84592B] border border-[#84592B]/20 transition-all cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            {adminLang === "bg" ? "Съобщение" : adminLang === "en" ? "Message" : "Текст"}
                          </button>
                        )}

                        {confirmDeleteId === inq.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
                            >
                              {t.yes}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer ${isDark ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                              {t.no}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold p-2.5 rounded-xl border border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer"
                            title={t.deleteInq}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {expandedId === inq.id && inq.message && (
                      <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <div className={`border rounded-2xl p-5 ${isDark ? "bg-black/20 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                          <p className="text-[9px] font-bold text-[#84592B] uppercase tracking-widest mb-2 pl-0.5">{adminLang === "bg" ? "Съобщение от клиента" : adminLang === "en" ? "Message from client" : "Сообщение от клиента"}</p>
                          <p className={`text-sm leading-relaxed font-light ${isDark ? "text-gray-300" : "text-gray-700"}`}>{inq.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* UNIFIED PAGE EDITOR (CMS) */}
        {/* ======================================================== */}
        {activeAdminTab === "cms" && (
          <div className="space-y-6">

            {/* Header bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h1 className={`text-2xl font-serif font-bold tracking-wide ${isDark ? "text-white" : "text-gray-900"}`}>{t.cmsTitle}</h1>
                <p className="text-xs text-gray-500 mt-1">{t.cmsDesc}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setNewItem({
                      category: selectedCategory,
                      title_bg: "",
                      title_en: "",
                      desc_bg: "",
                      desc_en: "",
                      image_url: "",
                      extra_info: ""
                    });
                    setIsAddingNew(true);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#442D1C] bg-[#E8D1A7] hover:bg-[#E8D1A7]/80 border border-[#84592B]/25 px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addPostBtn}</span>
                </button>
                <button
                  onClick={fetchCmsContent}
                  className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all border ${isDark ? "text-gray-300 bg-white/5 border-white/10 hover:bg-white/10" : "text-gray-700 bg-white border-gray-200 hover:bg-gray-50"}`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.refreshBtn}</span>
                </button>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {cmsCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all border cursor-pointer ${selectedCategory === cat.key
                      ? "bg-[#E8D1A7] text-[#442D1C] border-[#84592B]/35 shadow-sm font-bold"
                      : isDark
                        ? "bg-[#121110] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 shadow-sm"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Unified Cards Grid */}
            {filteredCms.length === 0 ? (
              <div className={`rounded-3xl border py-24 text-center transition-colors ${isDark ? "bg-[#121110] border-white/5" : "bg-white border-gray-200"}`}>
                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-medium text-sm">{t.noCmsItems}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCms.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-3xl overflow-hidden shadow-sm flex flex-col hover:border-white/10 transition-colors group ${isDark ? "bg-[#121110] border-white/5" : "bg-white border-gray-200"}`}
                  >
                    {/* Photo preview */}
                    <div className="aspect-[4/3] w-full bg-black relative overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title_bg || "Image"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => setPreviewImage(item.image_url)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}

                      <span className="absolute top-3 right-3 text-[8px] font-bold px-2 py-0.5 bg-black/75 text-gray-400 rounded-full font-mono">
                        ID: {item.id}
                      </span>

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setPreviewImage(item.image_url)}
                          className="p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all border border-white/10"
                          title={t.preview}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Integrated Description Info */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">{adminLang === "bg" ? "Заглавия (БГ / EN)" : adminLang === "en" ? "Titles (BG / EN)" : "Заголовки (БГ / EN)"}</span>
                          <h4 className={`font-bold text-sm truncate ${isDark ? "text-white" : "text-gray-900"}`}>{item.title_bg || "—"}</h4>
                          <h5 className="text-xs text-[#84592B] italic truncate">{item.title_en || "—"}</h5>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">{adminLang === "bg" ? "Описание (БГ / EN)" : adminLang === "en" ? "Description (BG / EN)" : "Описание (БГ / EN)"}</span>
                          <p className={`text-xs leading-relaxed line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.desc_bg || "—"}</p>
                          <p className="text-[11px] text-gray-500 italic leading-relaxed line-clamp-2">{item.desc_en || "—"}</p>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">{t.imageLink}</span>
                          <p className="text-[10px] text-gray-400 font-mono truncate">{item.image_url || "—"}</p>
                        </div>

                        {item.extra_info && (
                          <div className={`p-2.5 rounded-xl border text-[10px] ${isDark ? "bg-white/3 border-white/5 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
                            <span className="font-bold uppercase tracking-wider block text-[7px] text-gray-500 mb-0.5">{t.labelTag}</span>
                            {item.extra_info}
                          </div>
                        )}
                      </div>

                      {/* Edit/Delete buttons */}
                      <div className="flex gap-2 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setEditingItem(item)}
                          className={`flex-grow inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl border transition-all cursor-pointer ${isDark ? "border-white/5 text-gray-300 bg-white/5 hover:bg-white/10" : "border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100"}`}
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#84592B]" />
                          <span>{t.editCmsPost}</span>
                        </button>

                        {confirmDeleteCmsId === item.id ? (
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => handleDeleteCms(item.id)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
                            >
                              {t.yes}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteCmsId(null)}
                              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer ${isDark ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                              {t.no}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteCmsId(item.id)}
                            className="inline-flex items-center justify-center p-2.5 rounded-xl border border-red-500/25 hover:bg-red-500/10 text-red-400 bg-red-500/5 transition-all cursor-pointer"
                            title={t.deleteInq}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ======================================================== */}
            {/* UNIFIED ADD POST MODAL */}
            {/* ======================================================== */}
            {isAddingNew && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className={`border rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up transition-colors ${isDark ? "bg-[#121110] border-white/5 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="space-y-3">
                    <h3 className="text-xl font-serif font-bold tracking-wide">{t.addPostTitle}</h3>

                    {/* Horizontal scroll list categories bar */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        {t.selectCategory}
                      </label>
                      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {cmsCategories.map((cat) => {
                          const isSelected = newItem.category === cat.key;
                          return (
                            <button
                              key={cat.key}
                              type="button"
                              onClick={() => setNewItem({ ...newItem, category: cat.key })}
                              className={`relative shrink-0 flex items-center gap-2 py-3 px-4.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.96] cursor-pointer ${isSelected
                                  ? "bg-[#84592B]/15 border-[#84592B] text-[#84592B] shadow-[0_0_15px_rgba(212,175,55,0.12)]"
                                  : isDark
                                    ? "bg-[#1C1A18] border-white/5 text-gray-400 hover:border-[#84592B]/20 hover:text-white"
                                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[#84592B]/45 hover:text-black shadow-sm"
                                }`}
                            >
                              {cat.key === "about_place" && <MapPin className="w-3.5 h-3.5" />}
                              {cat.key === "about_team" && <Users className="w-3.5 h-3.5" />}
                              {cat.key === "about_horses" && <Star className="w-3.5 h-3.5" />}
                              {cat.key === "riding" && <Compass className="w-3.5 h-3.5" />}
                              {cat.key === "services" && <Layers className="w-3.5 h-3.5" />}
                              {cat.key === "gallery" && <LucideImage className="w-3.5 h-3.5" />}
                              {cat.key === "news" && <FileText className="w-3.5 h-3.5" />}
                              <span>{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleCreateCms} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postTitleBg}</label>
                        <input
                          type="text"
                          value={newItem.title_bg}
                          onChange={(e) => setNewItem({ ...newItem, title_bg: e.target.value })}
                          className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                          placeholder="Заглавие"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postTitleEn}</label>
                        <input
                          type="text"
                          value={newItem.title_en}
                          onChange={(e) => setNewItem({ ...newItem, title_en: e.target.value })}
                          className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                          placeholder="Title"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        {t.postImage}
                      </label>
                      <div className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center relative flex flex-col items-center justify-center gap-2 group min-h-[140px] ${isDark ? "bg-[#1C1A18] border-white/10 hover:border-[#84592B]/50" : "bg-gray-50 border-gray-200 hover:border-[#84592B]/50"}`}>
                        {compressing ? (
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-[#84592B] animate-spin" />
                            <span className="text-xs text-gray-400">{t.compressing}</span>
                          </div>
                        ) : newItem.image_url ? (
                          <div className="relative w-full flex flex-col items-center">
                            <img
                              src={newItem.image_url}
                              alt="Preview"
                              className="max-h-28 rounded-xl object-contain border border-white/10"
                            />
                            <button
                              type="button"
                              onClick={() => setNewItem({ ...newItem, image_url: "" })}
                              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 border border-black transition-all cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                            <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-[#84592B] transition-colors mb-2" />
                            <span className="text-xs text-gray-400 font-semibold group-hover:text-white transition-colors">
                              {t.clickToUpload}
                            </span>
                            <span className="text-[10px] text-gray-600 mt-1">
                              {t.uploadFormat}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, false)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postDescBg}</label>
                      <textarea
                        rows={3}
                        value={newItem.desc_bg}
                        onChange={(e) => setNewItem({ ...newItem, desc_bg: e.target.value })}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                        placeholder="Текст на български..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postDescEn}</label>
                      <textarea
                        rows={3}
                        value={newItem.desc_en}
                        onChange={(e) => setNewItem({ ...newItem, desc_en: e.target.value })}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                        placeholder="English details text..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postExtra}</label>
                      <input
                        type="text"
                        value={newItem.extra_info}
                        onChange={(e) => setNewItem({ ...newItem, extra_info: e.target.value })}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                        placeholder="Например: opening, 12.05.2026, или пусто"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={compressing}
                      className="w-full bg-[#E8D1A7] hover:bg-[#E8D1A7]/80 text-[#442D1C] border border-[#84592B]/25 font-bold py-4 px-4 rounded-xl transition-all text-xs tracking-widest uppercase shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {t.createBtn}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* UNIFIED EDIT POST MODAL */}
            {/* ======================================================== */}
            {editingItem && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className={`border rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up transition-colors ${isDark ? "bg-[#121110] border-white/5 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold tracking-wide">{t.editPostTitle}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      ID: {editingItem.id} | {t.section}: {cmsCategories.find(c => c.key === editingItem.category)?.label}
                    </p>
                  </div>

                  <form onSubmit={handleUpdateCms} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postTitleBg}</label>
                        <input
                          type="text"
                          value={editingItem.title_bg}
                          onChange={(e) => setEditingItem({ ...editingItem, title_bg: e.target.value })}
                          className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postTitleEn}</label>
                        <input
                          type="text"
                          value={editingItem.title_en}
                          onChange={(e) => setEditingItem({ ...editingItem, title_en: e.target.value })}
                          className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        {t.postImage}
                      </label>
                      <div className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center relative flex flex-col items-center justify-center gap-2 group min-h-[140px] ${isDark ? "bg-[#1C1A18] border-white/10 hover:border-[#84592B]/50" : "bg-gray-50 border-gray-200 hover:border-[#84592B]/50"}`}>
                        {compressing ? (
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-[#84592B] animate-spin" />
                            <span className="text-xs text-gray-400">{t.compressing}</span>
                          </div>
                        ) : editingItem.image_url ? (
                          <div className="relative w-full flex flex-col items-center">
                            <img
                              src={editingItem.image_url}
                              alt="Preview"
                              className="max-h-28 rounded-xl object-contain border border-white/10"
                            />
                            <button
                              type="button"
                              onClick={() => setEditingItem({ ...editingItem, image_url: "" })}
                              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 border border-black transition-all cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                            <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-[#84592B] transition-colors mb-2" />
                            <span className="text-xs text-gray-400 font-semibold group-hover:text-white transition-colors">
                              {t.clickToUpload}
                            </span>
                            <span className="text-[10px] text-gray-600 mt-1">
                              {t.uploadFormat}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, true)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postDescBg}</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc_bg}
                        onChange={(e) => setEditingItem({ ...editingItem, desc_bg: e.target.value })}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postDescEn}</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc_en}
                        onChange={(e) => setEditingItem({ ...editingItem, desc_en: e.target.value })}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">{t.postExtra}</label>
                      <input
                        type="text"
                        value={editingItem.extra_info}
                        onChange={(e) => setEditingItem({ ...editingItem, extra_info: e.target.value })}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#84592B]/20 transition-all ${isDark ? "bg-[#1C1A18] border-white/5 text-white focus:border-[#84592B]" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-[#84592B]"}`}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={compressing}
                        className="flex-grow bg-[#E8D1A7] hover:bg-[#E8D1A7]/80 text-[#442D1C] border border-[#84592B]/25 font-bold py-3.5 px-4 rounded-xl transition-all text-xs tracking-widest uppercase shadow-md active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        {t.saveBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className={`text-xs font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer border ${isDark ? "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"}`}
                      >
                        {t.cancelBtn}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Fullscreen Photo modal preview */}
            {previewImage && (
              <div
                className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
                onClick={() => setPreviewImage(null)}
              >
                <div className="max-w-4xl w-full max-h-[85svh] relative flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="Preview Fullscreen"
                    className="max-w-full max-h-[85svh] rounded-2xl object-contain border border-white/15"
                  />
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute -top-12 right-0 text-white/75 hover:text-white p-2.5 bg-white/5 rounded-full border border-white/10 hover:scale-105 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}

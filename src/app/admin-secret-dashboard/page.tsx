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
  X
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

  // CMS State
  const [activeAdminTab, setActiveAdminTab] = useState<"inquiries" | "content">("inquiries");
  const [cmsContent, setCmsContent] = useState<CmsItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("about_place");
  const [editingItem, setEditingItem] = useState<CmsItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [confirmDeleteCmsId, setConfirmDeleteCmsId] = useState<number | null>(null);

  const [newItem, setNewItem] = useState({
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
        setLoginError(data.error || "Неверный логин или пароль");
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

  // CMS Operations
  const handleCreateCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          ...newItem
        })
      });

      if (res.ok) {
        setIsAddingNew(false);
        setNewItem({
          title_bg: "",
          title_en: "",
          desc_bg: "",
          desc_en: "",
          image_url: "",
          extra_info: ""
        });
        fetchCmsContent();
      } else {
        alert("Ошибка при добавлении контента");
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
        alert("Ошибка при обновлении контента");
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
    return inq.status === filterStatus;
  });

  const filteredCms = cmsContent.filter(item => item.category === selectedCategory);

  const statusLabel: Record<string, string> = {
    "New": "Новый",
    "In Progress": "В обработке",
    "Completed": "Подтверждён",
  };

  const statusStyle: Record<string, string> = {
    "New": "bg-red-100 text-red-600 border-red-200",
    "In Progress": "bg-blue-100 text-blue-600 border-blue-200",
    "Completed": "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const cmsCategories = [
    { key: "about_place", label: "За Нас — Галерея комплекса" },
    { key: "about_team", label: "За Нас — Команда" },
    { key: "about_horses", label: "За Нас — Лошади" },
    { key: "riding", label: "Конная Езда" },
    { key: "services", label: "Услуги комплекса" },
    { key: "gallery", label: "Галерея (Сортировка)" },
    { key: "news", label: "Новинки" }
  ];

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
          <p className="text-gray-400 text-xs tracking-wider">Загрузка панели управления...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090807] flex items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full bg-[#121110] border border-[#D4AF37]/20 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto border border-[#D4AF37]/20 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-bold text-white tracking-wide">Панель управления</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Авторизация администратора</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Логин</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1C1A18] border border-[#D4AF37]/15 rounded-xl py-3 px-4 pl-11 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="admin"
                />
                <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Пароль</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1C1A18] border border-[#D4AF37]/15 rounded-xl py-3 px-4 pl-11 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-500 text-center font-medium bg-red-950/20 border border-red-900/30 py-2.5 rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#AA820A] via-[#D4AF37] to-[#F3E5AB] hover:from-[#D4AF37] hover:to-[#F3E5AB] text-black font-bold py-3.5 px-4 rounded-xl transition-all text-sm tracking-widest uppercase shadow-lg"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-gray-800 font-sans pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#111111] text-[#D4AF37] p-2 rounded-lg font-serif font-bold tracking-wider text-xs">
              RH
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-gray-900 tracking-wide">RoyalHorse</h1>
              <p className="text-[10px] text-[#D4AF37] font-bold tracking-[0.15em] uppercase">Панель управления</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-1.5 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveAdminTab("inquiries")}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeAdminTab === "inquiries"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-905"
                }`}
              >
                Заявки
              </button>
              <button
                onClick={() => setActiveAdminTab("content")}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                  activeAdminTab === "content"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-905"
                }`}
              >
                Контент страниц (CMS)
              </button>
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* ======================================================== */}
        {/* INQUIRIES TAB */}
        {/* ======================================================== */}
        {activeAdminTab === "inquiries" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Заявки клиентов</h2>
                <p className="text-sm text-gray-500 mt-0.5">Управляйте входящими запросами на бронирование</p>
              </div>
              <button
                onClick={fetchInquiries}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#D4AF37]" : ""}`} />
                <span>Обновить</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Всего заявок", value: totalCount, icon: <Layers className="w-5 h-5" />, color: "bg-amber-50 text-[#D4AF37]" },
                { label: "Новых", value: newCount, icon: <Inbox className="w-5 h-5" />, color: "bg-red-50 text-red-500" },
                { label: "В обработке", value: activeCount, icon: <Clock className="w-5 h-5" />, color: "bg-blue-50 text-blue-500" },
                { label: "Подтверждённых", value: completedCount, icon: <CheckSquare className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>{stat.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Inquiries */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "All", label: "Все" },
                { key: "New", label: "Новые" },
                { key: "In Progress", label: "В обработке" },
                { key: "Completed", label: "Подтверждённые" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 border ${
                    filterStatus === f.key
                      ? "bg-[#111111] text-[#D4AF37] border-[#111111]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Inquiry cards */}
            {filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center shadow-sm">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Заявок не найдено</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                      inq.status === "New"
                        ? "border-red-200"
                        : inq.status === "In Progress"
                        ? "border-blue-200"
                        : "border-emerald-200"
                    }`}
                  >
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#AA820A]/30 flex items-center justify-center text-[#AA820A] font-bold text-lg font-serif shrink-0">
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-gray-900 text-sm">{inq.name}</h3>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyle[inq.status] || "bg-gray-100 text-gray-600"}`}>
                              {statusLabel[inq.status] || inq.status}
                            </span>
                            {inq.service && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50/80 text-[#AA820A] border border-amber-200/60">
                                {inq.service}
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400 font-mono">#{inq.id}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                              <Phone className="w-3.5 h-3.5" /> {inq.phone}
                            </a>
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                              <Mail className="w-3.5 h-3.5" /> {inq.email}
                            </a>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(inq.created_at).toLocaleString("ru-RU")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {inq.status !== "Completed" && (
                          <>
                            {inq.status === "New" && (
                              <button
                                onClick={() => handleSetInProgress(inq.id)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-all"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                В работу
                              </button>
                            )}
                            <button
                              onClick={() => handleConfirm(inq.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Подтвердить
                            </button>
                          </>
                        )}
                        {inq.status === "Completed" && (
                          <button
                            onClick={() => handleSetInProgress(inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200 transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Вернуть
                          </button>
                        )}

                        {inq.message && (
                          <button
                            onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#AA820A] border border-amber-200 transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Сообщение
                          </button>
                        )}

                        {confirmDeleteId === inq.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all"
                            >
                              Удалить
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                            >
                              Отмена
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Удалить
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Extended Message */}
                    {expandedId === inq.id && inq.message && (
                      <div className="px-5 pb-5">
                        <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4">
                          <p className="text-[10px] font-bold text-[#AA820A] uppercase tracking-widest mb-2">Сообщение клиента</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{inq.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* CONTENT CMS TAB */}
        {/* ======================================================== */}
        {activeAdminTab === "content" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Управление контентом</h2>
                <p className="text-sm text-gray-500 mt-0.5">Добавляйте, редактируйте и удаляйте посты или фотографии</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить пост</span>
                </button>
                <button
                  onClick={fetchCmsContent}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Обновить</span>
                </button>
              </div>
            </div>

            {/* CMS Category Selector */}
            <div className="flex flex-wrap gap-2">
              {cmsCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all border ${
                    selectedCategory === cat.key
                      ? "bg-[#111111] text-[#D4AF37] border-[#111111] shadow-sm"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Content List Grid */}
            {filteredCms.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center shadow-sm">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Нет контента в этой категории</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCms.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow group"
                  >
                    {/* Image Preview */}
                    <div className="h-44 bg-gray-150 overflow-hidden relative">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title_bg}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 bg-black/60 text-white rounded-full uppercase tracking-wider backdrop-blur-md">
                        ID: {item.id}
                      </span>
                    </div>

                    {/* Content Detail */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Title BG / EN */}
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Заголовок (БГ / EN)</p>
                          <h4 className="font-bold text-gray-900 text-sm mt-0.5 leading-snug">{item.title_bg || "—"}</h4>
                          <h5 className="text-xs text-gray-500 italic mt-0.5 leading-snug">{item.title_en || "—"}</h5>
                        </div>

                        {/* Description BG / EN */}
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Описание (БГ / EN)</p>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-3">{item.desc_bg || "—"}</p>
                          <p className="text-[11px] text-gray-400 italic mt-1 leading-relaxed line-clamp-3">{item.desc_en || "—"}</p>
                        </div>

                        {/* Extra info / custom details */}
                        {item.extra_info && (
                          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[10px] text-gray-500">
                            <span className="font-bold uppercase tracking-wider block text-[8px] text-gray-400 mb-0.5">Доп. информация (дата/тег)</span>
                            {item.extra_info}
                          </div>
                        )}
                      </div>

                      {/* Card Operations */}
                      <div className="flex gap-2 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl border border-gray-200 hover:border-gray-400 text-gray-700 bg-white transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Изменить</span>
                        </button>

                        {confirmDeleteCmsId === item.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDeleteCms(item.id)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors"
                            >
                              Да
                            </button>
                            <button
                              onClick={() => setConfirmDeleteCmsId(null)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              Нет
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteCmsId(item.id)}
                            className="inline-flex items-center justify-center p-2 rounded-xl border border-red-150 hover:bg-red-50 text-red-600 bg-white transition-colors cursor-pointer"
                            title="Удалить запись"
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
            {/* ADD NEW POST FORM / MODAL */}
            {/* ======================================================== */}
            {isAddingNew && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-gray-900">Новый пост ({cmsCategories.find(c=>c.key === selectedCategory)?.label})</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Добавление записи в базу данных</p>
                  </div>

                  <form onSubmit={handleCreateCms} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Заголовок (BG)</label>
                        <input
                          type="text"
                          value={newItem.title_bg}
                          onChange={(e) => setNewItem({ ...newItem, title_bg: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                          placeholder="Заглавие"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Заголовок (EN)</label>
                        <input
                          type="text"
                          value={newItem.title_en}
                          onChange={(e) => setNewItem({ ...newItem, title_en: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                          placeholder="Title"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ссылка на картинку (URL)</label>
                      <input
                        type="text"
                        required
                        value={newItem.image_url}
                        onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="/images/custom_image.jpg или URL адрес"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Описание (BG)</label>
                      <textarea
                        rows={3}
                        value={newItem.desc_bg}
                        onChange={(e) => setNewItem({ ...newItem, desc_bg: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="Текст на български..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Описание (EN)</label>
                      <textarea
                        rows={3}
                        value={newItem.desc_en}
                        onChange={(e) => setNewItem({ ...newItem, desc_en: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="English text details..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Дополнительная информация (теги/даты/фильтр)</label>
                      <input
                        type="text"
                        value={newItem.extra_info}
                        onChange={(e) => setNewItem({ ...newItem, extra_info: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="Например: opening, 12.05.2026, или пустая строка"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-black font-bold py-3.5 px-4 rounded-xl transition-all text-xs tracking-widest uppercase cursor-pointer"
                    >
                      Создать запись
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* EDIT POST FORM / MODAL */}
            {/* ======================================================== */}
            {editingItem && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-gray-900">Редактировать запись (ID: {editingItem.id})</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Внесение изменений</p>
                  </div>

                  <form onSubmit={handleUpdateCms} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Заголовок (BG)</label>
                        <input
                          type="text"
                          value={editingItem.title_bg}
                          onChange={(e) => setEditingItem({ ...editingItem, title_bg: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                          placeholder="Заглавие"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Заголовок (EN)</label>
                        <input
                          type="text"
                          value={editingItem.title_en}
                          onChange={(e) => setEditingItem({ ...editingItem, title_en: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                          placeholder="Title"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ссылка на картинку (URL)</label>
                      <input
                        type="text"
                        required
                        value={editingItem.image_url}
                        onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="/images/custom_image.jpg"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Описание (BG)</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc_bg}
                        onChange={(e) => setEditingItem({ ...editingItem, desc_bg: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="Текст на български..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Описание (EN)</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc_en}
                        onChange={(e) => setEditingItem({ ...editingItem, desc_en: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="English text details..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Дополнительная информация (теги/даты/фильтр)</label>
                      <input
                        type="text"
                        value={editingItem.extra_info}
                        onChange={(e) => setEditingItem({ ...editingItem, extra_info: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                        placeholder="Например: opening, 12.05.2026, или пустая строка"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-black font-bold py-3.5 px-4 rounded-xl transition-all text-xs tracking-widest uppercase cursor-pointer"
                    >
                      Сохранить изменения
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

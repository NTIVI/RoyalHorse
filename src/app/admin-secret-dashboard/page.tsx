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
  Eye
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
        const img = new Image();
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

  // Unified CMS Operations
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
    return inq.status === filterStatus;
  });

  const filteredCms = cmsContent.filter(item => item.category === selectedCategory);

  const statusLabel: Record<string, string> = {
    "New": "Новый",
    "In Progress": "В работе",
    "Completed": "Подтверждён",
  };

  const statusStyle: Record<string, string> = {
    "New": "bg-red-500/10 text-red-400 border-red-500/20",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const cmsCategories = [
    { key: "about_place", label: "За Нас — База" },
    { key: "about_team", label: "За Нас — Команда" },
    { key: "about_horses", label: "За Нас — Лошади" },
    { key: "riding", label: "Конна Езда" },
    { key: "services", label: "Услуги" },
    { key: "gallery", label: "Галерия" },
    { key: "news", label: "Новини" }
  ];

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#090807] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
          <p className="text-gray-400 text-xs tracking-widest font-mono">LOADING PANEL...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090807] flex items-center justify-center px-4 font-sans relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#D4AF37]/3 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-[#121110]/80 backdrop-blur-md border border-[#D4AF37]/15 rounded-3xl p-10 shadow-2xl space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
              ROYAL<span className="text-[#D4AF37]">HORSE</span>
            </span>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold mt-1">Панель управления</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Логин</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1C1A18] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 pl-11 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/25 transition-all"
                  placeholder="admin"
                />
                <User className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Пароль</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1C1A18] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 pl-11 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/25 transition-all"
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
              className="w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold py-4 px-4 rounded-xl transition-all text-xs tracking-widest uppercase shadow-lg shadow-[#D4AF37]/10 active:scale-[0.98] cursor-pointer"
            >
              Войти в систему
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0D0C] text-gray-200 font-sans flex flex-col lg:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-72 bg-[#121110] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#D4AF37] text-black w-8 h-8 rounded-lg font-serif font-bold flex items-center justify-center text-sm shadow-md shadow-[#D4AF37]/15">
              RH
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold text-white tracking-wide leading-tight">RoyalHorse</h2>
              <p className="text-[9px] text-[#D4AF37] font-semibold tracking-wider uppercase">Администратор</p>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-grow space-y-1">
          <button
            onClick={() => setActiveAdminTab("inquiries")}
            className={`w-full flex items-center gap-3 text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeAdminTab === "inquiries"
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Заявки на бронь</span>
            {newCount > 0 && (
              <span className="ml-auto bg-red-500 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {newCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab("cms")}
            className={`w-full flex items-center gap-3 text-xs font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer ${
              activeAdminTab === "cms"
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Редактор страниц (CMS)</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/30 border border-red-900/30 py-3 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Выйти из панели</span>
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
                <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Заявки от клиентов</h1>
                <p className="text-xs text-gray-500 mt-1">Просмотр и подтверждение входящих бронирований</p>
              </div>
              <button
                onClick={fetchInquiries}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2.5 rounded-xl shadow-sm transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#D4AF37]" : ""}`} />
                <span>Обновить список</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Всего заявок", value: totalCount, icon: <Layers className="w-4.5 h-4.5" />, color: "bg-amber-500/10 text-[#D4AF37] border-amber-500/20" },
                { label: "Новых", value: newCount, icon: <Inbox className="w-4.5 h-4.5" />, color: "bg-red-500/10 text-red-400 border-red-500/20" },
                { label: "В обработке", value: activeCount, icon: <Clock className="w-4.5 h-4.5" />, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                { label: "Подтверждённых", value: completedCount, icon: <CheckSquare className="w-4.5 h-4.5" />, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#121110] border border-white/5 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                  <div className={`p-3 rounded-xl border ${stat.color}`}>{stat.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-0.5">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
              {[
                { key: "All", label: "Все заявки" },
                { key: "New", label: "Новые" },
                { key: "In Progress", label: "В работе" },
                { key: "Completed", label: "Подтверждённые" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all border cursor-pointer ${
                    filterStatus === f.key
                      ? "bg-[#D4AF37] text-black border-transparent shadow-md"
                      : "bg-[#121110] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Cards List */}
            {filteredInquiries.length === 0 ? (
              <div className="bg-[#121110] rounded-3xl border border-white/5 py-24 text-center shadow-lg">
                <Inbox className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-medium text-sm">Заявок не обнаружено</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-[#121110] border rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
                      inq.status === "New"
                        ? "border-red-500/10 hover:border-red-500/20"
                        : inq.status === "In Progress"
                        ? "border-blue-500/10 hover:border-blue-500/20"
                        : "border-emerald-500/10 hover:border-emerald-500/20"
                    }`}
                  >
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] font-serif font-bold text-lg shrink-0">
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-white text-sm">{inq.name}</h3>
                            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${statusStyle[inq.status]}`}>
                              {statusLabel[inq.status]}
                            </span>
                            {inq.service && (
                              <span className="text-[9px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/5 text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-wider">
                                {inq.service}
                              </span>
                            )}
                            <span className="text-[10px] text-gray-600 font-mono">#{inq.id}</span>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-400">
                            <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> {inq.phone}
                            </a>
                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> {inq.email}
                            </a>
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(inq.created_at).toLocaleString("ru-RU")}
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
                                В работу
                              </button>
                            )}
                            <button
                              onClick={() => handleConfirm(inq.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Подтвердить
                            </button>
                          </>
                        )}
                        {inq.status === "Completed" && (
                          <button
                            onClick={() => handleSetInProgress(inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 transition-all cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Вернуть в работу
                          </button>
                        )}

                        {inq.message && (
                          <button
                            onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/20 transition-all cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Текст
                          </button>
                        )}

                        {confirmDeleteId === inq.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
                            >
                              Да
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-xs font-bold px-3 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-all cursor-pointer"
                            >
                              Нет
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(inq.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold p-2.5 rounded-xl border border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer"
                            title="Удалить заявку"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {expandedId === inq.id && inq.message && (
                      <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <div className="bg-[#1C1A18] border border-white/5 rounded-2xl p-5">
                          <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 pl-0.5">Сообщение от клиента</p>
                          <p className="text-sm text-gray-300 leading-relaxed font-light">{inq.message}</p>
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
                <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Редактор страниц (CMS)</h1>
                <p className="text-xs text-gray-500 mt-1">Изменяйте фотографии, описания и заголовки для разделов меню</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-black bg-[#D4AF37] hover:bg-[#F3E5AB] px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить пост</span>
                </button>
                <button
                  onClick={fetchCmsContent}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Обновить</span>
                </button>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {cmsCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all border cursor-pointer ${
                    selectedCategory === cat.key
                      ? "bg-[#D4AF37] text-black border-transparent shadow-sm"
                      : "bg-[#121110] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Unified Cards Grid (Image + Texts side-by-side) */}
            {filteredCms.length === 0 ? (
              <div className="bg-[#121110] rounded-3xl border border-white/5 py-24 text-center">
                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-medium text-sm">В выбранном разделе пока нет постов</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCms.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#121110] border border-white/5 rounded-3xl overflow-hidden shadow-sm flex flex-col hover:border-white/10 transition-colors group"
                  >
                    {/* Integrated Photo preview */}
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
                      
                      {/* ID indicator */}
                      <span className="absolute top-3 right-3 text-[8px] font-bold px-2 py-0.5 bg-black/75 text-gray-400 rounded-full font-mono">
                        ID: {item.id}
                      </span>
                      
                      {/* Fullscreen overlay button */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={() => setPreviewImage(item.image_url)}
                          className="p-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all border border-white/10"
                          title="Посмотреть в полный экран"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Integrated Description Info */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Title details (Bulgarian and English) */}
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">Заголовки (БГ / EN)</span>
                          <h4 className="font-bold text-white text-sm truncate">{item.title_bg || "—"}</h4>
                          <h5 className="text-xs text-[#D4AF37] italic truncate">{item.title_en || "—"}</h5>
                        </div>

                        {/* Description details (Bulgarian and English) */}
                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">Описание (БГ / EN)</span>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{item.desc_bg || "—"}</p>
                          <p className="text-[11px] text-gray-500 italic leading-relaxed line-clamp-2">{item.desc_en || "—"}</p>
                        </div>

                        {/* Image link details */}
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block">Ссылка на фото</span>
                          <p className="text-[10px] text-gray-600 font-mono truncate">{item.image_url || "—"}</p>
                        </div>

                        {/* Extra tags */}
                        {item.extra_info && (
                          <div className="bg-white/3 p-2.5 rounded-xl border border-white/5 text-[10px] text-gray-400">
                            <span className="font-bold uppercase tracking-wider block text-[7px] text-gray-500 mb-0.5">Метка (дата/тег)</span>
                            {item.extra_info}
                          </div>
                        )}
                      </div>

                      {/* Unified Edit/Delete buttons */}
                      <div className="flex gap-2 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="flex-grow inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl border border-white/5 hover:border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Редактировать пост</span>
                        </button>

                        {confirmDeleteCmsId === item.id ? (
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => handleDeleteCms(item.id)}
                              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer"
                            >
                              Да
                            </button>
                            <button
                              onClick={() => setConfirmDeleteCmsId(null)}
                              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 transition-all cursor-pointer"
                            >
                              Нет
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteCmsId(item.id)}
                            className="inline-flex items-center justify-center p-2.5 rounded-xl border border-red-500/25 hover:bg-red-500/10 text-red-400 bg-red-500/5 transition-all cursor-pointer"
                            title="Удалить пост"
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
                <div className="bg-[#121110] border border-white/5 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">Добавить новый пост</h3>
                    <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                      Категория: {cmsCategories.find(c=>c.key === selectedCategory)?.label}
                    </p>
                  </div>

                  <form onSubmit={handleCreateCms} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Заголовок (БГ)</label>
                        <input
                          type="text"
                          value={newItem.title_bg}
                          onChange={(e) => setNewItem({ ...newItem, title_bg: e.target.value })}
                          className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                          placeholder="Заглавие"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Заголовок (EN)</label>
                        <input
                          type="text"
                          value={newItem.title_en}
                          onChange={(e) => setNewItem({ ...newItem, title_en: e.target.value })}
                          className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                          placeholder="Title"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        Фотография (загрузка с устройства)
                      </label>
                      <div className="border-2 border-dashed border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all bg-[#1C1A18] text-center relative flex flex-col items-center justify-center gap-2 group min-h-[140px]">
                        {compressing ? (
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-[#D4AF37] animate-spin" />
                            <span className="text-xs text-gray-400">Сжатие изображения...</span>
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
                            <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-[#D4AF37] transition-colors mb-2" />
                            <span className="text-xs text-gray-400 font-semibold group-hover:text-white transition-colors">
                              Нажмите для выбора файла
                            </span>
                            <span className="text-[10px] text-gray-600 mt-1">
                              JPEG или PNG (авто-сжатие)
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
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Описание (БГ)</label>
                      <textarea
                        rows={3}
                        value={newItem.desc_bg}
                        onChange={(e) => setNewItem({ ...newItem, desc_bg: e.target.value })}
                        className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="Текст на български..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Описание (EN)</label>
                      <textarea
                        rows={3}
                        value={newItem.desc_en}
                        onChange={(e) => setNewItem({ ...newItem, desc_en: e.target.value })}
                        className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="English details text..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Метки (extra_info / фильтр)</label>
                      <input
                        type="text"
                        value={newItem.extra_info}
                        onChange={(e) => setNewItem({ ...newItem, extra_info: e.target.value })}
                        className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="Например: opening, 12.05.2026, или пусто"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold py-4 px-4 rounded-xl transition-all text-xs tracking-widest uppercase shadow-md shadow-[#D4AF37]/5 active:scale-[0.98] cursor-pointer"
                    >
                      Создать запись
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
                <div className="bg-[#121110] border border-white/5 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fade-in-up">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">Редактировать запись</h3>
                    <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                      ID: {editingItem.id} | Раздел: {cmsCategories.find(c=>c.key === editingItem.category)?.label}
                    </p>
                  </div>

                  <form onSubmit={handleUpdateCms} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Заголовок (БГ)</label>
                        <input
                          type="text"
                          value={editingItem.title_bg}
                          onChange={(e) => setEditingItem({ ...editingItem, title_bg: e.target.value })}
                          className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                          placeholder="Заглавие"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Заголовок (EN)</label>
                        <input
                          type="text"
                          value={editingItem.title_en}
                          onChange={(e) => setEditingItem({ ...editingItem, title_en: e.target.value })}
                          className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                          placeholder="Title"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        Фотография (загрузка с устройства)
                      </label>
                      <div className="border-2 border-dashed border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all bg-[#1C1A18] text-center relative flex flex-col items-center justify-center gap-2 group min-h-[140px]">
                        {compressing ? (
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-[#D4AF37] animate-spin" />
                            <span className="text-xs text-gray-400">Сжатие изображения...</span>
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
                            <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-[#D4AF37] transition-colors mb-2" />
                            <span className="text-xs text-gray-400 font-semibold group-hover:text-white transition-colors">
                              Нажмите для выбора файла
                            </span>
                            <span className="text-[10px] text-gray-600 mt-1">
                              JPEG или PNG (авто-сжатие)
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
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Описание (БГ)</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc_bg}
                        onChange={(e) => setEditingItem({ ...editingItem, desc_bg: e.target.value })}
                        className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="Текст на български..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Описание (EN)</label>
                      <textarea
                        rows={3}
                        value={editingItem.desc_en}
                        onChange={(e) => setEditingItem({ ...editingItem, desc_en: e.target.value })}
                        className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="English details text..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Метки (extra_info / фильтр)</label>
                      <input
                        type="text"
                        value={editingItem.extra_info}
                        onChange={(e) => setEditingItem({ ...editingItem, extra_info: e.target.value })}
                        className="w-full bg-[#1C1A18] border border-white/5 focus:border-[#D4AF37] rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="Например: opening, 12.05.2026, или пусто"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold py-4 px-4 rounded-xl transition-all text-xs tracking-widest uppercase shadow-md shadow-[#D4AF37]/5 active:scale-[0.98] cursor-pointer"
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

      {/* FULLSCREEN PREVIEW IMAGE MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={previewImage}
            alt="Fullscreen preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
}

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
  AlertCircle,
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
  notes: string;
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

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/auth");
      if (res.ok) {
        setIsAuthenticated(true);
        fetchInquiries();
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

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const activeCount = inquiries.filter((i) => i.status === "In Progress").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus === "All") return true;
    return inq.status === filterStatus;
  });

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

  // ─── LOADING STATE ───────────────────────────────────
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
          <p className="text-gray-400 text-sm">Загрузка...</p>
        </div>
      </div>
    );
  }

  // ─── LOGIN SCREEN ────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] -top-40 -left-40 pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#1a1a1a] border border-[#D4AF37]/20 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif text-white tracking-[0.15em]">ROYAL HORSE</h1>
            <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">Панель администратора</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Логин
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите логин..."
                  className="w-full bg-[#262626] border border-white/10 text-white placeholder-gray-600 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Пароль
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль..."
                  className="w-full bg-[#262626] border border-white/10 text-white placeholder-gray-600 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all text-sm"
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-950/30 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#AA820A] via-[#D4AF37] to-[#F3E5AB] hover:from-[#D4AF37] hover:to-[#F3E5AB] text-black font-bold py-3.5 px-4 rounded-xl transition-all text-sm tracking-widest uppercase shadow-lg shadow-amber-500/10"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-gray-800 font-sans">

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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all border border-red-100"
          >
            <LogOut className="w-4 h-4" />
            <span>Выйти</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Page Title + Refresh */}
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

        {/* Filter Tabs */}
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
          <span className="ml-auto text-xs text-gray-400 self-center">
            {filteredInquiries.length} из {totalCount}
          </span>
        </div>

        {/* Inquiry Cards */}
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
                {/* Card Header */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#AA820A]/30 flex items-center justify-center text-[#AA820A] font-bold text-lg font-serif shrink-0">
                      {inq.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-sm">{inq.name}</h3>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyle[inq.status] || "bg-gray-100 text-gray-600"}`}>
                          {statusLabel[inq.status] || inq.status}
                        </span>
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

                  {/* Action Buttons */}
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

                    {/* Expand message */}
                    {inq.message && (
                      <button
                        onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#AA820A] border border-amber-200 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Сообщение
                      </button>
                    )}

                    {/* Delete */}
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

                {/* Expanded Message */}
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
      </main>
    </div>
  );
}

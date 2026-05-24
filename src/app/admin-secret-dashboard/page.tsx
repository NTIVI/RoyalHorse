"use client";

import { useState, useEffect } from "react";
import { 
  Lock, 
  User, 
  LogOut, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  Phone, 
  Mail, 
  Calendar,
  Layers,
  Inbox,
  CheckSquare
} from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
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
  const [editingNotesId, setEditingNotesId] = useState<number | null>(null);
  const [notesContent, setNotesContent] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Check auth on load
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
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("An error occurred during login.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setInquiries([]);
    } catch {
      alert("Failed to log out");
    }
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

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) =>
            inq.id === id ? { ...inq, status: newStatus } : inq
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async (id: number) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesContent }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) =>
            inq.id === id ? { ...inq, notes: notesContent } : inq
          )
        );
        setEditingNotesId(null);
      } else {
        alert("Failed to save notes");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
      } else {
        alert("Failed to delete inquiry");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Stats helpers
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const activeCount = inquiries.filter((i) => i.status === "In Progress").length;
  const completedCount = inquiries.filter((i) => i.status === "Completed").length;

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus === "All") return true;
    return inq.status === filterStatus;
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FDFCF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#c5a059] animate-spin" />
          <p className="text-gray-600 font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Abstract luxury background lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] -top-40 -left-40 pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#1c1c1c] border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-[#262626] border border-white/5 text-[#c5a059] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif text-white tracking-wider">ROYAL HORSE</h1>
            <p className="text-sm text-gray-400 mt-1">Administrative Access Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter login..."
                  className="w-full bg-[#262626] border border-white/10 text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full bg-[#262626] border border-white/10 text-white placeholder-gray-500 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20 transition-all text-sm"
                />
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-950/30 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#c5a059] hover:bg-[#aa820a] active:bg-[#c5a059] text-black font-semibold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all text-sm tracking-wide"
            >
              Sign In to System
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD MAIN VIEW
  return (
    <div className="min-h-screen bg-[#FDFCF7] text-gray-800 font-sans">
      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200/80 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#111111] text-[#c5a059] p-2 rounded-lg font-serif font-semibold tracking-wider text-xs">
              RH
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold text-gray-900 tracking-wide">
                RoyalHorse Club
              </h1>
              <p className="text-xs text-[#c5a059] font-medium tracking-wide">ADMINISTRATOR CONTROL PANEL</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100/80 px-3.5 py-2 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-semibold text-gray-900">Lead Generation Inquiries</h2>
            <p className="text-sm text-gray-500">Monitor and manage booking requests in real time.</p>
          </div>
          <button
            onClick={fetchInquiries}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#c5a059]" : ""}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-[#c5a059] rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Leads</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{totalCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">New</span>
              <h3 className="text-2xl font-bold text-red-500 mt-0.5">{newCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">In Progress</span>
              <h3 className="text-2xl font-bold text-blue-500 mt-0.5">{activeCount}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Completed</span>
              <h3 className="text-2xl font-bold text-emerald-500 mt-0.5">{completedCount}</h3>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Filter status:</span>
            {["All", "New", "In Progress", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === status
                    ? "bg-[#111111] text-[#c5a059]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Showing {filteredInquiries.length} of {totalCount} records
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="py-16 text-center">
              <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No inquiries found matching this status.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200/80 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Client Info</th>
                    <th className="px-6 py-4 font-semibold">Received At</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Internal Notes</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-gray-50/40 transition-colors">
                      <td className="px-6 py-5 font-mono text-xs text-gray-400 font-bold">
                        #{inq.id}
                      </td>
                      <td className="px-6 py-5 space-y-1">
                        <div className="font-semibold text-gray-900">{inq.name}</div>
                        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-[#c5a059]">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span>{inq.phone}</span>
                          </a>
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-[#c5a059]">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span>{inq.email}</span>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-500">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{new Date(inq.created_at).toLocaleString("bg-BG")}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#c5a059]/30 transition-all ${
                            inq.status === "New"
                              ? "bg-red-50 border-red-200 text-red-600"
                              : inq.status === "In Progress"
                              ? "bg-blue-50 border-blue-200 text-blue-600"
                              : "bg-emerald-50 border-emerald-200 text-emerald-600"
                          }`}
                        >
                          <option value="New" className="bg-white text-red-600 font-semibold">New</option>
                          <option value="In Progress" className="bg-white text-blue-600 font-semibold">In Progress</option>
                          <option value="Completed" className="bg-white text-emerald-600 font-semibold">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-5 w-80">
                        {editingNotesId === inq.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={notesContent}
                              onChange={(e) => setNotesContent(e.target.value)}
                              rows={2}
                              className="w-full text-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/20"
                              placeholder="Write admin note..."
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveNotes(inq.id)}
                                className="text-xs font-semibold bg-gray-900 text-white px-2.5 py-1 rounded-md hover:bg-gray-800 transition-all"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="text-xs font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md hover:bg-gray-200 transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="group relative flex items-start justify-between gap-2 max-w-xs">
                            <div className="text-xs text-gray-600 italic line-clamp-2">
                              {inq.notes ? inq.notes : <span className="text-gray-300">No notes written...</span>}
                            </div>
                            <button
                              onClick={() => {
                                setEditingNotesId(inq.id);
                                setNotesContent(inq.notes || "");
                              }}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-900 p-1 rounded-md transition-all shrink-0"
                              title="Edit notes"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { TEAL, NAVY } from "../shared/Tokens";

interface Rsvp {
  id: number;
  name: string;
  guests: string;
  attending: string;
}

export function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Rsvp>>({});

  useEffect(() => {
    if (token) {
      fetchRsvps();
    }
  }, [token]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const basicToken = btoa(`${username}:${password}`);
      const res = await fetch("/api/admin/verify", {
        method: "GET",
        headers: { "Authorization": `Basic ${basicToken}` }
      });
      if (res.ok) {
        setToken(basicToken);
        localStorage.setItem("admin_token", basicToken);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error connecting to server");
    }
    setLoading(false);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("admin_token");
    setRsvps([]);
  }

  async function fetchRsvps() {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        headers: { "Authorization": `Basic ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRsvps(data);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  function handleEdit(rsvp: Rsvp) {
    setEditingId(rsvp.id);
    setEditForm(rsvp);
  }

  async function handleSave() {
    if (!editingId) return;
    try {
      const res = await fetch(`/api/rsvp/${editingId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Basic ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setEditingId(null);
        fetchRsvps();
      }
    } catch (err) {
      console.error("Failed to update", err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this guest?")) return;
    try {
      const res = await fetch(`/api/rsvp/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Basic ${token}` }
      });
      if (res.ok) {
        fetchRsvps();
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }

  const totalGuests = rsvps.reduce((acc, rsvp) => {
    const num = parseInt(rsvp.guests, 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-center" style={{ color: NAVY }}>Admin Login</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Username" 
              className="border border-gray-300 rounded px-4 py-2"
              value={username} onChange={e => setUsername(e.target.value)} required 
            />
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="border border-gray-300 rounded px-4 py-2 w-full pr-10"
                value={password} onChange={e => setPassword(e.target.value)} required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            <button 
              type="submit" 
              className="py-2 text-white rounded font-bold transition-opacity hover:opacity-90"
              style={{ background: NAVY }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] p-6 sm:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 flex flex-col gap-8">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold" style={{ color: NAVY, fontFamily: "'EB Garamond', serif" }}>
              Registered RSVPs
            </h1>
            {!loading && rsvps.length > 0 && (
              <p className="text-sm font-medium" style={{ color: TEAL }}>
                Total Guests Registered: {totalGuests}
              </p>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border rounded hover:bg-gray-50 text-sm font-medium"
          >
            Logout
          </button>
        </div>
        
        {loading && rsvps.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2" style={{ borderColor: TEAL }}>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Guests</th>
                  <th className="py-3 px-4 font-semibold">Attending</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">No RSVPs yet.</td>
                  </tr>
                ) : (
                  rsvps.map(rsvp => (
                    <tr key={rsvp.id} className="border-b hover:bg-gray-50 transition-colors">
                      {editingId === rsvp.id ? (
                        <>
                          <td className="py-2 px-4">
                            <input 
                              type="text" 
                              className="border rounded px-2 py-1 w-full"
                              value={editForm.name || ""}
                              onChange={e => setEditForm({...editForm, name: e.target.value})}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input 
                              type="number" 
                              className="border rounded px-2 py-1 w-20"
                              value={editForm.guests || ""}
                              onChange={e => setEditForm({...editForm, guests: e.target.value})}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <select 
                              className="border rounded px-2 py-1"
                              value={editForm.attending || ""}
                              onChange={e => setEditForm({...editForm, attending: e.target.value})}
                            >
                              <option value="yes">yes</option>
                              <option value="no">no</option>
                            </select>
                          </td>
                          <td className="py-2 px-4 text-right">
                            <button onClick={handleSave} className="text-green-600 hover:text-green-800 text-sm font-medium mr-3">Save</button>
                            <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700 text-sm font-medium">Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4">{rsvp.name}</td>
                          <td className="py-3 px-4">{rsvp.guests}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${rsvp.attending.toLowerCase() === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {rsvp.attending}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button onClick={() => handleEdit(rsvp)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                            <button onClick={() => handleDelete(rsvp.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { TEAL, NAVY } from "../shared/Tokens";

interface Rsvp {
  id: number;
  name: string;
  guests: string;
  attending: string;
  meal: string;
}

export function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const res = await fetch("http://localhost:8080/api/admin/verify", {
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
      const res = await fetch("http://localhost:8080/api/rsvp", {
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
            <input 
              type="password" 
              placeholder="Password" 
              className="border border-gray-300 rounded px-4 py-2"
              value={password} onChange={e => setPassword(e.target.value)} required 
            />
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
          <h1 className="text-3xl font-bold" style={{ color: NAVY, fontFamily: "'EB Garamond', serif" }}>
            Registered RSVPs
          </h1>
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
                  <th className="py-3 px-4 font-semibold">Meal</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">No RSVPs yet.</td>
                  </tr>
                ) : (
                  rsvps.map(rsvp => (
                    <tr key={rsvp.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{rsvp.name}</td>
                      <td className="py-3 px-4">{rsvp.guests}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${rsvp.attending.toLowerCase() === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {rsvp.attending}
                        </span>
                      </td>
                      <td className="py-3 px-4 capitalize">{rsvp.meal}</td>
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

// --- AdminDashboard.jsx ---
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

const API_BASE = "https://incubyte-assessment-4.onrender.com/api";

function AdminDashboard({ userRole, setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({});
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const token = localStorage.getItem("token");
  const authHeader = { Authorization: `Bearer ${token}` };

  // Role protection
  useEffect(() => {
    if (userRole !== "admin" || !token) navigate("/auth");
  }, [userRole, token, navigate]);

  // Fetch sweets
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await fetch(`${API_BASE}/sweets`, { headers: authHeader });
        if (!res.ok) throw new Error("Failed to fetch sweets");
        const data = await res.json();
        setSweets(data);
      } catch (err) {
        console.error(err);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  // Create sweet
  const handleCreateSweet = async () => {
    const payload = {
      name: newSweet.name.trim(),
      category: newSweet.category.trim(),
      price: Number(newSweet.price),
      quantity: Number(newSweet.quantity),
      imageUrl: newSweet.imageUrl.trim(),
    };
    if (!payload.name || !payload.category || payload.price <= 0 || payload.quantity < 0) {
      alert("Please fill all fields correctly");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/sweets`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");
      const created = await res.json();
      setSweets((prev) => [...prev, created]);
      setNewSweet({ name: "", category: "", price: "", quantity: "", imageUrl: "" });
    } catch (err) {
      alert(err.message);
    }
  };

  // Restock sweet
  const handleRestock = async (id, quantity) => {
    if (!quantity || quantity <= 0) return;
    setStatus({ [id]: "loading" });

    try {
      const res = await fetch(`${API_BASE}/sweets/${id}/restock`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ quantity: Number(quantity) }),
      });
      if (!res.ok) throw new Error("Restock failed");
      const updated = await res.json();
      setSweets((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setStatus({ [id]: "success" });
    } catch {
      setStatus({ [id]: "error" });
    }
    setTimeout(() => setStatus({}), 2000);
  };

  // Update sweet
  const handleUpdateSweet = async (sweet) => {
    const payload = {
      name: sweet.name,
      category: sweet.category,
      price: Number(sweet.price),
      quantity: Number(sweet.quantity),
      imageUrl: sweet.imageUrl,
    };
    try {
      const res = await fetch(`${API_BASE}/sweets/${sweet.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setSweets((prev) => prev.map((s) => (s.id === sweet.id ? updated : s)));
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete sweet
  const handleDeleteSweet = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    try {
      const res = await fetch(`${API_BASE}/sweets/${id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      if (!res.ok) throw new Error("Delete failed");
      setSweets((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="admin-container">Loading Admin Dashboard...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="btn secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CREATE SWEET */}
      <div className="create-sweet">
        <h3>Create New Sweet</h3>
        <input placeholder="Name" value={newSweet.name} onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })} />
        <input placeholder="Category" value={newSweet.category} onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })} />
        <input type="number" placeholder="Price" value={newSweet.price} onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })} />
        <input type="number" placeholder="Quantity" value={newSweet.quantity} onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })} />
        <input placeholder="Image URL" value={newSweet.imageUrl} onChange={(e) => setNewSweet({ ...newSweet, imageUrl: e.target.value })} />
        <button className="btn primary-btn" onClick={handleCreateSweet}>Create</button>
      </div>

      {/* SWEETS GRID */}
      <div className="stock-grid">
        {sweets.map((sweet) => (
          <div className="stock-card" key={sweet.id}>
            <img className="admin-sweet-image" src={sweet.imageUrl} alt={sweet.name} />

            <label>Name:</label>
            <input value={sweet.name} onChange={(e) => setSweets(prev => prev.map(s => s.id === sweet.id ? { ...s, name: e.target.value } : s))} />

            <label>Category:</label>
            <input value={sweet.category} onChange={(e) => setSweets(prev => prev.map(s => s.id === sweet.id ? { ...s, category: e.target.value } : s))} />

            <label>Price:</label>
            <input type="number" value={sweet.price} onChange={(e) => setSweets(prev => prev.map(s => s.id === sweet.id ? { ...s, price: e.target.value } : s))} />

            <label>Quantity:</label>
            <input type="number" value={sweet.quantity} onChange={(e) => setSweets(prev => prev.map(s => s.id === sweet.id ? { ...s, quantity: e.target.value } : s))} />

            <label>Image URL:</label>
            <input value={sweet.imageUrl} onChange={(e) => setSweets(prev => prev.map(s => s.id === sweet.id ? { ...s, imageUrl: e.target.value } : s))} />

            <label>Restock Quantity:</label>
            <input type="number" placeholder="Restock qty" onChange={(e) => (sweet.restockQty = e.target.value)} />

            <div className="admin-buttons">
              <button className="btn primary-btn" onClick={() => handleRestock(sweet.id, sweet.restockQty)} disabled={status[sweet.id] === "loading"}>
                {status[sweet.id] === "loading" ? "Updating..." : "Restock"}
              </button>
              <button className="btn secondary-btn" onClick={() => handleUpdateSweet(sweet)}>Update</button>
              <button className="btn danger-btn" onClick={() => handleDeleteSweet(sweet.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/" className="back-link admin-back">← Back to Shop</Link>
    </div>
  );
}

export default AdminDashboard;

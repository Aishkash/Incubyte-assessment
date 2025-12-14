// --- HomePage.jsx (search API with name & category) ---
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Lottie from "lottie-react";
import animationData from "./MuslimSweets.json"; 
import neighborhoodAnimation from "./neigh.json";
import './App.css'; 

const API_BASE = "https://incubyte-assessment-4.onrender.com/api";

// --- ANIMATIONS ---
const AnimatedSweet = () => (
  <div className="animated-logo-container">
    <Lottie animationData={animationData} loop={true} style={{ width: 100, height: 100 }} />
    <h1 className="logo-text">Sweet Delights</h1>
  </div>
);

const NeighborhoodAnimation = () => (
  <div className="neighborhood-animation-container">
    <Lottie animationData={neighborhoodAnimation} loop={true} style={{ width: '100%', height: 'auto', maxWidth: '400px' }} />
  </div>
);

function HomePage({ isLoggedIn, userRole, cartItems, setCartItems, setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const authHeader = { Authorization: `Bearer ${token}` };

  // --- FETCH SWEETS FROM SEARCH API ---
  const fetchSweets = async (name = "", category = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (category && category !== "All" && category !== "In Stock") params.append("category", category);

      const res = await fetch(`${API_BASE}/sweets/search?${params.toString()}`, { headers: authHeader });
      if (!res.ok) throw new Error("Failed to fetch sweets");
      const data = await res.json();
      setSweets(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load sweets. Please login again.");
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  // --- INITIAL FETCH ---
  useEffect(() => {
    fetchSweets();
  }, [navigate]);

  // --- SEARCH & CATEGORY EFFECT ---
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const categoryForApi = selectedCategory === "In Stock" ? "" : selectedCategory;
      fetchSweets(searchQuery.trim(), categoryForApi);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedCategory]);

  // --- NAVIGATION / LOGOUT ---
  const handleProfileButtonClick = () => {
    if (isLoggedIn) {
      if (userRole === "admin") navigate("/admin");
      else if (window.confirm("Are you sure you want to log out?")) {
        setIsLoggedIn(false);
        setUserRole(null);
        setCartItems([]);
        localStorage.removeItem("token");
        navigate("/");
      }
    } else navigate("/auth");
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // --- CART FUNCTIONS ---
  const handleAddToCart = (sweet) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      navigate("/auth");
      return;
    }

    const existingItem = cartItems.find(item => item.id === sweet.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity >= sweet.quantity) {
      alert(`Cannot add more than available stock: ${sweet.quantity} kg.`);
      return;
    }

    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === sweet.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...sweet, quantity: 1, unitPrice: sweet.price, stockLimit: sweet.quantity }]);
    }
    setIsSidebarOpen(false);
  };

  const updateCartQuantity = (id, change) => {
    setCartItems(prevItems => {
      const sweetToUpdate = prevItems.find(item => item.id === id);
      if (!sweetToUpdate) return prevItems;

      const newQuantity = sweetToUpdate.quantity + change;
      if (change > 0 && newQuantity > sweetToUpdate.stockLimit) {
        alert(`Maximum stock limit reached for ${sweetToUpdate.name} (${sweetToUpdate.stockLimit} kg).`);
        return prevItems;
      }

      const newItems = prevItems.map(item => item.id === id ? (newQuantity > 0 ? { ...item, quantity: newQuantity } : null) : item).filter(Boolean);
      if (newItems.length === 0) setIsSidebarOpen(false);
      return newItems;
    });
  };

  // --- CHECKOUT FUNCTION ---
  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    try {
      for (const item of cartItems) {
        const res = await fetch(`${API_BASE}/sweets/${item.id}/purchase`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeader },
          body: JSON.stringify({ quantity: item.quantity })
        });
        if (!res.ok) throw new Error(`Failed to purchase ${item.name}`);
      }

      alert("Checkout successful! Thank you for your purchase.");
      setCartItems([]);
      setIsSidebarOpen(false);
      fetchSweets(searchQuery.trim(), selectedCategory);
    } catch (err) {
      console.error(err);
      alert(err.message || "Checkout failed. Please try again.");
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const availableCategories = [...new Set(sweets.map(s => s.category))];
  const allCategories = ["All", ...availableCategories, "In Stock"];

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading sweets...</div>;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <AnimatedSweet />
        <div className="top-actions">
          <button className="cart-button" onClick={toggleSidebar}>🛒 Cart ({cartItems.length})</button>
          <button className="login-button" onClick={handleProfileButtonClick}>
            {isLoggedIn ? (userRole === "admin" ? "Admin" : "Logout") : "Login"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <NeighborhoodAnimation />
          <h2>Indulge Your Cravings</h2>
          <p>Exotic, traditional, and fusion sweets—all in one place.</p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for your favorite sweet..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Sweets Grid */}
      <section className="sweets-list-section">
        <h3>Our Featured Sweets</h3>
        <div className="category-tabs">
          {allCategories.map(cat => (
            <button
              key={cat}
              className={`btn category-btn ${selectedCategory === cat ? 'active-category' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sweets-grid">
          {sweets.map(sweet => (
            <div className="sweet-card" key={sweet.id}>
              <img src={sweet.imageUrl} alt={sweet.name} className="sweet-image-placeholder"/>
              <div className="card-info">
                <h4>{sweet.name}</h4>
                <p>Category: {sweet.category}</p>
                <p>₹{sweet.price} / 100g</p>
                <p className={sweet.quantity === 0 ? "out-of-stock" : "in-stock"}>Stock: {sweet.quantity} kg</p>
              </div>
              <div className="card-actions">
                <button disabled={sweet.quantity === 0} onClick={() => handleAddToCart(sweet)}>Add to Cart</button>
                <button disabled={sweet.quantity === 0} onClick={() => handleAddToCart(sweet)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sidebar Cart */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="sidebar-drawer" onClick={e => e.stopPropagation()}>
            <div className="sidebar-header">
              <h3>My Cart ({cartItems.length})</h3>
              <button className="close-btn" onClick={toggleSidebar}>&times;</button>
            </div>
            <div className="sidebar-content">
              {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
                <>
                  {cartItems.map(item => {
                    const availableStock = sweets.find(s => s.id === item.id)?.quantity || 0;
                    return (
                      <div className="cart-item" key={item.id}>
                        <img src={item.imageUrl} alt={item.name} className="cart-item-image"/>
                        <div>
                          <h4>{item.name}</h4>
                          <p>Price: ₹{item.unitPrice} / 100g</p>
                          <p>Available: {item.stockLimit} kg</p>
                        </div>
                        <div className="cart-controls">
                          <button onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, 1)} disabled={item.quantity >= availableStock}>+</button>
                        </div>
                        <p>Subtotal: ₹{(item.unitPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    )
                  })}
                  <div className="cart-summary">
                    <h4>Total: ₹{cartTotal.toFixed(2)}</h4>
                    <button className="btn primary-btn checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2025 Sweet Delights. Crafted with passion.</p>
      </footer>
    </div>
  );
}

export default HomePage;

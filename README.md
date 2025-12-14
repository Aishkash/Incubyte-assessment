# 🍬 Sweet Shop Management System

## Overview

The **Sweet Shop Management System** is a full-stack web application designed to manage an online sweet shop. It allows users to browse, search, and purchase sweets while providing administrators with the ability to manage inventory (add, update, delete, and restock sweets). The project demonstrates modern web development practices, including TDD, RESTful API design, React SPA frontend, token-based authentication, and clean coding practices.  

The project was developed using **React (Vite)** for the frontend and **Node.js + Express + Prisma** for the backend, with a **MySQL** database.

---

## Deployed URLs

- **Frontend (React SPA):** [https://incubyte-assessment-phi.vercel.app](https://incubyte-assessment-phi.vercel.app/)  
- **Backend API (Deployed):** [https://incubyte-assessment-4.onrender.com/api](https://incubyte-assessment-4.onrender.com/api)  

---

## Features

### User Features

- Register and login with email and password.
- Browse all sweets with images, categories, and prices.
- Search sweets by **name** and **category**.
- Add sweets to cart and update quantities.
- Purchase sweets (updates stock in real-time).
- Responsive and animated UI with Lottie animations.

### Admin Features

- Add new sweets with name, category, price, quantity, and image URL.
- Update sweet details.
- Delete sweets.
- Restock sweets.
- Protected endpoints using JWT authentication.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description                       |
|--------|--------------------|-----------------------------------|
| POST   | /api/auth/register  | Register a new user               |
| POST   | /api/auth/login     | Login and receive a JWT token     |

### Sweets (Protected)

| Method | Endpoint                    | Description                               |
|--------|----------------------------|-------------------------------------------|
| POST   | /api/sweets                 | Add a new sweet (Admin only)             |
| GET    | /api/sweets                 | Get all sweets                            |
| GET    | /api/sweets/search          | Search sweets by name or category         |
| PUT    | /api/sweets/:id             | Update sweet details (Admin only)        |
| DELETE | /api/sweets/:id             | Delete a sweet (Admin only)              |

### Inventory (Protected)

| Method | Endpoint                    | Description                                  |
|--------|----------------------------|----------------------------------------------|
| POST   | /api/sweets/:id/purchase    | Purchase a sweet (decrease quantity)        |
| POST   | /api/sweets/:id/restock     | Restock a sweet (Admin only, increase quantity) |

---

## Frontend Overview

- **Technology:** React with Vite, manual CSS, Framer Motion for animations.
- **Key Components:**
  - `HomePage.jsx`: Displays sweets, search, filters, and cart functionality.
  - `AdminDashboard.jsx`: Admin interface to manage inventory.
  - `Login.jsx` / `Register.jsx`: Authentication forms.
  - Animations: `MuslimSweets.json`, `neigh.json`.
- Responsive layout with modern, animated design.
- Cart sidebar with real-time quantity validation and checkout functionality.

---

## Local Setup

### Backend

1. Clone the repository and navigate to backend:
   ```bash
   git clone https://github.com/Aishkash/Incubyte-assessment.git
   ```
   ```bash
   cd Incubyte-assessment/backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure `.env` with your database and JWT secret:
   ```env
   DATABASE_URL="mysql://user:password@host:port/dbname"
   JWT_SECRET="your_jwt_secret"
   ```  
4. Run database migrations using Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Clone the repository and navigate to frontend:
   ```bash
   git clone https://github.com/Aishkash/Incubyte-assessment.git
   ```
   ```bash
   cd Incubyte-assessment/frontend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at:
   ```bash
   http://localhost:5173
   ```
---
## Usage

### Admin Users
- Login via `/admin` route.
- Add, update, delete, and restock sweets.
- Manage inventory in real-time.

### Regular Users
- Register and login.
- Browse and filter sweets by **name** and **category**.
- Add sweets to cart, update quantities, and proceed to checkout.
- Checkout triggers the purchase API for each item and updates stock accordingly.

### Search Functionality
- Uses `/api/sweets/search` endpoint to filter by **name** and **category**.
- The search is case-insensitive and supports partial matches.

---

## My AI Usage

- **Tool Used:** ChatGPT
- **Usage:**  
  - Generated boilerplate for frontend components (`Login.jsx`, `Register.jsx`, `AdminDashboard.jsx`, `HomePage.jsx`) and backend controllers/services.  
  - Assisted in implementing frontend functionality such as cart management, checkout logic, search integration, and animations.  
  - Helped with CSS styling and layout adjustments to create a responsive UI.
- **Reflection:**  
  Using ChatGPT accelerated development by reducing boilerplate code writing and providing suggestions for component structure and API integration. Manual refinements ensured a polished, production-ready application.

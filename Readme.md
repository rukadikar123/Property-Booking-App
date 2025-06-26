# 🏠 Property Booking App (MERN Stack)

This is a **Full-Stack Property Booking Web Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to browse, book, and manage properties. Hosts can list new properties and manage bookings.

---

## 🚀 Features

### ✅ User Features:
- User signup/login/logout using JWT cookies
- Browse and view property listings
- Book properties for selected dates
- View personal bookings

### 🏘️ Host Features:
- Become a host
- Add new properties
- View bookings for listed properties (optional feature extension)

### 💡 Additional:
- Responsive UI with Tailwind CSS
- State management using Redux Toolkit
- Real-time status update of bookings via cron job
- Toast notifications for better UX

---

## 🛠️ Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Cloudinary](https://cloudinary.com/) for image upload
- [Multer](https://github.com/expressjs/multer) for file handling
- [Node-cron](https://www.npmjs.com/package/node-cron) for automatic booking status updates

---


## 📁 Project Structure

```
Property_Booking_App/
├── backend/                # Express API
│   ├── Routes/
│   ├── Model/
│   ├── config/
│   ├── controllers/
│   ├── cron.js
│   ├── index.js
│   └── seed.js
├── frontend/               # React app
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── vite.config.js
└── README.md               # Main readme (you are here)
```

---

### The app will be available at [Live Link](https://property-booking-app-frontend.onrender.com)
# 🏠 Property Booking App (MERN Stack)

A full-stack property booking web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can browse, book, and manage properties. Hosts can list new properties and manage bookings.

---

## 🚀 Features

- User authentication (Sign Up, Login, Logout)
- Browse and view property listings
- Search properties by location
- Book properties for selected dates
- View your bookings
- Become a host and add new properties
- Add and view Wishlist
- Rate and review properties after your stay
- View all reviews for a property
- Responsive UI with Tailwind CSS
- State management using Redux Toolkit
- Real-time status update of bookings via cron job
- Toast notifications for better UX

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, React Router, Axios, Tailwind CSS, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Cloudinary (image upload), Multer (file handling), Node-cron (auto booking status updates)

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



## 📝 Notes

- All endpoints (except signup/login) require authentication via JWT cookie.
- To add a property, the user must first become a host.
- Image uploads for properties are handled via multipart/form-data.
- Bookings automatically update status via a daily cron job.
- Ratings can only be submitted for completed bookings.
- Wishlist and ratings are synced with your account.

---

## 🌐 Live Demo

- [Frontend Live](https://property-booking-app-frontend.onrender.com)
- [Backend Live](https://property-booking-app-backend.onrender.com/api)

---


## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Inspired by Airbnb and similar property booking platforms.
- Built with the MERN stack and modern React
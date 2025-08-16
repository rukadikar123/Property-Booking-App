# Property Booking App (Frontend)

This is the frontend for a Property Booking App, built with **React** and **Vite**. The app allows users to sign up, log in, browse property listings, book properties, view their bookings, and add new properties as hosts.

## Features

- User authentication (Sign Up, Login, Logout)
- Browse and view property listings
- **Search properties by location**
- Book properties for selected dates
- View your bookings
- Become a host and add new properties
- **Add and view Wishlist**
- **Rate and review properties after your stay**
- **View all reviews for a property**
- Responsive design with Tailwind CSS
- State management using Redux Toolkit
- Toast notifications for user feedback

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm 

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/rukadikar123/Property_Booking_App/tree/main/frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

The app will be available at [Live Link](https://property-booking-app-frontend.onrender.com)

---

## Key Pages & Functionality

- **Home/Listings:** View all available properties, add/remove from wishlist, see ratings.
- **Search:** Search properties by location using the search bar in the navbar.
- **Wishlist:** View and manage your favorite properties.
- **Booking:** Book a property for selected dates.
- **My Bookings:** View all your bookings, rate your stay after checkout.
- **Add Property:** (For hosts) Add new property listings with images.
- **Profile:** Update your profile picture.
- **Reviews:** View all reviews for a property in a popup.

---

## API Endpoints Used

These endpoints are provided by the backend:

- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login
- `GET /api/auth/logout` – Logout
- `GET /api/auth/current` – Get current user info
- `PATCH /api/auth/become-host` – Become a host
- `PATCH /api/auth/profile/edit` – Update profile picture

- `GET /api/listing` – Get all property listings
- `POST /api/listing/add` – Add a new property (host only)
- `GET /api/listing/:id` – Get property details by ID
- `GET /api/listing/search?query=LOCATION` – Search properties by location

- `POST /api/booking/place-booking` – Place a booking
- `GET /api/booking/my-bookings` – Get your bookings

- `POST /api/wishlist/toggleWishlist` – Add/remove property from wishlist
- `GET /api/wishlist/allWishlist` – Get all wishlist items

- `GET /api/rating/isPending` – Check if you have a pending rating
- `POST /api/rating/add` – Add a rating for a booking
- `GET /api/rating/reviews/:id` – Get all reviews for a property

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── customHooks/
│   ├── redux/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── README.md
```

---

## Notes

- All features require login except signup/login pages.
- Wishlist and ratings are synced with your account.
- Bookings and reviews are only available to logged-in users.
- To add a property, you must become a host from your account menu.
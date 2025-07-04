Here's a **very detailed and comprehensive `README.md`** for your **BloodLink** project, covering every essential aspect, including setup, usage, deployment, and contributions:

---

```markdown
# 🩸 BloodLink - A Complete Blood Donation & Request System

**BloodLink** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It connects blood donors and patients with a robust admin panel for monitoring all activities. The app features secure authentication, blood donation logging, request handling, map-based location features, and role-based dashboards.

---

## 📌 Table of Contents

- [🔧 Features](#-features)
- [💻 Tech Stack](#-tech-stack)
- [📂 Folder Structure](#-folder-structure)
- [🚀 Getting Started](#-getting-started)
- [📄 .env Configuration](#-env-configuration)
- [🔐 User Roles](#-user-roles)
- [🗺️ Map & Location Handling](#️-map--location-handling)
- [🌐 Deployment](#-deployment)
- [🧪 API Overview](#-api-overview)
- [👥 Contributing](#-contributing)
- [📸 Screenshots](#-screenshots)
- [📃 License](#-license)

---

## 🔧 Features

### 👤 Authentication
- JWT-based login and registration.
- Role-based dashboards: Admin, Donor, and Patient.
- Password update functionality from profile.

### 🩸 Donor Functionality
- Register and donate blood.
- Auto-filled blood type from profile.
- Track donation history.
- City/State/Pincode input + Optional Map-based location.
- "View on Map" feature using coordinates.

### 🆘 Patient Functionality
- Request blood specifying quantity, urgency, and location.
- Requests are tagged with patient’s blood type automatically.
- Track previous requests.

### 🛡️ Admin Dashboard
- View all donations and requests.
- View all registered users.
- Approve or reject blood requests.

### 📍 Location Support
- Integrated with **OpenStreetMap (Leaflet)** and **Nominatim** for address autocomplete.
- Location can be set via dropdowns or map.
- View donor/patient locations on Google Maps.

---

## 💻 Tech Stack

| Category      | Tech Used                          |
|---------------|-------------------------------------|
| Frontend      | React.js, Axios, React Router DOM   |
| Backend       | Node.js, Express.js, Mongoose       |
| Database      | MongoDB Atlas                       |
| Authentication| JWT                                 |
| Maps          | Leaflet, Nominatim API (via Proxy)  |
| Styling       | Plain CSS, Inline Styling           |

---

## 📂 Folder Structure

```

BloodLink/
├── client/               # React frontend
│   ├── components/       # Reusable components (Navbar, Map)
│   ├── pages/            # Page views like Register, Donate, Dashboard
│   ├── services/         # Axios service calls
│   ├── App.js            # Route configuration
│   └── index.js          # App entry point
│
├── server/               # Express backend
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # JWT Auth middleware
│   └── index.js          # Server entry point

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/BloodLink.git
cd BloodLink
````

### 2. Setup Server (Backend)

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

---

### 3. Setup Client (Frontend)

```bash
cd ../client
npm install
```

Start the frontend:

```bash
npm start
```

Frontend: [http://localhost:3000](http://localhost:3000)
Backend API: [http://localhost:5000](http://localhost:5000)

---

## 📄 .env Configuration

Create this file in `/server/` directory:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/BloodLink
JWT_SECRET=your_jwt_secret
```

---

## 🔐 User Roles

| Role    | Access Level                              |
| ------- | ----------------------------------------- |
| Admin   | Full control (users, donations, requests) |
| Donor   | Can donate and view own donations         |
| Patient | Can request blood and view own requests   |

To make a user admin:

```bash
# In MongoDB shell or GUI:
db.users.updateOne({ email: "example@admin.com" }, { $set: { role: "admin" } })
```

---

## 🗺️ Map & Location Handling

* Users can either enter city, state, pincode manually **OR** check a box to pick an exact location on the map.
* On donation/request cards, an optional "🗺️ View on Map" button appears if exact location is saved.
* Map powered by [Leaflet](https://leafletjs.com/) and [Nominatim](https://nominatim.org/).

---

## 🌐 Deployment

* **Frontend:** Vercel / Netlify
* **Backend:** Render / Railway / Cyclic
* **Database:** MongoDB Atlas

Example:

```bash
npm run build         # Frontend
npm install -g serve
serve -s build        # Serve React build
```

---

## 🧪 API Overview

### Auth Routes

```
POST /api/register
POST /api/login
```

### Donation Routes

```
POST   /api/donate         # Donor adds donation
GET    /api/my-donations   # Donor views own donations
GET    /api/donations      # Admin views all donations
```

### Request Routes

```
POST   /api/request        # Patient makes a request
GET    /api/my-requests    # Patient views own requests
GET    /api/requests       # Admin views all requests
PATCH  /api/request/:id/status  # Admin approves/rejects
```

### Location Proxy

```
GET /api/location/search?q=city
```


## 👥 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/feature-name`
3. Make your changes
4. Commit: `git commit -m "Added new feature"`
5. Push: `git push origin feature/feature-name`
6. Submit a PR

---

## 📃 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙌 Acknowledgements

* [Leaflet.js](https://leafletjs.com/)
* [OpenStreetMap](https://www.openstreetmap.org/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Render](https://render.com/)
* [React Router](https://reactrouter.com/)

---

## ✨ Developed by

**Adarsh Kumar Sahu**
B.Tech CSE | KIIT University
🔗 [LinkedIn](https://linkedin.com/in/your-profile)
📫 Email: [22053745@kiit.ac.in](mailto:22053745@kiit.ac.in)

---


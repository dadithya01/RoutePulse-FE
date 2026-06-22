# RoutePulse FE

A modern bus booking web application built with React, TypeScript, and Tailwind CSS. RoutePulse allows users to browse available trips, book seats, and manage their bookings — while giving admins full control over routes, buses, and trips.

---

## Live URL

https://route-pulse-fe.vercel.app/

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router v6** for client-side routing
- **Axios** for API communication
- **Lucide React** for icons

---

## Features

### User
- Register and log in securely with JWT authentication
- View personal dashboard with booking stats and upcoming trips
- Browse and search available trips by city
- Select seats visually with an interactive seat selector
- Book trips and view confirmed/cancelled bookings

### Admin
- Manage routes (create, view)
- Manage buses (view, registered by drivers)
- Create and manage trips with departure/arrival times and fares
- Overview dashboard with trip, route, and bus statistics

### Driver
- Dedicated driver dashboard
- Register buses to the system

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Modal.tsx
│   └── SeatSelector.tsx
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── LandingPage.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── DriverRegister.tsx
│   ├── UserDashboard.tsx
│   ├── BookTripPage.tsx
│   ├── AdminDashboard.tsx
│   └── DriverDashboard.tsx
├── router/
│   └── Router.tsx
└── service/
    ├── api.ts
    ├── trips.ts
    ├── bookings.ts
    ├── routes.ts
    └── buses.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [RoutePulse backend](https://github.com/dadithya01/RoutePulse-BE) (Express + MongoDB)

### Installation

```bash
git clone https://github.com/dadithya01/RoutePulse-FE.git
cd RoutePulse-FE
npm install
```

### Environment Setup

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Adjust the URL to match your backend server.

### Running the App

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

---

## Role-Based Access

The app uses JWT-based authentication with role-based route protection:

| Role   | Access                                      |
|--------|---------------------------------------------|
| USER   | Dashboard, Book Trip                        |
| ADMIN  | Admin Dashboard (trips, routes, buses)      |
| DRIVER | Driver Dashboard (bus registration)         |

Unauthenticated users are redirected to the landing page. Accessing a route without the correct role shows an "Access Denied" screen.

---

## Backend

This frontend is designed to work with the RoutePulse backend API. Make sure the following endpoints are available:

| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| POST   | /auth/login               | Login                     |
| POST   | /auth/register            | Register user             |
| GET    | /auth/me                  | Get current user          |
| GET    | /auth/user/dashboard      | User dashboard data       |
| GET    | /trips                    | List upcoming trips       |
| POST   | /trips                    | Create a trip (Admin)     |
| GET    | /bookings/my-history      | User's booking history    |
| POST   | /bookings                 | Book seats                |

---

## License

MIT
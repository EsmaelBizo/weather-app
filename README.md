# 🌤️ Weather App

A responsive Vue 3 single-page weather application built with **Vite** and **Tailwind CSS** for quickly searching and saving city forecasts.

The application includes loading skeletons, async city views, and a lightweight client-side store for managing saved cities.

### 🚀 Live Demo
https://what-the-weather-app.netlify.app

---

## ✨ Features

### 🔍 Search
- Search for weather information by city name.
- View current weather conditions instantly.

### 📌 Saved Cities
- Save favorite cities for quick access.
- Remove cities from the saved list at any time.

### ⚡ Async Loading
- Lazy-loaded views and components.
- Skeleton screens for a smoother user experience.

### 📱 Responsive Design
- Mobile-first interface built with Tailwind CSS.
- Optimized for desktop, tablet, and mobile devices.

### ♿ Accessibility
- Semantic HTML structure.
- Keyboard-friendly navigation and interactions.

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| Vue 3 | Frontend Framework |
| Vite | Build Tool & Development Server |
| Tailwind CSS | Utility-First CSS Framework |
| JavaScript (ES Modules) | Application Logic |
| Local Store | Client-side state management |

---

## 🚀 Quick Start

### Prerequisites

Make sure you have:

- Node.js v16+
- npm (or pnpm / yarn)

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```text
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── main.js
├── App.vue
│
├── views
│   ├── HomeView.vue
│   └── CityView.vue
│
├── components
│   ├── CityList.vue
│   ├── CityCard.vue
│   └── Navigation.vue
│
├── stores
│   └── cities.js
│
└── assets
    └── main.css
```

---

## 🌎 Environment Variables

If the application uses an external weather API, create a `.env.local` file in the project root:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

If the API URL is configurable:

```env
VITE_WEATHER_API_URL=your_api_url_here
```

> After modifying environment variables, restart the development server.

---

## 🧑‍💻 Development Notes

### Styling

Tailwind CSS utility classes are used throughout the application.

Main stylesheet:

```text
assets/main.css
```

### Routing

Application routes are configured in:

```text
index.js
```

### Async Components

Some views and components are lazy-loaded and use skeleton fallbacks:

- `AsyncCityView.vue`
- `AsyncCityViewSkeleton.vue`

### Local Persistence

Saved cities are stored locally using the client-side store:

```text
stores/cities.js
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Add tests where applicable.
5. Open a Pull Request.

Please provide a clear description of your changes and link any related issues.

---

## 📬 Contact

**Esmael Bizo**

- GitHub: https://github.com/EsmaelBizo
- LinkedIn: https://linkedin.com/in/esmael-bizo-9324413a1

---

⭐ If you found this project useful, consider giving it a star.

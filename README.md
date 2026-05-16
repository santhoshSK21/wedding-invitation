# 💍 Wedding Invitation

A 3D animated wedding invitation web app built with **React + Vite**, **Three.js (React Three Fiber)**, and **Framer Motion**.

## ✨ Features

- 3D CSS animated envelope opening screen
- React Three Fiber 3D hero scene (floating petals, wedding rings, stars, bloom)
- Animated invitation card with QR code for venue location
- 3D animated photo gallery with mouse-tracking tilt cards
- Live countdown timer to the wedding date
- Two-day event timeline 
- Contact section with Call & WhatsApp buttons
- Floating action menu: Save-the-date (.ics), WhatsApp share, QR invite, Dark/Light mode
- Background music player (add `wedding-music.mp3` to `/public/`)
- Fully responsive · Dark mode · Creamy white + violet theme

## 📅 Wedding Details

| Event | Date | Time |
|-------|------|------|


## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 🎵 Background Music

Place a file named `wedding-music.mp3` in the `public/` folder. The music player appears automatically after the invitation opens.

## 📞 Update Contact Numbers

Edit the `contacts` array in `src/components/ContactSection.jsx` with real phone numbers.

## 🛠️ Tech Stack

- React 19 + Vite 8
- Three.js · @react-three/fiber · @react-three/drei · @react-three/postprocessing
- Framer Motion 12
- qrcode.react
- Google Fonts (Great Vibes, Playfair Display, Lato)

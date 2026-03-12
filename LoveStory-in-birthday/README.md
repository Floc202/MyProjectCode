# 🎂 Birthday Website for Bé Nấm

A romantic interactive birthday website created to celebrate **Bé Nấm’s birthday (23/03)** and the **251-day journey** together since **15/07/2025**.

This website presents memories, photos, and messages in a **mobile-first story format**, guiding Bé Nấm through a sequence of pages that gradually reveal the story before ending with a birthday surprise.

The experience is designed to feel like a **digital memory album**.

---

# ❤️ Project Purpose

The goal of this project is to create a **personal, emotional, and memorable digital gift**.

Instead of a static message, the website provides an interactive experience where Bé Nấm can:

* Revisit important relationship moments
* View photos and memories
* Read a personal letter
* Experience a birthday surprise

The entire flow builds emotional progression leading to the final birthday celebration.

---

# 📱 Target Platform

Primary device: **Mobile phone**

Reason:

* Bé Nấm will most likely open the website from a phone.
* Mobile provides a more intimate experience.
* Vertical storytelling fits naturally on mobile screens.

Design strategy:

* Mobile-first layout
* Full screen sections (100vh)
* Simple navigation buttons
* Minimal scrolling

Target width:

320px – 420px

---

# 🎨 Design Concept

## Theme

Cute, romantic, and warm.

## Color Palette

Pastel colors are used to create a soft and cozy feeling.

Pastel Pink
`#ffd6e7`

Soft Purple
`#e9ddff`

Cream
`#fff6f0`

Gradient background:

linear-gradient(45deg, #ffd6e7, #e9ddff)

---

## Typography

Titles
Dancing Script

Body Text
Poppins

These fonts help create a romantic and playful style.

---

# ✨ Core Features

The website combines storytelling with animations and multimedia.

Main features include:

* Preloader animation
* Background music
* Photo gallery
* Timeline of memories
* Interactive navigation
* Typing text animation
* Animated counters
* Fireworks celebration
* Birthday music

---

# ⏳ Preloader Screen

Because the website contains **20+ photos and music**, a preloader ensures that all assets load before the experience begins.

## Purpose

* Prevent images appearing gradually
* Ensure smooth first impression
* Improve user experience on slower connections

## Visual Design

Center animation: beating heart ❤️

Message displayed:

"Đợi một chút nhé Bé Nấm...
Kỷ niệm của tụi mình đang hiện ra."

The preloader fades out once all assets finish loading.

---

# 🎵 Music System

The website uses **two music layers**.

## Background Music

Soft instrumental music plays throughout the story.

Characteristics:

* piano / lo-fi style
* low volume
* loop enabled

Music begins after the user presses the **Start** button.

This avoids autoplay restrictions on mobile browsers.

---

## Birthday Music

At the final page, background music fades out and birthday music begins.

Song:

Happy Birthday to You

The song is triggered when the user opens the birthday gift.

---

# 🧭 Website Structure

The website contains **7 main pages** presented sequentially.

Users move through the story using **Next / Back navigation buttons**.

---

# Page 1 — Welcome

Purpose:

Introduce the experience and invite Bé Nấm to begin.

Background:

Photo of Bé Nấm with a pastel gradient overlay.

Content example:

Hi Bé Nấm ❤️

Hôm nay là một ngày đặc biệt.
Vì hôm nay là ngày Bé Nấm được sinh ra.

Trước khi tới quà sinh nhật...
anh muốn bé xem lại hành trình của tụi mình.

Features:

* typing text animation
* floating hearts animation
* Start button

---

# Page 2 — 251 Days Together

Purpose:

Show how long the relationship has lasted.

Key dates:

Start date
15/07/2025

Birthday date
23/03/2026

Animated counter:

0 → 251 days

Message example:

"251 ngày bên nhau rồi đó Bé Nấm."

---

# Page 3 — Our Story (Timeline)

Purpose:

Highlight important moments in the relationship.

Timeline events:

15/07/2025
The day the relationship officially began.

25/07/2025
The day the couple almost stopped continuing together.

23/03/2026
Bé Nấm’s birthday.

Features:

* animated timeline
* fade-in cards
* optional photos

---

# Page 4 — Photo Gallery

Purpose:

Display memorable photos of Bé Nấm.

Assets:

20+ photos available.

Layout:

2-column mobile grid.

Features:

* image zoom effect
* lightbox viewer
* smooth hover animation

Message example:

"Trong điện thoại anh có rất nhiều ảnh Bé Nấm."

---

# Page 5 — Things I Love About Bé Nấm

Purpose:

Express appreciation and affection.

Cards may include:

* Your smile
* The way you care about people
* When you get mad (still cute)
* Your adorable personality
* The happiness you bring

Features:

* flip card animation
* soft hover effects

---

# Page 6 — Love Letter

Purpose:

Deliver a heartfelt message with a touch of humor.

Tone:

Cute, sincere, and playful.

Example message:

"Bé Nấm à,

Anh cũng không ngờ là tụi mình đã đi được 251 ngày rồi.

Trong 251 ngày này có vui có buồn, có lúc cãi nhau…
nhưng may là tụi mình vẫn chưa block nhau.

Anh hy vọng sau 251 ngày này
sẽ còn nhiều ngày nữa."

Features:

* typing text animation
* fade-in effect

---

# Page 7 — Birthday Surprise

Purpose:

Create the emotional climax of the experience.

Interaction:

User presses:

Open your birthday gift

Result:

* fireworks animation
* birthday music starts
* final message appears

Message example:

Happy Birthday Bé Nấm 🎂

Cảm ơn bé vì đã xuất hiện trong cuộc đời anh.

Additional detail:

Display relationship duration:

15/07/2025 → 23/03/2026
251 days with Bé Nấm

Buttons available:

Back
Replay Story

---

# 🔁 Replay Option

The final page includes a **Replay Story** button.

This allows Bé Nấm to experience the entire story again from the beginning.

---

# 🎇 Animations Used

The website includes the following animations:

Floating hearts
Typing text animation
Scroll fade-in
Photo zoom effect
Flip cards
Day counter animation
Fireworks celebration
Page transition animation

---

# 🛠 Technology Stack

Frontend only.

HTML5
CSS3
JavaScript

No backend is required.

---

# 📚 Libraries Used

AOS (Animate On Scroll)
Used for scroll animations.

Typed.js
Creates typing text effects.

Lightbox
Displays gallery images in full view.

Canvas Confetti
Used to simulate fireworks animation.

Google Fonts
Provides typography.

---

# 📂 Project Structure

birthday-nam/

index.html

css/
style.css

js/
script.js

images/
(photo files)

music/
background-music.mp3
happy-birthday.mp3

---

# 🚀 Deployment

Once completed, the website can be deployed online.

Recommended platforms:

GitHub Pages
Vercel
Netlify

Deployment allows sending a simple link for Bé Nấm to open the website.

---

# ❤️ Author

Created by:
Anh

For:
Bé Nấm

To celebrate her birthday and the **251 days together**.

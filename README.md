# Deadline Radar: Smart Assignment Tracker

![Deadline Radar Banner](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**Deadline Radar** is a futuristic, highly immersive 3D productivity dashboard designed to help students and professionals track their assignments and upcoming deadlines. Built without heavy frameworks for maximum performance, it features a physics-based UI, glassmorphism aesthetics, and intelligent urgency indicators.

## ✨ Features

- **Immersive 3D Interface**: Advanced CSS 3D transforms combined with dynamic JavaScript `mousemove` calculations create a realistic, interactive tilt effect on all assignment cards.
- **Intelligent Urgency Tracking**: Deadlines are color-coded based on proximity—Red (<24 hrs), Yellow (<72 hrs), and Green (Safe).
- **Dynamic Countdown Timers**: Real-time progress rings powered by `conic-gradient` masks map exact start dates to end dates, ensuring perfect visual representation of remaining time.
- **Particle Network Background**: A custom lightweight HTML5 Canvas rendering of moving particles creates continuous background depth.
- **Scroll Animations**: Smooth GSAP `ScrollTrigger` timelines guide users effortlessly through the application.
- **Full Task Management**: Integrated support for starting, completing, and deleting tasks dynamically from the UI.

## 🚀 Quick Start

Because Deadline Radar is built entirely with vanilla web technologies, you do not need to install complex dependencies like Node.js or Webpack to run or modify it locally.

### Prerequisites (Optional)
To bypass browser security restrictions when utilizing local `file:///` URLs (which can sometimes prevent external API calls or certain advanced JS features), we recommend using a local development server.

1. Clone the repository:
   ```bash
   git clone https://github.com/VptrCipher/deadline-radar.git
   ```
2. Navigate to the project directory:
   ```bash
   cd deadline-radar
   ```
3. Run a local server. If you have **Python** installed:
   ```bash
   # Windows
   py -m http.server 8080
   
   # Mac/Linux
   python3 -m http.server 8080
   ```
4. Open your browser and navigate to `http://localhost:8080`.

## 🛠️ Architecture

This project is intentionally built as a lightweight, performant pure HTML/CSS/JS stack:
- `index.html`: Foundational document structure and Semantic HTML5 layout.
- `style.css`: Contains CSS Custom Properties (Variables) for theming, Awwwards-style typography (Space Grotesk & Outfit), and advanced glassmorphism rendering via `backdrop-filter`.
- `script.js`: Manages state array logic, Canvas drawing loops, event listeners for the physics engine, and exact time formatting algorithms.

## 🤝 Contributing

Contributions are always welcome. If you have ideas for new features, themes, or optimizations, please feel free to fork the repository, make your changes, and submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

# Interactive Typing Speed Test App

## Goal

To provide an engaging, web-based typing speed test where users can measure their WPM (Words Per Minute) and typing accuracy across multiple difficulty levels with real-time feedback, timed countdowns, and high-score tracking. 

---

## Architecture & Tech Stack

The application uses client-side JavaScript for dynamic DOM updates, real-time input validation, and local data fetching: 
- **Asynchronous Data Layer:** Fetches text passages from a local `data.json` file based on the selected difficulty tier (Easy, Medium, Hard). 
- **Keypress Event Handling:** Captures global `keydown` events to validate character inputs in real-time, wrap correct/incorrect keystrokes in styled HTML `<span>` tags, and recalculate accuracy metrics dynamically. 
- **Game State Management:** Controls game setup, countdown timers, passage blurring/unblurring, and modal views for test completion and personal best benchmarks. 

### Project Stack Breakdown

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3 
- **Data Source:** `data.json` (Structured passages for Easy, Medium, and Hard tiers) 
- **Design & Assets:** Custom UI Layout, High Score Screens, Dynamic Confetti Animations 

---

## Key Features & Functionality

- **Multiple Difficulty Tiers:** Choose between Easy, Medium, and Hard difficulty levels, each fetching unique text passages. 
- **Real-Time Performance Metrics:**
  - **WPM (Words Per Minute):** Tracks completed words dynamically as spacebars and characters are typed. 
  - **Accuracy (%):** Calculates live accuracy based on total correct vs. incorrect keystrokes. 
  - **Timed Mode:** Integrated 60-second countdown timer that initiates automatically on the first keystroke. 
- **Visual Keystroke Feedback:** Dynamically highlights typed characters in real time (correct vs. incorrect styling). 
- **Comprehensive Results Modal:** End-of-test summary displaying final WPM, accuracy %, correct/incorrect stroke counts, personal best updates, and celebratory confetti animations on high scores. 

---

## How to Run

Because this project is built with standard web technologies, no build tools or external packages are needed. 

### Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/iammaou/typing-speed-test.git
   cd typing-speed-test
   ``` 

2. **Run the Application:**
   - Open `index.html` using a local development server (such as VS Code's *Live Server*) to allow fetching the local `data.json` file via the Fetch API. 

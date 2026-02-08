# ValoCoach Frontend Intern Assignment: Requirements
**Project:** Valorant Player Dashboard
**Deadline:** 24 Hours from receipt
**Expected Effort:** 8-12 Hours

---

## 🎯 Project Vision
Build a match history dashboard that fetches player data and displays statistics in a beautiful, interactive, and gaming-themed UI.

---

## ✅ Core Requirements (Must Have)

### 1. Player Profile Card
- **Data Points:** `player_name`, `current_rank`, `player_account_level`, and `player_card_link` (avatar).
- **Goal:** A visually striking card that establishes the player's identity.

### 2. Overall Statistics
- **Data Points:** K/D ratio, Headshot %, Win Rate, and ACS (Average Combat Score).
- **Goal:** Display the "big numbers" in an easy-to-read, appealing format.

### 3. Match History List
- **Details per Match:** Map name, Agent played, Result (Won/Lost/Draw), K/D, and Date.
- **Goal:** A clean, scrollable list of recent performances.

### 4. Filtering System
- **Functionality:** Filter the match history by "Won", "Lost", or "All".
- **Goal:** Interactive UX via buttons or a dropdown menu.

---

## ✨ Bonus Features (Nice to Have)
- **Theming:** Dark/Light mode toggle (Gaming dashboards usually lean dark).
- **Animations:** Subtle hover animations on match cards.
- **Data Visualization:** A simple bar chart showing performance by map (using Recharts or similar).
- **Search:** Search functionality for specific Agents or Maps within the history.
- **Mobile First:** Fully responsive design for all screen sizes.

---

## 💻 Technical Guidelines
- **Framework:** Next.js (React).
- **Styling:** Tailwind CSS (Preferred), CSS Modules, or Styled Components.
- **Data Source:** Use the provided `player.json` (139 matches).
- **Data Fetching:** Fetch locally from `public/data/player.json` or use Next.js API routes.

---

## ⭐ Evaluation Criteria
1. **Completion (25%):** All core features implemented.
2. **Visual Design (30%):** Gaming aesthetic, clean UI, and "Master of Frontend" polish.
3. **Code Quality (20%):** Organized, readable, and maintainable TypeScript.
4. **Responsiveness (15%):** Performance on mobile and tablet.
5. **Bonus Points (10%):** Animations, charts, and dark mode.

---

## 📦 Submission Checklist
- [ * ] Create a GitHub repository.
- [ ] Include a comprehensive `README.md` (Setup, Features, Challenges, Time Spent).
- [ ] Deploy to Vercel (or Netlify).
- [ ] Send GitHub Repo Link + Live Demo URL to `contact@valocoach.ai`.

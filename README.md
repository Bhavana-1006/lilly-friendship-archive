# 📜 Friendship Archive — Confidential Dossier (25.09.2023)

A cinematic, intimate, interactive friendship surprise web experience and digital treasure hunt designed for your best friend.

---

## 🎨 Experience Progression

1. **Stage 1 — Mysterious Opening**: Full-width classified dossier with character-by-character typewriter animation and story prologue: *"You made a website for my birthday once. So I decided to create something back for you."*
2. **Stage 2 — Friendship.exe Installation**: Interactive animated component installer (First memory, random conversations, inside jokes, unnecessary arguments, laughing at nothing, etc.).
3. **Stage 3 — Live Friendship Counter**: Continuous real-time countdown from **25 September 2023** calculating years, months, days, hours, minutes, and seconds dynamically using calendar-aware arithmetic.
4. **Stage 4 — Where It All Started (Timeline)**: Vertical scrapbook timeline with taped polaroids, pencil lines, and expandable photos.
5. **Stage 5 — Memory Archive**: Interactive memory envelopes (*The Beginning*, *The Chaos*, *The Laughs*, *The Quiet Moments*, *The Ones I Never Want To Forget*) that open into rich dossier modals.
6. **Stage 6 — Friendship Quiz ("How Well Do You Know Us?")**: Interactive quiz with instant feedback, wrong answer retry, and level unlock status.
7. **Stage 7 — Treasure Hunt Clue System**: Confidential clue seals with classified stamps, torn paper aesthetics, hints, and password validation.
8. **Stage 8 — Final Clue & Quiet Transition**: Intimate pencil stroke transition drawing the `25 • 09 • 2023` origin line.
9. **Stage 9 — Hand-Drawn Pencil Portrait Reveal**: Progressive sketching animation from blank canvas → pencil outlines → shading → complete hand-drawn graphite portrait.
10. **Stage 10 — The Physical Gift Moment ("LOOK BEHIND YOU.")**: Dramatic build-up revealing that the real hand-drawn portrait is waiting offline in the real world, finishing with celebratory confetti and *"ARCHIVE COMPLETE. Happy Birthday!"*

---

## ✏️ How to Personalize the Content

All text, memories, quiz questions, treasure hunt clues, and photos are configured in **one single file**:

📁 [`src/config/friendshipConfig.js`](file:///C:/Users/pc/.gemini/antigravity-ide/scratch/friendship-archive/src/config/friendshipConfig.js)

### What You Can Edit:
- **`friendName` & `myName`**: Names displayed across headers, quizzes, and final greetings.
- **`meetingDate`**: Friendship origin date (`2023-09-25T00:00:00`).
- **`timelineEvents`**: Add, remove, or modify scrapbook polaroids, dates, and captions.
- **`memories`**: Customize the 5 interactive memory envelopes with your own photos and personal messages.
- **`quizQuestions`**: Change the questions, options, and correct answers.
- **`treasureHuntClues`**: Update riddles, hints, and acceptable answers for the treasure hunt.
- **`portrait`**: Replace the artwork image with your own portrait photo or drawing.

---

## 🖼️ Uploading Your Actual Hand-Drawn Portrait

Place your scanned or photographed pencil portrait into:

📁 `public/assets/portrait.jpg`

The website will automatically load and animate your custom portrait. (A high-resolution artistic pencil sketch placeholder is already included as a demonstration).

---

## 🚀 Running the Project

```bash
# Navigate to project directory
cd C:\Users\pc\.gemini\antigravity-ide\scratch\friendship-archive

# Start development server
npm run dev

# Or build for production
npm run build
```

---

## 🤫 Secret Easter Eggs Included
1. **5 Clicks on the Dossier / Pencil Icon** in the top navigation reveals a secret handwritten message.
2. **"Inspect margin note"** button in the footer opens a confidential margin memo.

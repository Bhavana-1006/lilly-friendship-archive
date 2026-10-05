/**
 * ============================================================================
 * FRIENDSHIP ARCHIVE — MASTER CONFIGURATION FILE
 * ============================================================================
 * 
 * Edit any of the variables and arrays below to personalize this entire experience.
 * All stages (Counter, Timeline, Memory Envelopes, Quiz, Treasure Hunt, Portrait)
 * read directly from this file.
 */

export const friendshipConfig = {
  // --------------------------------------------------------------------------
  // CORE IDENTIFIERS & ORIGIN DATE
  // --------------------------------------------------------------------------
  friendName: "Alex",                  // Your best friend's name
  friendNickname: "Bestie",            // Optional affectionate nickname
  myName: "Sam",                       // Your name
  
  // The exact origin date of your friendship: 25 September 2023
  // Format: YYYY-MM-DD or ISO string. The live counter calculates elapsed time dynamically from this.
  meetingDate: "2023-09-25T00:00:00",
  meetingDateDisplay: "25 • 09 • 2023",
  meetingDateFullDisplay: "25 September 2023",

  // --------------------------------------------------------------------------
  // STAGE 1 & 2: PROLOGUE & INSTALLATION MESSAGES
  // --------------------------------------------------------------------------
  prologue: {
    badge: "CLASSIFIED DOSSIER",
    encryptedTitle: "AN ARCHIVE HAS BEEN FOUND.",
    status: "STATUS: ENCRYPTED",
    originCode: "ORIGIN: 25.09.2023",
    classification: "MEMORIES: CLASSIFIED // LEVEL 5",
    subtextLine1: "You made a website for my birthday once.",
    subtextLine2: "So I decided to create something back for you.",
    ctaButton: "BEGIN THE EXPERIENCE",
  },

  installationItems: [
    { name: "First memory", icon: "sparkles", duration: 700 },
    { name: "Random midnight conversations", icon: "message-circle", duration: 800 },
    { name: "Inside jokes nobody else understands", icon: "laugh", duration: 650 },
    { name: "Unnecessary arguments over trivial things", icon: "flame", duration: 750 },
    { name: "Laughing at absolutely nothing", icon: "smile", duration: 600 },
    { name: "Helping each other through the worst days", icon: "shield", duration: 900 },
    { name: "Unforgettable memories & chaotic adventures", icon: "camera", duration: 800 },
    { name: "Lifetime best-friend privileges", icon: "heart-handshake", duration: 750 }
  ],

  installationFooterText: "Somehow, it has been running seamlessly ever since.",

  // --------------------------------------------------------------------------
  // STAGE 3: COUNTER SECTION TEXT
  // --------------------------------------------------------------------------
  counterSection: {
    heading: "WE'VE BEEN US FOR",
    subheading: "And the counter is still running every second.",
    totalDaysCaption: "That's approximately {totalDays} days of being wonderfully stuck with each other."
  },

  // --------------------------------------------------------------------------
  // STAGE 4: TIMELINE EVENTS (Scrapbook / Vertical timeline)
  // --------------------------------------------------------------------------
  timelineEvents: [
    {
      id: "event-1",
      date: "25.09.2023",
      title: "Where It All Started",
      description: "The moment our paths crossed. Neither of us knew that this random day would become the start of the most important friendship of our lives.",
      tag: "ORIGIN",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      imageCaption: "Day 001 — The genesis."
    },
    {
      id: "event-2",
      date: "Late 2023",
      title: "The First Core Memory",
      description: "That one evening when we talked for hours without looking at the clock. The transition from 'people who know each other' to 'partners in crime'.",
      tag: "UNLOCKED",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
      imageCaption: "Polaroid #02 — When conversations never had an end."
    },
    {
      id: "event-3",
      date: "Mid 2024",
      title: "One of Our Most Chaotic Days",
      description: "Unfiltered laughing fits, plans that went completely off the rails, and turning an ordinary afternoon into an unforgettable story.",
      tag: "CHAOS",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      imageCaption: "Polaroid #03 — Complete unfiltered madness."
    },
    {
      id: "event-4",
      date: "Early 2025",
      title: "Weathering The Storms",
      description: "Through every challenge, stress point, and tough decision, having someone who listens without judgement made all the difference.",
      tag: "SUPPORT",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      imageCaption: "Polaroid #04 — Always in each other's corner."
    },
    {
      id: "event-5",
      date: "TODAY & BEYOND",
      title: "Somehow We're Still Here",
      description: "A thousand shared smiles, countless inside jokes, and an unspoken agreement that we're stuck with each other forever.",
      tag: "PRESENT",
      image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      imageCaption: "Polaroid #05 — To infinite more chapters."
    }
  ],

  // --------------------------------------------------------------------------
  // STAGE 5: INTERACTIVE MEMORY ENVELOPES
  // --------------------------------------------------------------------------
  memories: [
    {
      id: "mem-001",
      code: "MEMORY 001",
      title: "The Beginning",
      stamp: "25.09.2023",
      tagline: "The day our universe aligned",
      previewText: "A handwritten record of the first conversation...",
      date: "September 25, 2023",
      fullMessage: "Looking back, it's wild how an ordinary day became the cornerstone of my entire year. If anyone told me back then how important you'd become to me, I wouldn't have believed them.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      note: "P.S. I still remember the exact first thing you said.",
      quote: "Some people arrive and make such a beautiful impact on your life, you can barely remember what life was like without them."
    },
    {
      id: "mem-002",
      code: "MEMORY 002",
      title: "The Chaos",
      stamp: "CHAOTIC GOOD",
      tagline: "Unplanned adventures & spontaneous ideas",
      previewText: "Proof that we should never be left unsupervised...",
      date: "Spring Adventure",
      fullMessage: "Whenever we get an idea, things either turn into a masterpiece or total hilarious disaster. There is no middle ground, and I wouldn't trade that chaos for the world.",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      note: "Evidence item #402: We still laugh about this whenever it comes up.",
      quote: "We don't need a map, we just need each other and a bad sense of direction."
    },
    {
      id: "mem-003",
      code: "MEMORY 003",
      title: "The Laughs",
      stamp: "INSIDE JOKES",
      tagline: "Laughter that makes your stomach hurt",
      previewText: "Things that only make sense to the two of us...",
      date: "Countless Late Nights",
      fullMessage: "You know that breathless laughter where you can't even speak and everyone else in the room is confused? That is my favorite thing with you.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      note: "Warning: Contains 99+ inside jokes classified as strictly confidential.",
      quote: "Laughter is the shortest distance between two best friends."
    },
    {
      id: "mem-004",
      code: "MEMORY 004",
      title: "The Quiet Moments",
      stamp: "SANCTUARY",
      tagline: "Comfortable silences & real talks",
      previewText: "When words weren't even necessary...",
      date: "Every Tough Day",
      fullMessage: "True friendship isn't just about the noisy celebrations. It's about having someone you can sit in complete silence with, knowing you are understood and supported.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      note: "Thank you for always being my safe space.",
      quote: "A true friend is someone who reaches for your hand and touches your heart."
    },
    {
      id: "mem-005",
      code: "MEMORY 005",
      title: "The Ones I Never Want To Forget",
      stamp: "TIMELESS",
      tagline: "Etched into memory permanently",
      previewText: "A collection of little moments that mean everything...",
      date: "Forever Ongoing",
      fullMessage: "Every little shared playlist, every screenshot, every mutual sigh of relief. If my life were a book, the chapters with you would have the dog-eared, well-loved pages.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      note: "Here is to filling a hundred more notebooks with memories.",
      quote: "Friendship is the only cement that will ever hold the world together."
    }
  ],

  // --------------------------------------------------------------------------
  // STAGE 6: INTERACTIVE FRIENDSHIP QUIZ
  // --------------------------------------------------------------------------
  quizQuestions: [
    {
      id: "q1",
      question: "On what exact date was the friendship archive officially founded?",
      options: [
        "15 August 2023",
        "25 September 2023",
        "01 October 2023",
        "25 December 2023"
      ],
      correctIndex: 1, // 25 September 2023
      unlockedHint: "Memory verified: The day everything changed.",
      wrongMessage: "Nice try! Check the dossier header — you know this date by heart."
    },
    {
      id: "q2",
      question: "When things get chaotic or plans go off course, what is our usual reaction?",
      options: [
        "Panic and cancel everything immediately",
        "Blame each other for 3 days straight",
        "Start laughing uncontrollably and roll with it",
        "File a formal written complaint"
      ],
      correctIndex: 2, // Laughing uncontrollably
      unlockedHint: "Protocol confirmed: Chaotic laughter is our default setting.",
      wrongMessage: "Nope! Since when do we ever panic when things get funny?"
    },
    {
      id: "q3",
      question: "What is the primary currency of our midnight conversations?",
      options: [
        "Deep philosophical life theories mixed with unhinged memes",
        "Formal polite small talk about the weather",
        "Financial market stock tips",
        "Total silence"
      ],
      correctIndex: 0, // Deep life theories & memes
      unlockedHint: "Database match: 2:00 AM existential talks verified.",
      wrongMessage: "Come on, when have we ever talked about the weather?"
    },
    {
      id: "q4",
      question: "Why was this website created in the first place?",
      options: [
        "Just a random computer science homework project",
        "Because you made a website for my birthday, and I wanted to make something for you",
        "An automated test script gone rogue",
        "To win a coding trophy"
      ],
      correctIndex: 1, // Return the favor
      unlockedHint: "Access Granted: Reciprocal love & appreciation detected.",
      wrongMessage: "You know the real reason. Think about what you did for my birthday!"
    },
    {
      id: "q5",
      question: "What is the ultimate rule of our friendship contract?",
      options: [
        "Must text back within 3.5 seconds",
        "Never share food",
        "Best-friend privileges are permanent and non-refundable",
        "Strict formal handshakes only"
      ],
      correctIndex: 2, // Non-refundable
      unlockedHint: "Contract status: Binding for life. No exits.",
      wrongMessage: "You're not getting out of this friendship that easily!"
    }
  ],

  // --------------------------------------------------------------------------
  // STAGE 7: TREASURE HUNT CLUES
  // --------------------------------------------------------------------------
  treasureHuntClues: [
    {
      id: 1,
      badge: "CLUE 01 // ARCHIVE KEY",
      title: "The Genesis Coordinate",
      riddle: "I am the two-digit day of the month when our story began. Type the day number to unlock the first seal.",
      hint: "Think of 25.09.2023. What is the day number?",
      acceptableAnswers: ["25", "twenty-five", "twenty five", "day 25"],
      unlockedMessage: "SEAL 01 BROKEN: The origin point is confirmed.",
      sketchIcon: "calendar"
    },
    {
      id: 2,
      badge: "CLUE 02 // CODEWORD",
      title: "The Unspoken Language",
      riddle: "What single word describes the inside jokes, midnight talks, and chaos that we share?",
      hint: "Starts with 'F', ends with 'P' (or type: 'friendship' or 'memories').",
      acceptableAnswers: ["friendship", "memories", "love", "chaos", "bond", "us"],
      unlockedMessage: "SEAL 02 BROKEN: Connection frequency matched.",
      sketchIcon: "heart"
    },
    {
      id: 3,
      badge: "CLUE 03 // THE OFFLINE REALITY",
      title: "Beyond The Screen",
      riddle: "Where is the greatest, most tangible surprise in this entire world located right now? (Type: 'offline' or 'real world' or 'here')",
      hint: "Is it inside this digital screen, or waiting in the real physical world?",
      acceptableAnswers: ["offline", "real world", "reality", "physical", "here", "real life", "outside"],
      unlockedMessage: "FINAL SEAL BROKEN: Physical coordinates engaged.",
      sketchIcon: "compass"
    }
  ],

  // --------------------------------------------------------------------------
  // STAGE 9 & 10: PORTRAIT & PHYSICAL REVEAL
  // --------------------------------------------------------------------------
  portrait: {
    // You can replace this path with your own image (e.g. /assets/portrait.jpg or any image URL)
    imagePath: "/assets/portrait.jpg",
    // Fallback artist sketch image if the custom asset hasn't been uploaded yet
    fallbackImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    artistNote: "I drew this for you.",
    subtextLine1: "It's not just a picture.",
    subtextLine2: "It's a little piece of our story etched in graphite.",
    infinitySignature: "25.09.2023 → ∞"
  },

  finalPhysicalGiftMoment: {
    pauseLine1: "There's just one problem...",
    pauseLine2: "A picture on a screen will never be enough.",
    pauseLine3: "So...",
    hugeHeadline: "LOOK BEHIND YOU.",
    altHeadline: "NOW GO FIND YOUR PHYSICAL GIFT.",
    ctaButton: "I'M READY",
    completionMessage: "Your hand-drawn pencil portrait is waiting for you in the real world.",
    endingTitle: "ARCHIVE COMPLETE.",
    endingDate: "25.09.2023 — and counting.",
    thankYouText: "Thank you for being the most incredible part of my story.",
    birthdayWish: "Happy Birthday, {friendName}."
  },

  // --------------------------------------------------------------------------
  // EASTER EGGS
  // --------------------------------------------------------------------------
  easterEggs: {
    pencilClicksTarget: 5,
    pencilSecretMessage: "✏️ Secret Note Unlocked: 'No matter where life takes us, you will always be my favorite person to annoy.'",
    footerHiddenNote: "📜 Hidden Margin Note: Created with love, code, graphite, and infinite gratitude.",
    specialDateCode: "25092023"
  }
};

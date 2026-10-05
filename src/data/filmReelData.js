/**
 * ============================================================================
 * CONTINUOUS CINEMATIC FILM REEL — MASTER MONTAGE DATA
 * ============================================================================
 * Continuous uninterrupted movie sequence using all 26 video highlights
 * (muted raw audio) and 16 curated high-res memory photographs.
 * Each piece has cinematic dynamic transitions (coming from left, right,
 * up/top, down/bottom, or blooming/blowing from the center).
 */

export const filmReelScenes = [
  // 1. First Glimpse
  {
    id: 1,
    type: "video",
    src: "/assets/film-reel/clip-01.mp4",
    title: "Pure Laughter",
    subtitle: "The unscripted joy that started our golden journey",
    duration: 6,
    transition: "anim-bloom-center"
  },
  {
    id: 2,
    type: "photo",
    src: "/assets/film-reel/photo-01.jpg",
    title: "Golden Hour",
    subtitle: "When the sunshine met your brightest smile",
    duration: 4.5,
    transition: "anim-slide-left",
    panDirection: "zoom-in"
  },
  {
    id: 3,
    type: "video",
    src: "/assets/film-reel/clip-02.mp4",
    title: "Secret Jokes",
    subtitle: "Language that only true best friends understand",
    duration: 6,
    transition: "anim-slide-bottom"
  },
  {
    id: 4,
    type: "photo",
    src: "/assets/film-reel/photo-02.jpg",
    title: "Natural Aura",
    subtitle: "Effortlessly iconic in every single frame",
    duration: 4.5,
    transition: "anim-slide-right",
    panDirection: "pan-right"
  },
  {
    id: 5,
    type: "video",
    src: "/assets/film-reel/clip-03.mp4",
    title: "Quiet Whispers",
    subtitle: "Where all our deepest thoughts find peace",
    duration: 5,
    transition: "anim-slide-top"
  },
  {
    id: 6,
    type: "photo",
    src: "/assets/film-reel/photo-03.jpg",
    title: "Candid Joy",
    subtitle: "The kind of smile that brightens any room",
    duration: 4.5,
    transition: "anim-bloom-center",
    panDirection: "zoom-out"
  },
  {
    id: 7,
    type: "video",
    src: "/assets/film-reel/clip-04.mp4",
    title: "Unplanned Paths",
    subtitle: "Every wrong turn became an unforgettable story",
    duration: 6,
    transition: "anim-slide-left"
  },
  {
    id: 8,
    type: "photo",
    src: "/assets/film-reel/photo-04.jpg",
    title: "Serenity",
    subtitle: "Grace, poise, and an unmistakable warmth",
    duration: 4.5,
    transition: "anim-slide-bottom",
    panDirection: "pan-left"
  },
  // REPLACED OLD SCENE 9 WITH DYNAMIC NEW VIDEO (clip-24.mp4)
  {
    id: 9,
    type: "video",
    src: "/assets/film-reel/clip-24.mp4",
    title: "Electric Energy",
    subtitle: "Dancing through life with endless enthusiasm",
    duration: 6,
    transition: "anim-bloom-center"
  },
  {
    id: 10,
    type: "photo",
    src: "/assets/film-reel/photo-05.jpg",
    title: "Starlit Days",
    subtitle: "Making the most ordinary days feel deeply poetic",
    duration: 4.5,
    transition: "anim-slide-right",
    panDirection: "zoom-in"
  },
  {
    id: 11,
    type: "video",
    src: "/assets/film-reel/clip-06.mp4",
    title: "Carefree Soul",
    subtitle: "Living in the rhythm of our own symphony",
    duration: 5.5,
    transition: "anim-slide-top"
  },
  {
    id: 12,
    type: "photo",
    src: "/assets/film-reel/photo-06.jpg",
    title: "Loyalty & Warmth",
    subtitle: "A heartbeat of loyalty that never wavers",
    duration: 4.5,
    transition: "anim-slide-left",
    panDirection: "pan-right"
  },
  {
    id: 13,
    type: "video",
    src: "/assets/film-reel/clip-07.mp4",
    title: "Sparkling Giggles",
    subtitle: "Moments that turned into timeless memories",
    duration: 5,
    transition: "anim-bloom-center"
  },
  {
    id: 14,
    type: "photo",
    src: "/assets/film-reel/photo-07.jpg",
    title: "Side by Side",
    subtitle: "Two soulmates navigating the beautiful chaos together",
    duration: 4.5,
    transition: "anim-slide-bottom",
    panDirection: "zoom-out"
  },
  {
    id: 15,
    type: "video",
    src: "/assets/film-reel/clip-08.mp4",
    title: "Fleeting Perfection",
    subtitle: "A glimpse of pure, unfiltered happiness",
    duration: 5,
    transition: "anim-slide-right"
  },
  {
    id: 16,
    type: "photo",
    src: "/assets/film-reel/photo-08.jpg",
    title: "Youthful Glow",
    subtitle: "Bathed in the warm hues of laughter",
    duration: 4.5,
    transition: "anim-slide-top",
    panDirection: "pan-left"
  },
  {
    id: 17,
    type: "video",
    src: "/assets/film-reel/clip-09.mp4",
    title: "Kindred Minds",
    subtitle: "No words required between the two of us",
    duration: 5.5,
    transition: "anim-bloom-center"
  },
  {
    id: 18,
    type: "photo",
    src: "/assets/film-reel/photo-09.jpg",
    title: "Queen of 21",
    subtitle: "Celebrating the sheer brilliance of Lilly",
    duration: 4.5,
    transition: "anim-slide-left",
    panDirection: "zoom-in"
  },
  {
    id: 19,
    type: "video",
    src: "/assets/film-reel/clip-10.mp4",
    title: "Mischief & Magic",
    subtitle: "We were never meant to be ordinary",
    duration: 5,
    transition: "anim-slide-bottom"
  },
  {
    id: 20,
    type: "photo",
    src: "/assets/film-reel/photo-10.jpg",
    title: "Trademark Sparkle",
    subtitle: "That unmistakable twinkle in your eye",
    duration: 4.5,
    transition: "anim-slide-right",
    panDirection: "pan-right"
  },
  {
    id: 21,
    type: "video",
    src: "/assets/film-reel/clip-11.mp4",
    title: "Sweet Reality",
    subtitle: "Better than any dream or fairy tale",
    duration: 4.5,
    transition: "anim-slide-top"
  },
  {
    id: 22,
    type: "photo",
    src: "/assets/film-reel/photo-11.jpg",
    title: "Gentle Heart",
    subtitle: "Softness and strength woven seamlessly",
    duration: 4.5,
    transition: "anim-bloom-center",
    panDirection: "zoom-out"
  },
  {
    id: 23,
    type: "video",
    src: "/assets/film-reel/clip-12.mp4",
    title: "Road Trip Beats",
    subtitle: "Singing out of tune with maximum passion",
    duration: 4.5,
    transition: "anim-slide-left"
  },
  {
    id: 24,
    type: "photo",
    src: "/assets/film-reel/photo-12.jpg",
    title: "Endless Horizons",
    subtitle: "Every sunset spent with you was poetry",
    duration: 4.5,
    transition: "anim-slide-bottom",
    panDirection: "pan-left"
  },
  {
    id: 25,
    type: "video",
    src: "/assets/film-reel/clip-13.mp4",
    title: "Lockets of Memories",
    subtitle: "Treasures locked safely in our hearts",
    duration: 5,
    transition: "anim-slide-right"
  },
  {
    id: 26,
    type: "photo",
    src: "/assets/film-reel/photo-13.jpg",
    title: "Pure Simplicity",
    subtitle: "The sweetest moments are the quietest ones",
    duration: 4.5,
    transition: "anim-slide-top",
    panDirection: "zoom-in"
  },
  {
    id: 27,
    type: "video",
    src: "/assets/film-reel/clip-14.mp4",
    title: "Midnight Talks",
    subtitle: "When the whole world went to sleep",
    duration: 5.5,
    transition: "anim-bloom-center"
  },
  {
    id: 28,
    type: "photo",
    src: "/assets/film-reel/photo-14.jpg",
    title: "Timeless Charm",
    subtitle: "Growing even brighter with each passing year",
    duration: 4.5,
    transition: "anim-slide-left",
    panDirection: "pan-right"
  },
  {
    id: 29,
    type: "video",
    src: "/assets/film-reel/clip-15.mp4",
    title: "Signature Masterpiece",
    subtitle: "A panorama of our shared world",
    duration: 7.5,
    transition: "anim-slide-bottom"
  },
  {
    id: 30,
    type: "photo",
    src: "/assets/film-reel/photo-15.jpg",
    title: "Golden Spirit",
    subtitle: "Leaving warmth everywhere you walk",
    duration: 4.5,
    transition: "anim-slide-right",
    panDirection: "zoom-out"
  },
  {
    id: 31,
    type: "video",
    src: "/assets/film-reel/clip-16.mp4",
    title: "Sweet Chapters",
    subtitle: "The most beautiful pages of our friendship",
    duration: 5,
    transition: "anim-slide-top"
  },
  {
    id: 32,
    type: "photo",
    src: "/assets/film-reel/photo-16.jpg",
    title: "To 21 & Beyond",
    subtitle: "Always in your corner, for every tomorrow",
    duration: 5,
    transition: "anim-bloom-center",
    panDirection: "zoom-in"
  },
  {
    id: 33,
    type: "video",
    src: "/assets/film-reel/clip-17.mp4",
    title: "Electric Pulse",
    subtitle: "Pure unfiltered adrenaline and laughs",
    duration: 5,
    transition: "anim-slide-left"
  },
  {
    id: 34,
    type: "video",
    src: "/assets/film-reel/clip-18.mp4",
    title: "Serenade of Smiles",
    subtitle: "Cherishing every second together",
    duration: 5,
    transition: "anim-slide-bottom"
  },
  {
    id: 35,
    type: "video",
    src: "/assets/film-reel/clip-19.mp4",
    title: "Sweet Echoes",
    subtitle: "When time stood still just for us",
    duration: 5,
    transition: "anim-slide-right"
  },
  {
    id: 36,
    type: "video",
    src: "/assets/film-reel/clip-20.mp4",
    title: "Forever Young",
    subtitle: "Dancing through life with endless grace",
    duration: 5,
    transition: "anim-slide-top"
  },
  {
    id: 37,
    type: "video",
    src: "/assets/film-reel/clip-21.mp4",
    title: "Precious Glimpse",
    subtitle: "A heartbeat of unforgettable warmth",
    duration: 4,
    transition: "anim-bloom-center"
  },
  {
    id: 38,
    type: "video",
    src: "/assets/film-reel/clip-22.mp4",
    title: "Golden Skies",
    subtitle: "Walking toward every new sunrise together",
    duration: 6,
    transition: "anim-slide-left"
  },
  {
    id: 39,
    type: "video",
    src: "/assets/film-reel/clip-23.mp4",
    title: "Unbroken Bond",
    subtitle: "Nothing compares to the comfort of your friendship",
    duration: 5,
    transition: "anim-slide-bottom"
  },
  {
    id: 40,
    type: "video",
    src: "/assets/film-reel/clip-25.mp4",
    title: "Golden Symphony",
    subtitle: "Crafted by time, sealed with eternity",
    duration: 6,
    transition: "anim-slide-right"
  },
  {
    id: 41,
    type: "video",
    src: "/assets/film-reel/clip-26.mp4",
    title: "The Grand Finale",
    subtitle: "To Lilly: Our story continues for all the years ahead",
    duration: 7,
    transition: "anim-bloom-center"
  }
];

// ─── Gallery Data ───────────────────────────────────────────────────────────
// 10 categories × 4 placeholder cards each.
// Replace `imageSrc` with real paths when adding images later.

export interface GalleryCard {
  id: string;
  imageSrc: string; // leave empty string "" for placeholder
  caption?: string;
  objectPosition?: string; // e.g. "top", "center", "bottom", "50% 20%"
}

export interface GalleryCategory {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string; // Tailwind-compatible CSS color for glow
  cards: GalleryCard[];
}

const makeCards = (prefix: string): GalleryCard[] =>
  Array.from({ length: 4 }, (_, i) => ({
    id: `${prefix}-card-${i + 1}`,
    imageSrc: "",
    caption: "",
  }));

export const galleryCategories: GalleryCategory[] = [
  {
    id: "annual-events",
    title: "Annual Events",
    subtitle: "Cherishing milestones that define every academic year",
    accentColor: "#f59e0b",
    cards: [
      { id: "annual-card-1", imageSrc: "/K1.jfif", caption: "" },
      { id: "annual-card-2", imageSrc: "/K2.jfif", caption: "" },
      { id: "annual-card-3", imageSrc: "/K3.jfif", caption: "" },
      { id: "annual-card-4", imageSrc: "/K5.jfif", caption: "" },
    ],
  },
  {
    id: "achievements",
    title: "Awards & Achievements",
    subtitle: "Recognising excellence in academics, sports, and beyond",
    accentColor: "#eab308",
    cards: [
      { id: "achivements-1", imageSrc: "/ac.jpeg", caption: "" },
      { id: "achivements-2", imageSrc: "/ac2.jpeg", caption: "" },
      { id: "achivements-3", imageSrc: "/ac3.jpeg", caption: "" },
      { id: "achivements-4", imageSrc: "/ac4.jpeg", caption: "", objectPosition: "top" },

    ]
  },
  {
    id: "sports-day",
    title: "Sports Day",
    subtitle: "Celebrating the spirit of athleticism and teamwork",
    accentColor: "#22c55e",
    cards: [
      { id: "sports-day-card-1", imageSrc: "/SP1.jfif", caption: "" },
      { id: "sports-day-card-2", imageSrc: "/SP2.jfif", caption: "" },
      { id: "sports-day-card-3", imageSrc: "/SP3.jfif", caption: "" },
      { id: "sports-day-card-4", imageSrc: "/SP4.jfif", caption: "" },

    ]
  },
  {
    id: "cultural-fest",
    title: "Cultural Fest",
    subtitle: "Colours, dance, music — a celebration of our heritage",
    accentColor: "#ec4899",
    cards: [
      { id: "cultural-fest-1", imageSrc: "/KULA 1.jfif", caption: "" },
      { id: "cultural-fest-2", imageSrc: "/pst 2.jfif", caption: "" },
      { id: "cultural-fest-3", imageSrc: "/cul.jpeg", caption: "" },
      { id: "cultural-fest-4", imageSrc: "/cul2.jpeg", caption: "" },

    ]
  },
  {
    id: "Assembly",
    title: "Assembly",
    subtitle: "Morning assembly: setting the tone for learning and discipline",
    accentColor: "#3b82f6",
    cards: [
      { id: "Assembly-1", imageSrc: "/aaa.jpeg", caption: "" },
      { id: "Assembly-2", imageSrc: "/a2.jpeg", caption: "" },
      { id: "Assembly-3", imageSrc: "/a3.jpeg", caption: "" },
      { id: "Assembly-4", imageSrc: "/a4.jpeg", caption: "" },

    ]
  },
  // {
  //   id: "graduation-ceremony",
  //   title: "Graduation Ceremony",
  //   subtitle: "Honouring achievements and new beginnings",
  //   accentColor: "#a855f7",
  //   cards: makeCards("graduation"),
  // },
  // {
  // id: "classroom-life",
  // title: "Classroom Life",
  // subtitle: "Where knowledge meets curiosity every single day",
  // accentColor: "#06b6d4",
  // cards: [
  //    { id: "classroom-life-1", imageSrc: "/cl.jpeg", caption: "" },

  // ]
  // },
  // {
  //   id: "infrastructure",
  //   title: "Campus & Infrastructure",
  //   subtitle: "World-class facilities built for excellence",
  //   accentColor: "#f97316",
  //   cards: makeCards("infra"),
  // },
  // {
  //   id: "workshops",
  //   title: "Workshops & Seminars",
  //   subtitle: "Learning beyond the textbook, hands-on and real",
  //   accentColor: "#14b8a6",
  //   cards: makeCards("workshop"),
  // },
  // {
  //   id: "community-service",
  //   title: "Community Service",
  //   subtitle: "Giving back — because character is built outside classrooms",
  //   accentColor: "#ef4444",
  //   cards: makeCards("community"),
  // },
  {
    id: "science-lab",
    title: "Science Lab",
    subtitle: "Nurturing curiosity and discovery in our state-of-the-art laboratories",
    accentColor: "#0ea5e9",
    cards: [
      { id: "sci-1", imageSrc: "/sci.jpeg", caption: "Science Lab" },
      { id: "sci-2", imageSrc: "/sci2.jpeg", caption: "Scientific Exploration" },
      { id: "sci-3", imageSrc: "/sci3.jpeg", caption: "Laboratory Research" },
      { id: "sci-4", imageSrc: "/sci4.jpeg", caption: "Hands-on Learning" },
    ],
  },
  {
    id: "investiture-ceremony",
    title: "Grand Investiture Ceremony",
    subtitle: "Empowering the leaders of tomorrow",
    accentColor: "#8b5cf6",
    cards: [
      { id: "investiture-1", imageSrc: "/e.jpeg", caption: "Investiture Ceremony" },
      { id: "investiture-2", imageSrc: "/inv.jpeg", caption: "Grand Investiture" },
    ],
  },
];

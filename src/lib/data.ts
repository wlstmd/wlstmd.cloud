export const profile = {
  name: "Jinseung Yu",
  nameKo: "유진승",
  handle: "wlstmd",
  role: "DevOps Engineer",
  tagline: "in training",
  location: "Gyeongbuk, Korea",
  bio: "Aspiring DevOps engineer studying Software Development at Gyeongbuk Software Meister High School. I like automating away repetitive work, sharing what I learn, and building things with a team rather than alone.",
  github: "https://github.com/wlstmd",
  blog: "https://blog.wlstmd.cloud",
};

export const education = {
  school: "Gyeongbuk Software Meister High School",
  major: "Software Development",
  period: "2023.03 — 2026.01",
};

export const certifications = [
  { name: "정보처리산업기사", en: "Industrial Engineer Information Processing", date: "2024.12" },
  { name: "리눅스마스터", en: "Linux Master", date: "2024.06" },
  { name: "정보처리기능사", en: "Craftsman Information Processing", date: "2023.09" },
];

export const stack = {
  proficient: ["AWS", "Kubernetes", "Docker", "Terraform", "ArgoCD", "NestJS"],
  applicable: ["Go", "React", "Git", "CNCF Projects", "Jenkins"],
};

export type Award = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
};

export const awards: Award[] = [
  {
    src: "/images/award-desk.jpg",
    alt: "WorldSkills Korea regional silver medal and certificate on a desk",
    title: "Regional Finals",
    caption: "Gyeongbuk · Silver",
    width: 900,
    height: 1599,
  },
  {
    src: "/images/cc1-web.jpg",
    alt: "Cloud Computing competition venue at the 60th National Skills Competition",
    title: "National Finals Venue",
    caption: "Gwangju · 2025.09",
    width: 1125,
    height: 1500,
  },
  {
    src: "/images/medal-case.jpg",
    alt: "WorldSkills Korea silver medal in its case",
    title: "Silver Medal",
    caption: "Cloud Computing",
    width: 385,
    height: 460,
  },
  {
    src: "/images/cc3-web.jpg",
    alt: "Team hands stacked together before the competition",
    title: "Team",
    caption: "Before the clock started",
    width: 1500,
    height: 1500,
  },
  {
    src: "/images/regional-certificate.jpg",
    alt: "WorldSkills Korea regional competition certificate",
    title: "Regional Certificate",
    caption: "Silver Award",
    width: 900,
    height: 1278,
  },
  {
    src: "/images/national-certificate.jpg",
    alt: "WorldSkills Korea national competition certificate",
    title: "National Certificate",
    caption: "4th · Excellence Award",
    width: 900,
    height: 1273,
  },
  {
    src: "/images/cc2-web.jpg",
    alt: "Cloud Computing competition at the National Skills Competition",
    title: "Competition Day",
    caption: "Cloud Computing",
    width: 1125,
    height: 1500,
  },
];

export const timeline = [
  {
    date: "2025.09",
    title: "National Skills Competition",
    detail: "4th place · Excellence Award",
    note: "60th national finals, Gwangju",
  },
  {
    date: "2025.04",
    title: "Gyeongbuk Regional Competition",
    detail: "Silver Medal",
    note: "Cloud Computing category",
  },
];

export type Service = {
  name: string;
  url: string;
};

export const services: Service[] = [
  { name: "Terminal", url: "https://terminal.wlstmd.cloud" },
  { name: "Blog", url: "https://blog.wlstmd.cloud" },
  { name: "Portfolio", url: "https://portfolio.wlstmd.cloud" },
  { name: "Linux", url: "https://linux.wlstmd.cloud" },
  { name: "Web", url: "https://web.wlstmd.cloud" },
  { name: "Tree", url: "https://tree.wlstmd.cloud" },
  { name: "Keycap", url: "https://keycap.wlstmd.cloud" },
  { name: "KMU Room Finder", url: "https://kmu-room-finder.netlify.app" },
  { name: "Notion Dashboard", url: "https://notion-dashboard.wlstmd.cloud" },
  { name: "Metro Mate", url: "https://metro-mate.netlify.app" },
  { name: "AI Tools", url: "https://ai-tools.wlstmd.cloud" },
];

export const stats = [
  { value: "40+", label: "Blog posts" },
  { value: "3", label: "Certifications" },
  { value: String(services.length), label: "Live services" },
  { value: "4th", label: "National finals" },
];

export const socials = [
  { name: "GitHub", handle: "github.com/wlstmd", url: "https://github.com/wlstmd", icon: "github" },
  { name: "LinkedIn", handle: "linkedin.com/in/wlstmd", url: "https://www.linkedin.com/in/wlstmd", icon: "linkedin" },
  { name: "Instagram", handle: "instagram.com/wlstmd_", url: "https://www.instagram.com/wlstmd_", icon: "instagram" },
] as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "awards", label: "Awards" },
  { id: "services", label: "Services" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

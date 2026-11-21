export const profile = {
  name: "Jinseung Yu",
  nameKo: "유진승",
  handle: "wlstmd",
  role: "DevOps Engineer",
  tagline: "in training",
  location: "Daegu, Korea",
  bio: "Aspiring DevOps engineer and first-year student at Keimyung University's Tabula Rasa College. I like automating away repetitive work, sharing what I learn, and building things with a team rather than alone.",
  github: "https://github.com/wlstmd",
  blog: "https://blog.wlstmd.cloud",
};

export const education = [
  {
    school: "Keimyung University",
    major: "Tabula Rasa College",
    period: "2026.03 — Present",
    note: "GPA 4.5 / 4.5",
  },
  {
    school: "Gyeongbuk Software Meister High School",
    major: "Software Development",
    period: "2023.03 — 2026.01",
    note: null,
  },
];

export const activities = [
  { name: "LIKELION Univ.", nameKo: "멋쟁이사자처럼 대학", role: "Keimyung · Member (아기사자)", period: "2026" },
];

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
    src: "/images/cc1-web.jpg",
    alt: "Cloud Computing competition venue at the 60th National Skills Competition",
    title: "National Finals Venue",
    caption: "Gwangju · 2025.09",
    width: 1125,
    height: 1500,
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
  // behind a sign-in wall: an auth redirect/404 still means the app is up
  auth?: boolean;
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
  { name: "AI Tools", url: "https://ai-tools.wlstmd.cloud", auth: true },
];

export const stats = [
  { value: "3", label: "Certifications" },
  { value: "4.5", label: "GPA / 4.5" },
  { value: "4th", label: "National finals" },
];

export const socials = [
  { name: "GitHub", handle: "github.com/wlstmd", url: "https://github.com/wlstmd", icon: "github" },
  { name: "LinkedIn", handle: "linkedin.com/in/wlstmd", url: "https://www.linkedin.com/in/wlstmd", icon: "linkedin" },
  { name: "Instagram", handle: "instagram.com/wlstmd_", url: "https://www.instagram.com/wlstmd_", icon: "instagram" },
] as const;

// Repos featured in the Work section, in display order. Live details
// (description, stars, language) are pulled from GitHub at build time.
export const featuredRepos = [
  "k8s-rightsizing-recommender",
  "ebpf-anomaly-detector",
  "lab",
  "eks-provision",
  "kro-ack-infra",
  "daegu-transit-mcp",
  "keimyung-room-finder",
  "metro-mate",
];

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "awards", label: "Awards" },
  { id: "services", label: "Services" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export interface SkillGroup {
  id: string;
  category: string;
  label: string; // short label for display
  items: Skill[];
}

export interface Skill {
  name: string;
  level: "strong" | "learning";
  note?: string;
}

const skills: SkillGroup[] = [
  {
    id: "frontend",
    category: "Frontend",
    label: "FE",
    items: [
      { name: "React", level: "strong" },
      { name: "Next.js", level: "strong" },
      { name: "TypeScript", level: "strong" },
      { name: "JavaScript", level: "strong" },
      { name: "Tailwind CSS", level: "strong" },
      { name: "HTML & CSS", level: "strong" },
      { name: "GSAP", level: "learning", note: "Active" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    label: "BE",
    items: [
      { name: "Node.js", level: "strong" },
      { name: "Express", level: "strong" },
      { name: "REST APIs", level: "strong" },
      { name: "MongoDB", level: "strong" },
      { name: "Authentication", level: "strong" },
      { name: "Python", level: "learning", note: "Growing" },
      { name: "FastAPI", level: "learning", note: "Growing" },
    ],
  },
  {
    id: "engineering",
    category: "Engineering",
    label: "ENG",
    items: [
      { name: "Linux", level: "strong" },
      { name: "Git", level: "strong" },
      { name: "Terminal tooling", level: "strong" },
      { name: "Data Structures", level: "learning", note: "Active" },
      { name: "Algorithms", level: "learning", note: "Active" },
      { name: "Software Architecture", level: "learning", note: "Growing" },
      { name: "Open Source", level: "strong" },
    ],
  },
];

export default skills;

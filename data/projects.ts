export type ProjectStatus = "live" | "wip" | "research";

export interface Project {
  id: string;
  index: string; // "01", "02", "03"
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  stack: string[];
  category: string;
  status: ProjectStatus;
  year: string;
  demoUrl?: string;
  sourceUrl?: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: "hallufix",
    index: "01",
    title: "HalluFix",
    subtitle: "RAG System for Answer Reliability",
    description:
      "A research-oriented Retrieval-Augmented Generation system focused on reducing unsupported answers. Implements retrieval, reranking, and evidence-aware verification to make language model responses more reliable.",
    longDescription:
      "Built to address a fundamental weakness in LLM pipelines — hallucination. HalluFix chains together dense retrieval (FAISS), cross-encoder reranking, and a verification pass that compares generated answers against retrieved evidence before surfacing a response.",
    stack: ["Python", "FastAPI", "FAISS", "Next.js", "TypeScript"],
    category: "Research / Systems",
    status: "research",
    year: "2024",
    sourceUrl: "https://github.com/radiumSodium",
    accentColor: "#F40C3F",
  },
  {
    id: "diacare",
    index: "02",
    title: "DiaCare",
    subtitle: "Diabetes Community Platform",
    description:
      "A community-driven platform for people managing diabetes. Provides a structured space for sharing experiences, tracking health information, and accessing relevant resources — built with accessibility and empathy at the core.",
    longDescription:
      "DiaCare connects people navigating diabetes management through community features, information sharing, and relevant platform tooling. The stack was chosen for reliability and maintainability over novelty.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "Web Application",
    status: "wip",
    year: "2024",
    sourceUrl: "https://github.com/radiumSodium",
    accentColor: "#B9AAA7",
  },
  {
    id: "experiments",
    index: "03",
    title: "Tools & Experiments",
    subtitle: "Open-source utilities and engineering experiments",
    description:
      "An ongoing series of developer tools, terminal utilities, and engineering experiments. Each entry explores a specific problem — from CLI tooling to data-structure implementations.",
    longDescription:
      "This slot is intentionally kept open. As new tools and experiments ship, they land here first. Current interests include shell scripting utilities, algorithm visualizers, and small web tools built for actual use.",
    stack: ["TypeScript", "Node.js", "Shell", "Python"],
    category: "Open Source",
    status: "wip",
    year: "2024–",
    sourceUrl: "https://github.com/radiumSodium",
    accentColor: "#F7F2ED",
  },
];

export default projects;

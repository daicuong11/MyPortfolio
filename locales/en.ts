import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
  SiPostgresql,
  SiRedux,
  SiCloudinary,
  SiNextdotjs,
  SiGit,
  SiDocker,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa6";
import { TbBrandReact } from "react-icons/tb";

const en = {
  // Hero Section
  hero: {
    title: "Ly Dai Cuong",
    subtitle: "Software Engineer • AI-Oriented Web Developer",
    previewCV: "Preview CV",
    downloadCV: "Download CV",
  },

  // Skills Section
  skills: {
    title: "Skills & Tech Stack",
    groups: [
      {
        title: "Frontend",
        items: [
          { name: "React", icon: SiReact },
          { name: "TypeScript", icon: SiTypescript },
          { name: "TailwindCSS", icon: SiTailwindcss },
          { name: "Redux Toolkit", icon: SiRedux },
          { name: "TanStack Query", icon: TbBrandReact },
          { name: "Next.js", icon: SiNextdotjs },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: ".NET / ASP.NET Core", icon: SiDotnet },
        ],
      },
      {
        title: "Database",
        items: [
          { name: "PostgreSQL", icon: SiPostgresql },
          { name: "SQL Server", icon: FaMicrosoft },
        ],
      },
      {
        title: "Tools & DevOps",
        items: [
          { name: "Cloudinary", icon: SiCloudinary },
          { name: "Git", icon: SiGit },
          { name: "Docker", icon: SiDocker },
        ],
      },
    ],
  },

  // Projects Section
  projects: {
    title: "Project Showcase",
    items: [
      {
        title: "AI E-Commerce Platform",
        description:
          "Modern e-commerce platform with AI-based product recommendations and high performance UI.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        tech: ["Next.js", "Tailwind", ".NET", "PostgreSQL"],
        demo: "#",
        github: "#",
      },
      {
        title: "Smart Task Manager",
        description:
          "Task management system with real-time collaboration and productivity analytics.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        tech: ["React", "Redux Toolkit", "ASP.NET Core", "SQL Server"],
        demo: "#",
        github: "#",
      },
      {
        title: "AI Space Portfolio",
        description:
          "Cinematic AI-inspired personal portfolio with 3D space and hologram UI.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        tech: ["Next.js", "Three.js", "Framer Motion"],
        demo: "#",
        github: "#",
      },
    ],
    buttons: {
      demo: "Demo",
      code: "Code",
    },
    previewTip: "Press Esc to exit",
  },

  // Contact Section
  contact: {
    title: "Let's Build Something Legendary",
    email: {
      label: "Email",
      value: "lydaicuong.dev@gmail.com",
      link: "mailto:lydaicuong.dev@gmail.com",
    },
    github: {
      label: "GitHub",
      value: "github.com/lydaicuong",
      link: "https://github.com/lydaicuong",
    },
    linkedin: {
      label: "LinkedIn",
      value: "linkedin.com/in/lydaicuong",
      link: "#",
    },
    previewCV: {
      label: "Preview CV",
      value: "View Resume",
    },
    downloadCV: {
      label: "Download CV",
      value: "Download Resume",
    },
  },

  // Footer
  footer: {
    name: "Ly Dai Cuong",
    techSignature: "Built with Next.js • Three.js • Framer Motion",
    copyright: `© ${new Date().getFullYear()} Ly Dai Cuong. All rights reserved.`,
  },

  // Metadata
  metadata: {
    title: "Ly Dai Cuong | Software Engineer",
    description:
      "AI-themed portfolio of Ly Dai Cuong, Software Engineer specialized in Web, AI, and modern technologies.",
    openGraph: {
      title: "Ly Dai Cuong | Software Engineer",
      description:
        "AI Portfolio of Ly Dai Cuong - Web Developer & Software Engineer",
    },
  },
};

export default en;

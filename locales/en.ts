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
  SiMongodb,
  SiMysql,
  SiDart,
  SiExpress,
  SiBlazor,
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
          { name: "Blazor", icon: SiBlazor },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: ".NET Core", icon: SiDotnet },
          { name: "ASP.NET Core", icon: SiDotnet },
          { name: "Entity Framework", icon: SiDotnet },
          { name: "ABP Framework", icon: SiDotnet },
          { name: "Express.js", icon: SiExpress },
        ],
      },
      {
        title: "Languages",
        items: [
          { name: "C#", icon: SiDotnet },
          { name: "Java", icon: SiReact },
          { name: "Dart", icon: SiDart },
          { name: "JavaScript", icon: SiReact },
        ],
      },
      {
        title: "Database",
        items: [
          { name: "PostgreSQL", icon: SiPostgresql },
          { name: "SQL Server", icon: FaMicrosoft },
          { name: "MongoDB", icon: SiMongodb },
          { name: "MySQL", icon: SiMysql },
        ],
      },
      {
        title: "Tools & Others",
        items: [
          { name: "Cloudinary", icon: SiCloudinary },
          { name: "Git", icon: SiGit },
          { name: "GitHub", icon: SiGit },
        ],
      },
    ],
  },

  // Projects Section
  projects: {
    title: "Project Showcase",
    items: [
      {
        title: "Ajinomoto VNTT - eSales DMS Solution",
        description:
          "Enterprise DMS project built on HQSOFT's Xspire Business Platform with the eSales DMS Solution, helping Ajinomoto optimize distribution, improve sales efficiency, and monitor business operations effectively.",
        image: "/projects/ecommerce.jpg",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        tech: ["ABP Framework", ".NET Core 9", "C#", "Entity Framework", "Blazor", "DevExpress", "PostgreSQL"],
        demo: "#",
        github: "#",
      },
      {
        title: "Sabeco AMS",
        description:
          "Enterprise software project focused on distribution management and sales force automation, built for business process optimization.",
        image: "/projects/portfolio.jpg",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        tech: ["ASP.NET MVC", "Razor", "Ext.NET", "C#", "JavaScript", "SQL Server"],
        demo: "#",
        github: "#",
      },
      {
        title: "AI Space Portfolio",
        description:
          "Cinematic AI-inspired personal portfolio with 3D space and hologram UI, showcasing modern web development skills.",
        image: "/projects/ai-chat.jpg",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        tech: ["Next.js", "Three.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
        demo: "https://lydaicuong.me",
        github: "https://github.com/daicuong11/MyPortfolio",
      },
    ],
    buttons: {
      demo: "Demo",
      code: "Code",
    },
    previewTip: "Press Esc to exit",
    loadingVideo: "Loading video...",
    loadingPreview: "Loading Preview...",
    previewProject: "Preview Project",
    status: {
      active: "ACTIVE",
    },
  },

  // Contact Section
  contact: {
    title: "Let's Build Something Legendary",
    email: {
      label: "Email",
      value: "lydaicuong784@gmail.com",
      link: "mailto:lydaicuong784@gmail.com",
    },
    github: {
      label: "GitHub",
      value: "github.com/daicuong11",
      link: "https://github.com/daicuong11",
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
    description: "Motivated Fresher .NET Developer with a strong eagerness to learn and grow in a professional working environment. Passionate about software development and aspiring to strengthen technical skills while contributing to impactful projects.",
    quickLinks: {
      title: "Quick Links",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    builtWith: {
      title: "Built With",
      techs: ["Next.js", "React", "TypeScript", "Tailwind", "Three.js", "Framer Motion"],
    },
    status: {
      online: "ONLINE",
    },
    backToTop: "Back to Top",
    techSignature: "Built with Next.js • Three.js • Framer Motion",
    copyright: `© ${new Date().getFullYear()} Ly Dai Cuong. All rights reserved.`,
  },

  // Metadata
  metadata: {
    title: "Ly Dai Cuong | Software Engineer",
    description:
      "Portfolio of Ly Dai Cuong, Software Engineer specialized in .NET Core, ASP.NET Core, Entity Framework, ABP Framework, Blazor, and modern web technologies.",
    openGraph: {
      title: "Ly Dai Cuong | Software Engineer",
      description:
        "Portfolio of Ly Dai Cuong - Software Engineer & AI-Oriented Web Developer",
    },
  },
};

export default en;

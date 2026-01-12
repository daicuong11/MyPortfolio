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

const vi = {
  // Hero Section
  hero: {
    title: "Ly Dai Cuong",
    subtitle: "Kỹ sư phần mềm • Lập trình viên Web định hướng AI",
    previewCV: "Xem CV",
    downloadCV: "Tải CV",
  },

  // Skills Section
  skills: {
    title: "Kỹ năng & Công nghệ",
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
    title: "Dự án nổi bật",
    items: [
      {
        title: "Nền tảng E-Commerce AI",
        description:
          "Nền tảng thương mại điện tử hiện đại với đề xuất sản phẩm dựa trên AI và giao diện hiệu suất cao.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        tech: ["Next.js", "Tailwind", ".NET", "PostgreSQL"],
        demo: "#",
        github: "#",
      },
      {
        title: "Quản lý công việc thông minh",
        description:
          "Hệ thống quản lý công việc với cộng tác thời gian thực và phân tích năng suất.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        tech: ["React", "Redux Toolkit", "ASP.NET Core", "SQL Server"],
        demo: "#",
        github: "#",
      },
      {
        title: "Portfolio AI Space",
        description:
          "Portfolio cá nhân theo phong cách điện ảnh với không gian 3D và giao diện hologram.",
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
    previewTip: "Nhấn Esc để thoát",
  },

  // Contact Section
  contact: {
    title: "Hãy cùng xây dựng điều gì đó phi thường",
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
      value: "Xem CV",
    },
    downloadCV: {
      label: "Download CV",
      value: "Tải CV",
    },
  },

  // Footer
  footer: {
    name: "Ly Dai Cuong",
    techSignature: "Xây dựng với Next.js • Three.js • Framer Motion",
    copyright: `© ${new Date().getFullYear()} Ly Dai Cuong. Bảo lưu mọi quyền.`,
  },

  // Metadata
  metadata: {
    title: "Ly Dai Cuong | Kỹ sư phần mềm",
    description:
      "Portfolio AI của Ly Dai Cuong, Kỹ sư phần mềm chuyên về Web, AI và các công nghệ hiện đại.",
    openGraph: {
      title: "Ly Dai Cuong | Kỹ sư phần mềm",
      description:
        "Portfolio AI của Ly Dai Cuong - Lập trình viên Web & Kỹ sư phần mềm",
    },
  },
};

export default vi;

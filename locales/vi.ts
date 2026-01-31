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
        title: "Ngôn ngữ",
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
        title: "Tools & Khác",
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
    title: "Dự án nổi bật",
    items: [
      {
        title: "Ajinomoto VNTT - eSales DMS Solution",
        description:
          "Dự án DMS doanh nghiệp được xây dựng trên HQSOFT's Xspire Business Platform với eSales DMS Solution, giúp Ajinomoto tối ưu hóa phân phối, cải thiện hiệu quả bán hàng và giám sát hoạt động kinh doanh hiệu quả.",
        image: "/projects/ecommerce.jpg",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        tech: ["ABP Framework", ".NET Core 9", "C#", "Entity Framework", "Blazor", "DevExpress", "PostgreSQL"],
        demo: "#",
        github: "#",
      },
      {
        title: "Sabeco AMS",
        description:
          "Dự án phần mềm doanh nghiệp tập trung vào quản lý phân phối và tự động hóa lực lượng bán hàng, được xây dựng để tối ưu hóa quy trình kinh doanh.",
        image: "/projects/portfolio.jpg",
        video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        tech: ["ASP.NET MVC", "Razor", "Ext.NET", "C#", "JavaScript", "SQL Server"],
        demo: "#",
        github: "#",
      },
      {
        title: "AI Space Portfolio",
        description:
          "Portfolio cá nhân theo phong cách điện ảnh với không gian 3D và giao diện hologram, thể hiện kỹ năng phát triển web hiện đại.",
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
    previewTip: "Nhấn Esc để thoát",
    loadingVideo: "Đang tải video...",
    loadingPreview: "Đang tải xem trước...",
    previewProject: "Xem trước dự án",
    status: {
      active: "HOẠT ĐỘNG",
    },
  },

  // Contact Section
  contact: {
    title: "Cùng tạo nên điều phi thường",
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
    description: "Kỹ sư phần mềm với mong muốn học hỏi và phát triển mạnh mẽ trong môi trường làm việc chuyên nghiệp. Đam mê phát triển phần mềm và mong muốn củng cố kỹ năng kỹ thuật trong khi đóng góp vào các dự án có tác động.",
    social: {
      ariaLabel: {
        github: "Mở trang GitHub (mở trong tab mới)",
        linkedin: "Mở trang LinkedIn (mở trong tab mới)",
        email: "Gửi email cho Lý Đại Cương",
      },
    },
    quickLinks: {
      title: "Liên kết nhanh",
      projects: "Dự án",
      skills: "Kỹ năng",
      contact: "Liên hệ",
    },
    builtWith: {
      title: "Công nghệ sử dụng",
      techs: ["Next.js", "React", "TypeScript", "Tailwind", "Three.js", "Framer Motion"],
    },
    status: {
      online: "TRỰC TUYẾN",
    },
    backToTop: "Về đầu trang",
    techSignature: "Xây dựng với Next.js • Three.js • Framer Motion",
    copyright: `© ${new Date().getFullYear()} Ly Dai Cuong. Bảo lưu mọi quyền.`,
    seo: {
      summaryLine:
        "Lý Đại Cương · Fullstack · .NET · Đại học Tôn Đức Thắng · Đồng Nai · 2003",
      expandLabel: "Từ khóa liên quan",
      collapseLabel: "Thu gọn",
    },
  },

  // Metadata
  metadata: {
    title: "Ly Dai Cuong | Kỹ sư phần mềm",
    description:
      "Portfolio của Ly Dai Cuong, Kỹ sư phần mềm chuyên về .NET Core, ASP.NET Core, Entity Framework, ABP Framework, Blazor và các công nghệ web hiện đại.",
    openGraph: {
      title: "Ly Dai Cuong | Kỹ sư phần mềm",
      description:
        "Portfolio của Ly Dai Cuong - Kỹ sư phần mềm & Lập trình viên Web định hướng AI",
    },
  },
};

export default vi;

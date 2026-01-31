/**
 * Cấu hình SEO — hiển thị trên Google (và mạng xã hội khi share link).
 *
 * - siteTitle: "Title lớn" trong kết quả tìm kiếm (dòng chữ tím to).
 * - siteDescription: Đoạn mô tả dưới title (snippet màu xám, ~150–160 ký tự tốt cho SEO).
 * - siteName: Tên site (dùng cho Open Graph).
 * - siteUrl: URL gốc (domain).
 * - keywords: Meta keywords + tag tìm kiếm (dùng trong layout metadata).
 */

export const siteSeo = {
  /** Title chính — hiện làm "title lớn" trên Google */
  siteTitle: "Ly Dai Cuong | Software Engineer",
  /** Template cho các trang con: %s sẽ thay bằng title của trang */
  titleTemplate: "%s | Ly Dai Cuong",
  /**
   * Description — hiện dưới title trên Google.
   * Nên ~150–160 ký tự, chứa từ khóa: tên, vai trò, công nghệ, trường, địa điểm.
   */
  siteDescription:
    "Ly Dai Cuong (Lý Đại Cương) — Fullstack Developer, Fresher .NET. Portfolio: .NET Core, ASP.NET, React, Next.js. Ton Duc Thang University, Dong Nai. Software Engineer, Web Developer.",
  /** Tên site (share link, Open Graph) */
  siteName: "Ly Dai Cuong Portfolio",
  /** URL gốc (domain) */
  siteUrl: "https://lydaicuong.me",
  /** Meta keywords + tag tìm kiếm (SEO, Bing, index) */
  keywords: [
    "Ly Dai Cuong",
    "Lý Đại Cương",
    "Software Engineer",
    "Fullstack Developer",
    ".NET",
    "Fresher",
    "Ton Duc Thang University",
    "Đại học Tôn Đức Thắng",
    "Dong Nai",
    "Đồng Nai",
    "Portfolio",
    "Web Developer",
    "ASP.NET",
    "ASP.NET Core",
    "React",
    "Next.js",
    "Entity Framework",
    "Blazor",
    "C#",
    "TypeScript",
    "Kỹ thuật phần mềm",
    "Lập trình viên",
    "Phần mềm",
    "Ứng dụng web",
    "Website",
    "2003",
  ],
} as const;

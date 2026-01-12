import { usePathname } from "next/navigation";
import en from "@/locales/en";
import vi from "@/locales/vi";

export type Locale = "en" | "vi";

export const locales: Locale[] = ["en", "vi"];

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/vi")) {
    return "vi";
  }
  return "en";
}

export function useTranslations() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  return locale === "vi" ? vi : en;
}

export function getTranslations(locale: Locale) {
  return locale === "vi" ? vi : en;
}

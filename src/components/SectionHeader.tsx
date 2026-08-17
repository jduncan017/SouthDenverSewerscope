import { type ReactNode } from "react";
import { Eyebrow } from "@/components/Eyebrow";

/*
 * Section header — the eyebrow / heading / description trio shared across
 * sections. Each part renders only when provided, so a section shows any subset
 * (drop the eyebrow when it would only relabel the heading). `children` is an
 * optional slot below the description for header extras (a rating line, meta).
 * `align` is left (default) or center; `onDark` flips colors for navy bands
 * (light eyebrow, white heading, n2 description). The heading is an <h2>
 * (sections sit under the page's single <h1>).
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  onDark = false,
  className = "",
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Extra header content rendered below the description. */
  children?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  const alignClass =
    align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <div
      className={`SectionHeader ${alignClass} max-w-text flex flex-col gap-4 ${className}`.trim()}
    >
      {eyebrow && (
        <Eyebrow variant={onDark ? "light" : "dark"}>{eyebrow}</Eyebrow>
      )}
      {title && (
        <h2
          className={`SectionHeaderTitle text-balance ${onDark ? "text-n0" : ""}`.trim()}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className={`SectionHeaderDescription ${onDark ? "text-n3" : "text-g3"}`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

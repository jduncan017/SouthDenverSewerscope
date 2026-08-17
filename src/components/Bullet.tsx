import { type ReactNode } from "react";

/*
 * List bullet — the sitewide marker for generic bulleted lists. A filled,
 * swept-back arrowhead (concave rear edge) in brand green, nudged down ~3px to
 * sit centered on the first line of its item. Drop it as the first child of a
 * flex <li> (`flex gap-2.5`) so it works in any layout. Not for
 * "result/benefit" lists, which use a Check icon.
 */
export function Bullet({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`Bullet text-s3 mt-[0.4em] size-3.5 shrink-0 ${className}`}
    >
      <path d="M3 3 L22 12 L3 21 Q14 12 3 3 Z" />
    </svg>
  );
}

/*
 * Bulleted list item — the bullet plus inline content, for plain prose lists.
 * Parent <ul> just needs `flex flex-col gap-*`. Lists with bespoke item layouts
 * compose <Bullet /> directly instead.
 */
export function BulletItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li className={`BulletItem text-g3 flex gap-2.5 ${className}`.trim()}>
      <Bullet />
      <span>{children}</span>
    </li>
  );
}

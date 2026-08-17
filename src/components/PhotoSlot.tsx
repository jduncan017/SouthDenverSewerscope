import Image from "next/image";
import { Camera } from "lucide-react";

/*
 * A photo position on the page. Pass `src` and it renders a real next/image;
 * leave it off and it renders a designed placeholder that names the shot we
 * need, so an unshot position reads as "photo lands here" rather than a broken
 * image or a greybox cross.
 *
 * The client had no photography at kickoff, so every slot on this page is
 * currently unshot and the `brief` text doubles as the shot list. Filling one
 * in is a one line change: add `src` (and `priority` if it is the LCP image).
 */

const RATIOS = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
} as const;

export function PhotoSlot({
  src,
  alt,
  brief,
  ratio = "portrait",
  priority = false,
  className = "",
}: {
  src?: string;
  /** Required whenever `src` is set. */
  alt?: string;
  /** The shot we need, shown in the placeholder until the photo lands. */
  brief: string;
  ratio?: keyof typeof RATIOS;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div
        className={`PhotoSlot shadow-theme relative overflow-hidden rounded-2xl ${RATIOS[ratio]} ${className}`}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`PhotoSlot from-p0 via-n2 to-s1 shadow-theme border-n4 relative flex items-center justify-center overflow-hidden rounded-2xl border bg-linear-to-br ${RATIOS[ratio]} ${className}`}
    >
      <div className="PhotoSlotInner flex flex-col items-center gap-3 px-6 text-center">
        <span className="PhotoSlotIcon bg-n0 text-p4 shadow-theme-sm flex size-14 items-center justify-center rounded-full">
          <Camera className="size-6" aria-hidden="true" />
        </span>
        <span className="PhotoSlotBrief text-g3 max-w-[20rem] text-sm">
          {brief}
        </span>
      </div>
    </div>
  );
}

import {
  Camera,
  Home,
  Radar,
  Waves,
  Shovel,
  FileVideo,
  MonitorPlay,
  ShieldCheck,
  Clock,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site";

/*
 * Page content that is reused across sections and structured data. Copy that
 * appears exactly once lives in the section component that renders it; anything
 * consumed twice (services -> Services section + Service JSON-LD, FAQs -> FAQ
 * section + FAQPage JSON-LD) lives here so the two can never drift apart.
 *
 * Voice, straight from the discovery call: honest, plain-spoken, no fear
 * tactics, no high-pressure sales. "Just the facts." Copy rules from the design
 * system apply: Capital Case headings, and no em or en dashes anywhere.
 */

export interface Service {
  icon: LucideIcon;
  title: string;
  blurb: string;
  /** Shown as the card footer. */
  price?: string;
}

/*
 * ONE headline service, everything else subordinate to it.
 *
 * This page takes cold traffic from ads bought on sewer scope terms. Somebody
 * arriving on that click has one question, and a row of equal cards answers it
 * with "we do six things", which reads as a capabilities list and makes them
 * choose before they have decided to buy at all. So the scope gets the whole
 * top of the section and a price, and the rest sits underneath as proof that
 * we are a real plumbing outfit rather than a one trick operation.
 */
export const primaryService: Service = {
  icon: Camera,
  title: "Sewer Scope Inspection",
  blurb:
    "A high definition camera down the full length of your main sewer line, out to where it meets the city main. You watch it with us on the monitor as it goes."
};

/*
 * The rest of what we do. Real services, but nobody arrives from a cold ad
 * searching for "sewer line locating", so they get compact cards and no prices.
 * They still carry full descriptions for the footer and the structured data.
 */
export const otherServices: Service[] = [
  {
    icon: Home,
    title: "Pre Purchase Inspection",
    blurb:
      "Know what you're buying before you close, not after."
  },
  {
    icon: Waves,
    title: "Drain Cleaning",
    blurb:
      "We clear the line, then camera it so you can see it's fixed."
  },
  {
    icon: Radar,
    title: "Sewer Line Locating",
    blurb:
      "We mark exactly where a break is before anyone digs."
  },
  {
    icon: FileVideo,
    title: "Reports for Realtors",
    blurb:
      "Same day video and a written summary for the file."
  },
  {
    icon: Shovel,
    title: "Repairs and Excavation",
    blurb:
      "Coordinated with crews we trust, start to finish."
  },
];

/** Everything we offer, for the footer list and the Service structured data. */
export const allServices: Service[] = [primaryService, ...otherServices];

export interface Value {
  title: string;
  body: string;
}

/*
 * The differentiator section, as accordion rows beside a photo.
 *
 * Frank's own framing on the call was all negative space: not car salesmen, no
 * fear tactics, no manager in a white shirt. That is the right INSTINCT and the
 * wrong COPY. Naming the bad behaviour puts the competitor's pitch in the
 * reader's head, makes us sound defensive, and asks someone to trust a company
 * whose main claim is that it is not the other guys.
 *
 * So each row states the standard positively and makes it checkable. Same
 * message, and it now survives being read by someone who never had a bad
 * plumber and has no idea what we would be defending ourselves against.
 */
export const values: Value[] = [
  {
    title: "You See Everything We See",
    body: "The monitor faces you. We name what's on screen as it appears, in plain English, and you keep the full recording and a written summary. Nothing about your sewer line comes down to taking our word for it.",
  },
  {
    title: "One Price, Agreed Before We Start",
    body: "You get the number before we unload the van, and that's the number on the invoice. Nothing gets added afterward, and nobody stands in your driveway waiting on a decision.",
  },
  {
    title: "We Run the Whole Line, Every Time",
    body: "A camera that stops ten feet in has told you nothing. We run the full length of your line, out to where it meets the city main. If something genuinely stops the camera, you see what and where on the screen first.",
  },
  {
    title: "You Deal With the Owner",
    body: `${site.owner.name} does every inspection himself. No dispatcher, no rotating crew, nobody arriving later to close a sale. ${site.owner.yearsExperience} years of referrals came from treating people the way he'd want his own family treated.`,
  },
  {
    title: "We Leave It Cleaner Than We Found It",
    body: "Sewer work isn't tidy work. We put protection down before we start and clean up properly after. When we pull out of the driveway, the only sign we were there should be the video on your phone.",
  },
];

export interface TrustPoint {
  icon: LucideIcon;
  label: string;
}

// Kept short on purpose: these sit in one horizontal row beside their icons,
// so anything that wraps to a second line makes the whole band taller.
export const trustPoints: TrustPoint[] = [
  { icon: ShieldCheck, label: `${site.owner.yearsExperience}+ Years in the Trade` },
  { icon: MonitorPlay, label: "You Keep the Video" },
  { icon: MapPin, label: "South Denver Owned" },
  { icon: Clock, label: "Evenings and Saturdays" },
];

export interface FaqEntry {
  q: string;
  a: string;
}

/*
 * FAQs do double duty: the accordion and the FAQPage structured data. Keeping
 * them as plain strings means the JSON-LD answer is always exactly what the
 * visitor reads, which is what Google asks for.
 */
export const faqs: FaqEntry[] = [
  {
    q: "What Exactly Is a Sewer Scope Inspection?",
    a: "We feed a waterproof camera into your main sewer line, usually through the cleanout, which is the capped access point outside the house. We run it all the way to where your line meets the city main. It shows roots, cracks, blockages, and low spots where water collects. You watch the screen with us and keep the recording.",
  },
  {
    q: "How Much Does a Sewer Scope Inspection Cost in Denver?",
    a: `Ours is $${site.pricing.scopePromo} right now, down from $${site.pricing.scopeStandard}, flat rate for a standard residential main line anywhere in our main service area. That covers the camera run, the video, and the walkthrough. Around the Denver metro you'll see anywhere from $100 to $300 for the same job, often with the price only quoted once somebody is at your door.`,
  },
  {
    q: "How Long Does It Take?",
    a: "Most residential scopes take about forty five minutes to an hour, including the time we spend walking you through the footage. We book an hour so nobody is rushed.",
  },
  {
    q: "Do I Really Need One Before Buying a House?",
    a: "A standard home inspection doesn't include the sewer line, and replacing a main line in the Denver metro commonly runs five figures. If the house is older than about twenty years, or has mature trees near the line, it's worth scoping before you close. It's the cheapest way to avoid the most expensive surprise in the house.",
  },
  {
    q: "What Happens If You Find a Problem?",
    a: "We show you the exact spot on the screen, explain what it is, and tell you honestly how urgent it is. Some findings need work this month. Plenty of them just need watching. You get options and a written price, and you're never pressured to decide on the spot.",
  },
  {
    q: "Do I Need to Be Home for the Appointment?",
    a: "We'd rather you were, because most of the value is in watching it with us and asking questions as we go. If you can't be there, we can still do the work and send you the video with a call to walk you through it.",
  },
];

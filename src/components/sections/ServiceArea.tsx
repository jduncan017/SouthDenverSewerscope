import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { PhotoSlot } from "@/components/PhotoSlot";
import { site } from "@/lib/site";

/*
 * Where we work. One job: let somebody find their town and stop wondering.
 *
 * This used to argue that a tight radius was a virtue, which is a paragraph
 * nobody asked for. The city names are the content; they answer the question
 * and they are also most of what local SEO for a trades business amounts to.
 *
 * The map is a plain Google Maps share embed, which needs no API key and no
 * Google Cloud account. See site.mapEmbedUrl for how to get the URL.
 */
function AreaMap() {
  if (!site.mapEmbedUrl) {
    return (
      <PhotoSlot
        ratio="square"
        brief={`Service area map lands here. Paste a Google Maps share embed URL into site.mapEmbedUrl, no API key needed.`}
      />
    );
  }

  return (
    // h-full so the map runs the full height of the city lists beside it; the
    // min-height is the floor for mobile, where the single column stack gives
    // it no sibling to match.
    <div className="AreaMap shadow-theme border-n4 h-full min-h-[22rem] overflow-hidden rounded-2xl border">
      <iframe
        title={`Map of the ${site.name} service area around ${site.pricing.radiusOrigin}, Colorado`}
        src={site.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="AreaMapFrame size-full border-0"
      />
    </div>
  );
}

function CityList({ cities }: { cities: readonly string[] }) {
  return (
    <ul className="AreaList flex flex-wrap gap-2">
      {cities.map((city) => (
        <li key={city}>
          <span className="AreaChip bg-n0 border-n4 text-p4 inline-flex rounded-full border px-3 py-1.5 text-sm font-medium">
            {city}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceArea() {
  return (
    <SectionWrapper id="areas" tone="neutral">
      {/* No items-start: the columns stretch so the map matches the height of
          the lists rather than sitting as a square with dead space under it. */}
      <div className="AreaGrid grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="AreaCopy flex flex-col gap-8">
          <SectionHeader
            eyebrow="Service Area"
            title="Sewer Scope Service Area"
            description={`Based in ${site.pricing.radiusOrigin}, CO, offering sewer scope inspections throughout South Denver and the surrounding metro.`}
          />

          <div className="AreaGroup flex flex-col gap-4">
            <h3 className="AreaGroupTitle text-xl">Areas We Serve</h3>
            <CityList cities={site.serviceArea.primary} />
          </div>

          <div className="AreaGroup flex flex-col gap-4">
            <h3 className="AreaGroupTitle text-xl">Also Serving</h3>
            <p className="AreaGroupNote text-g3">
              Destination charges may apply.
            </p>
            <CityList cities={site.serviceArea.extended} />
          </div>

          <p className="AreaCatchAll text-g3 max-w-text">
            Not on the list?{" "}
            <a
              href={site.contact.phoneHref}
              className="AreaCatchAllPhone text-s4 hover:text-s5 focus-visible:ring-s4 font-semibold underline underline-offset-4 transition-colors duration-300 focus-visible:rounded-xs focus-visible:ring-2 focus-visible:outline-none"
            >
              Call and ask
            </a>
            . If we can get to you, we&apos;ll!
          </p>
        </div>

        <div className="AreaMapColumn">
          <AreaMap />
        </div>
      </div>
    </SectionWrapper>
  );
}

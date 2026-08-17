import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/*
 * Social share card. Generated rather than designed in a graphics tool so it
 * stays in step with the price in site.ts.
 *
 * ImageResponse renders a subset of CSS via Satori, so every container here
 * needs an explicit `display: flex`, and font weights only exist if the font
 * file is supplied. Satori's fallback carries one weight, which renders the
 * headline thin and off brand, so we fetch Archivo 800 from Google Fonts.
 *
 * That fetch is wrapped: a network failure at build time falls back to the
 * default face rather than failing the build. A slightly thin share image is a
 * survivable outcome; a broken deploy is not.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}: sewer camera inspections in South Denver`;

// Google Fonts serves woff2 to modern clients, which Satori cannot parse.
// An older User-Agent gets the truetype build instead.
async function loadArchivo(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Archivo:wght@800",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } },
    ).then((r) => r.text());
    const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(
      css,
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const archivo = await loadArchivo();
  const fontFamily = archivo ? "Archivo" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#092745",
          backgroundImage:
            "linear-gradient(135deg, #092745 0%, #051a2e 100%)",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a6c888",
              fontWeight: 700,
            }}
          >
            South Denver Sewerscope
          </div>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 5,
              backgroundColor: "#457e26",
              marginTop: 12,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.1,
            color: "#ffffff",
            fontWeight: 800,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          {`See Exactly What's In Your Sewer Line.`}
        </div>

        {/* Only the 800 weight is loaded, so everything here renders bold.
            Sizes are set so the row fits on one line at that weight. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#e9edf1",
              letterSpacing: 0,
            }}
          >
            Littleton, Highlands Ranch, Centennial
          </div>
          <div
            style={{
              display: "flex",
              flexShrink: 0,
              alignItems: "center",
              whiteSpace: "nowrap",
              backgroundColor: "#457e26",
              color: "#ffffff",
              fontSize: 32,
              padding: "16px 36px",
              borderRadius: 100,
            }}
          >
            ${site.pricing.scopePromo} This Month
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: archivo
        ? [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }]
        : [],
    },
  );
}

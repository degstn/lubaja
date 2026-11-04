import { ImageResponse } from "next/og";
import { logo } from "@/lib/logo-paths";
import { colors, site } from "@/lib/site";

export const alt = `${site.name} logo`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, text: string) {
  const query = `family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Couldn't load ${family} from Google Fonts`);
  return (await fetch(url)).arrayBuffer();
}

export default async function Image() {
  const title = site.name.toUpperCase();
  const tagline = site.tagline.toUpperCase();
  const logoWidth = 360;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.brown,
          color: colors.bone,
          fontFamily: "Saira",
          fontStyle: "italic",
        }}
      >
        <svg
          width={logoWidth}
          height={(logoWidth * logo.height) / logo.width}
          viewBox={logo.viewBox}
        >
          {logo.paths.map((d) => (
            <path key={d} d={d} fill="#fff" fillRule="evenodd" />
          ))}
        </svg>
        <div style={{ marginTop: 48, fontSize: 76, lineHeight: 1 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 30, color: colors.gold, letterSpacing: 3 }}>
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Saira",
          data: await loadGoogleFont("Saira:ital,wdth,wght@1,125,900", title + tagline),
          weight: 900,
          style: "italic",
        },
      ],
    },
  );
}

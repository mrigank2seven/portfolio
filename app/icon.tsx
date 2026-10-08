import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const dynamic = "force-static";
export const contentType = "image/png";

const icons = [
  { id: "192", px: 192, glyph: 0.42 },
  { id: "512", px: 512, glyph: 0.42 },
  // Maskable icons get cropped to a safe zone, so the glyph is smaller.
  { id: "maskable", px: 512, glyph: 0.3 },
];

export function generateImageMetadata() {
  return icons.map(({ id, px }) => ({
    id,
    size: { width: px, height: px },
    contentType,
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const iconId = await id;
  const { px, glyph } = icons.find((i) => i.id === iconId) ?? icons[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0d",
          color: "#5eead4",
          fontSize: px * glyph,
          fontWeight: 700,
          letterSpacing: -px * 0.02,
        }}
      >
        {profile.initials}
      </div>
    ),
    { width: px, height: px },
  );
}

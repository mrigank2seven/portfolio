import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 76,
          fontWeight: 700,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}

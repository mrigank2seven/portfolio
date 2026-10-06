import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${profile.name} | ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0b0d",
          color: "#e7e9ec",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(94,234,212,0.18), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#5eead4" }}>
          {`> ${profile.initials.toLowerCase()}`}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 54, marginTop: 8, color: "#5eead4" }}>
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#8b929c" }}>
          <div>{`${profile.role} @ ${profile.company}`}</div>
          <div>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}

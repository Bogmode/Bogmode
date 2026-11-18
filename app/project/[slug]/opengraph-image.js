import { ImageResponse } from "next/og";
import { getProject } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return new ImageResponse(
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "68px 76px",
      background: "#f1eee5",
      color: "#171717",
      fontFamily: "Arial, sans-serif",
      border: "18px solid #ee4b20",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#ee4b20" }}>
        <span>БОГMODE</span><span>INDEPENDENT PROJECT</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>
          {project?.title || "Independent project"}
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.35, color: "#50504c", maxWidth: 920 }}>
          {project?.summary || "Products, prototypes, and experiments."}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, letterSpacing: 2, color: "#50504c" }}>
        <span>{(project?.category || "project").toUpperCase()} · {(project?.status || "IN PROGRESS").toUpperCase()}</span>
        <span>BOGMODE.CA</span>
      </div>
    </div>,
    size,
  );
}

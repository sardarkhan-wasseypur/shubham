import { ImageResponse } from "next/og";

export const alt = "Advocate Shubham Singh | Legal Counsel, Delhi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          color: "#F7F5F0",
          padding: "60px 72px",
          border: "1px solid #2A2A2A",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "32px",
                height: "3px",
                backgroundColor: "#C8102E",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                letterSpacing: "0.22em",
                color: "#FF5A6E",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              BAR COUNCIL OF INDIA &bull; REGISTERED ADVOCATE
            </span>
          </div>

          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.18em",
              color: "#A3A09A",
              textTransform: "uppercase",
            }}
          >
            DELHI, INDIA
          </span>
        </div>

        {/* Central Brand Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                backgroundColor: "#C8102E",
                color: "#FFFFFF",
                padding: "8px 20px",
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "0.25em",
                borderRadius: "2px",
              }}
            >
              ADV.
            </div>
            <div
              style={{
                fontSize: "76px",
                fontWeight: 900,
                letterSpacing: "0.01em",
                color: "#F7F5F0",
                lineHeight: 1,
              }}
            >
              SHUBHAM SINGH
            </div>
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#A3A09A",
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            Supreme Court of India &bull; High Court of Delhi &bull; District Courts
          </div>
        </div>

        {/* Bottom Metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2A2A2A",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: "#FF5A6E",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              VERIFIED PANEL COUNSEL APPOINTMENTS
            </span>
            <span style={{ fontSize: "16px", color: "#F7F5F0" }}>
              Union of India &bull; State of Uttar Pradesh &bull; Delhi Metro Rail Corporation (DMRC)
            </span>
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#A3A09A",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            shubhamsinghadvocate.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

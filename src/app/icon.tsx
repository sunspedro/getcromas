import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff8f3",
                    borderRadius: 8,
                }}
            >
                <div
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ff9178 0%, #ffc8aa 100%)",
                    }}
                />
            </div>
        ),
        { ...size },
    );
}

import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/siteUrl";

export const alt = siteConfig.title;
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
                    justifyContent: "center",
                    padding: "80px",
                    background: "#fff8f3",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -120,
                        left: -80,
                        width: 480,
                        height: 480,
                        borderRadius: "50%",
                        background: "rgba(255, 175, 135, 0.35)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -160,
                        right: -60,
                        width: 520,
                        height: 520,
                        borderRadius: "50%",
                        background: "rgba(255, 200, 170, 0.3)",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 32,
                    }}
                >
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #ff9178 0%, #ffc8aa 100%)",
                        }}
                    />
                    <span
                        style={{
                            fontSize: 36,
                            fontWeight: 700,
                            color: "#2b1810",
                        }}
                    >
                        {siteConfig.name}
                    </span>
                </div>
                <p
                    style={{
                        fontSize: 56,
                        fontWeight: 700,
                        color: "#2b1810",
                        lineHeight: 1.15,
                        maxWidth: 900,
                        margin: 0,
                    }}
                >
                    Gerador de paletas de cores com IA
                </p>
                <p
                    style={{
                        fontSize: 28,
                        color: "rgba(43, 24, 16, 0.72)",
                        lineHeight: 1.4,
                        maxWidth: 820,
                        marginTop: 24,
                    }}
                >
                    5 cores com função definida, contraste WCAG e referências visuais em segundos.
                </p>
            </div>
        ),
        { ...size },
    );
}

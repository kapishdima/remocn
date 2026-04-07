"use client";

import type { ReactNode } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface ChatToPreviewLayoutProps {
  chat?: ReactNode;
  preview?: ReactNode;
  startChatRatio?: number;
  endChatRatio?: number;
  background?: string;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function DefaultChat() {
  const messages = [
    { from: "user", text: "Build me a landing page" },
    { from: "ai", text: "Sure — what should it feature?" },
    { from: "user", text: "Hero, pricing, footer." },
    { from: "ai", text: "On it. Generating now..." },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        fontFamily: FONT_FAMILY,
        background: "#111",
      }}
    >
      <div
        style={{
          color: "#888",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Chat
      </div>
      {messages.map((m, i) => (
        <div
          key={i}
          style={{
            alignSelf: m.from === "user" ? "flex-end" : "flex-start",
            background: m.from === "user" ? "#0ea5e9" : "#262626",
            color: "white",
            padding: "10px 14px",
            borderRadius: 14,
            fontSize: 14,
            maxWidth: "85%",
          }}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}

function DefaultPreview() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          height: 36,
          background: "#f4f4f5",
          borderBottom: "1px solid #e4e4e7",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 12px",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#ef4444",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#f59e0b",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#22c55e",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#0a0a0a",
          }}
        >
          Ship faster.
        </div>
        <div style={{ fontSize: 16, color: "#71717a", maxWidth: 360 }}>
          The fastest way to launch your idea. Built with Remotion.
        </div>
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            background: "#0a0a0a",
            color: "white",
            padding: "10px 18px",
            borderRadius: 10,
            alignSelf: "flex-start",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Get started
        </div>
      </div>
    </div>
  );
}

export function ChatToPreviewLayout({
  chat,
  preview,
  startChatRatio = 0.5,
  endChatRatio = 0.25,
  background = "#0a0a0a",
  className,
}: ChatToPreviewLayoutProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const ratio = interpolate(
    frame,
    [durationInFrames * 0.1, durationInFrames * 0.7],
    [startChatRatio, endChatRatio],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    },
  );

  const chatBasis = `${ratio * 100}%`;
  const previewBasis = `${(1 - ratio) * 100}%`;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        padding: 32,
        display: "flex",
        gap: 16,
      }}
    >
      <div
        style={{
          flexBasis: chatBasis,
          flexGrow: 0,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {chat ?? <DefaultChat />}
      </div>
      <div
        style={{
          flexBasis: previewBasis,
          flexGrow: 0,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {preview ?? <DefaultPreview />}
      </div>
    </div>
  );
}

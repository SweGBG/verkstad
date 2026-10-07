"use client";
import Link from "next/link";
import type { Tjanst } from "../lib/data";
import { IconArrow, TjanstIkon } from "./icons";

/** Tjänstekort med glöd som följer muspekaren. */
export default function ServiceCard({ t, i }: { t: Tjanst; i: number }) {
  return (
    <Link
      href={`/tjanster/${t.slug}`}
      className="service reveal"
      style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
      <span className="service-icon"><TjanstIkon namn={t.ikon} /></span>
      <h3 className="h-display h3" style={{ marginTop: 10 }}>{t.titel}</h3>
      <p className="dim" style={{ fontSize: 15 }}>{t.kort}</p>
      <div className="service-foot">
        <span className="pill pill-mute">{t.tid}</span>
        <span className="card-link">{t.fran} <IconArrow size={14} /></span>
      </div>
    </Link>
  );
}

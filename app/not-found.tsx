import Link from "next/link";
import { TireArt } from "./components/logo";
import { IconArrow } from "./components/icons";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", position: "relative", overflow: "hidden", padding: "120px 20px 60px" }}>
      <TireArt className="spin-slow" />
      <style>{`main > svg.spin-slow{position:absolute;width:520px;height:520px;opacity:.05;animation-duration:30s}`}</style>
      <div style={{ textAlign: "center", position: "relative" }}>
        <span className="eyebrow">Fel 404</span>
        <h1 className="h-display" style={{ fontSize: "clamp(110px, 22vw, 260px)", lineHeight: 0.85, margin: "18px 0" }}>
          P<span className="ember-grad">un</span>ka
        </h1>
        <p className="lead" style={{ margin: "0 auto 32px" }}>Sidan du letar efter har fått punktering. Vi rullar dig tillbaka.</p>
        <Link href="/" className="btn btn-primary">Till startsidan <IconArrow /></Link>
      </div>
    </main>
  );
}

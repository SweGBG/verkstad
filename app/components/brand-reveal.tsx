import Link from "next/link";
import { forwardRef } from "react";
import { IconArrow } from "./icons";
import styles from "./brand-reveal.module.css";

/*
 * Hero Brand Reveal: the last thing the film hero shows before the page lets go.
 * The film holds on its final frame and the IronDäck mark is forged on top of it:
 * the tire lugs drop into place, the rings are drawn, the hub ignites, the wordmark is etched
 * as an outline and then filled with molten metal behind a glowing heat edge that throws sparks.
 *
 * Everything is driven by ONE custom property, --b (0–1), that FilmHero sets from the scroll
 * position. The CSS derives every phase from it, so scrolling back un-forges the mark.
 * When --b reaches 1 the root gets data-done and slow idle motion takes over (glow, shimmer).
 */
const LUGS = Array.from({ length: 16 }, (_, i) => i);
const SPOKES = [0, 72, 144, 216, 288];
const SPARKS = Array.from({ length: 12 }, (_, i) => i);

const BrandReveal = forwardRef<HTMLDivElement>(function BrandReveal(_, ref) {
  return (
    <div className={styles.brand} ref={ref} aria-hidden="true">
      <div className={styles.scrim} />
      <div className={styles.lockup}>
        <svg className={styles.mark} viewBox="0 0 48 48">
          <defs>
            <linearGradient id="br-ember" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffad4a" />
              <stop offset=".5" stopColor="#ff6b2c" />
              <stop offset="1" stopColor="#e2401f" />
            </linearGradient>
            <radialGradient id="br-hub">
              <stop offset="0" stopColor="#fff3df" />
              <stop offset=".45" stopColor="#ffad4a" />
              <stop offset="1" stopColor="#e2401f" />
            </radialGradient>
          </defs>
          <g className={styles.wheel}>
            {LUGS.map((i) => (
              <g key={i} transform={`rotate(${i * 22.5} 24 24)`}>
                <rect className={styles.lug} style={{ ["--i" as string]: i }} x="21.5" y="1.5" width="5" height="6" rx="1" />
              </g>
            ))}
            <circle className={styles.tire} cx="24" cy="24" r="17.5" />
            <circle className={styles.ring} cx="24" cy="24" r="17.5" pathLength={1} />
            <circle className={styles.rim} cx="24" cy="24" r="11" pathLength={1} />
            {SPOKES.map((a, i) => (
              <rect key={a} className={styles.spoke} style={{ ["--i" as string]: i }} x="23" y="13.8" width="2" height="6" rx="1" transform={`rotate(${a} 24 24)`} />
            ))}
          </g>
          <circle className={styles.flare} cx="24" cy="24" r="9" />
          <circle className={styles.hub} cx="24" cy="24" r="3.6" />
        </svg>

        <div className={styles.word}>
          <span className={styles.outline}>Iron<em>Däck</em></span>
          <span className={styles.fill}>Iron<em>Däck</em></span>
          <span className={styles.shine}>IronDäck</span>
          <span className={styles.heat} />
          <span className={styles.sparks}>
            {SPARKS.map((i) => <i key={i} style={{ ["--i" as string]: i }} />)}
          </span>
        </div>

        <div className={styles.tag}>
          <span className={styles.rule} />
          <span>Däckverkstad · Göteborg</span>
          <span className={styles.rule} />
        </div>
        <div className={styles.ctas}>
          <Link href="#boka" className="btn btn-primary" tabIndex={-1}>Boka däckbyte <IconArrow /></Link>
          <Link href="#tjanster" className="btn btn-ghost" tabIndex={-1}>Se priser</Link>
        </div>
      </div>
    </div>
  );
});

export default BrandReveal;

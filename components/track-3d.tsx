import type { CSSProperties, ReactNode } from "react";

export type TrackShape = { viewBox: string; d: string };

export type TrackPin = {
  // In the track's viewBox units.
  x: number;
  y: number;
  label: string;
  // Which side of the pin the label hangs off.
  align?: "left" | "center" | "right";
};

const TILT = 58;
const TURN = -14;
// Copies of the course stacked in depth fake an extruded, glowing ribbon.
const LAYERS = 8;
const LAYER_GAP = 3;

const labelAlign = {
  left: "right-0",
  center: "left-1/2 -translate-x-1/2",
  right: "left-0",
};

const rad = (deg: number) => (deg * Math.PI) / 180;

// Size the plane so its tilted footprint, not its flat box, takes up `share`
// of the stage. The stage must be a size container.
function footprintSize(width: number, height: number, share: number) {
  const spanX = width * Math.cos(rad(TURN)) + height * Math.abs(Math.sin(rad(TURN)));
  const spanY =
    (width * Math.abs(Math.sin(rad(TURN))) + height * Math.cos(rad(TURN))) * Math.cos(rad(TILT));
  const side = (length: number) =>
    `min(${((share * 100 * length) / spanX).toFixed(2)}cqw, ${((share * 100 * length) / spanY).toFixed(2)}cqh)`;
  return { width: side(width), height: side(height) };
}

export function Track3D({
  track,
  pins = [],
  footprint,
  children,
}: {
  track: TrackShape;
  pins?: TrackPin[];
  // Fit the tilted course to the stage instead of the stage's flat box.
  footprint?: number;
  // Flat ground details, drawn beneath the course.
  children?: ReactNode;
}) {
  const [, , width, height] = track.viewBox.split(" ").map(Number);
  const tilt = `rotateX(${TILT}deg) rotateZ(${TURN}deg)`;
  const plane: CSSProperties = footprint
    ? { left: "50%", top: "50%", translate: "-50% -50%", ...footprintSize(width, height, footprint) }
    : { inset: "4%" };

  return (
    <div className="absolute [transform-style:preserve-3d]" style={{ ...plane, transform: tilt }}>
      {children}
      {Array.from({ length: LAYERS }, (_, i) => {
        const top = i === LAYERS - 1;
        return (
          <svg
            key={i}
            viewBox={track.viewBox}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full overflow-visible ${top ? "track-glow" : ""}`}
            style={{ transform: `translateZ(${i * LAYER_GAP}px)` }}
          >
            <path
              d={track.d}
              pathLength={1}
              fill="none"
              stroke={top ? "var(--color-gold)" : `color-mix(in oklab, var(--color-gold) ${18 + i * 8}%, var(--color-brown))`}
              strokeWidth={top ? 9 : 12}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={top ? "track-draw" : "track-wall"}
            />
          </svg>
        );
      })}
      {pins.map(({ x, y, label, align = "center" }) => (
        <div
          key={label}
          className="absolute"
          style={{
            left: `${(x / width) * 100}%`,
            top: `${(y / height) * 100}%`,
            // Undo the tilt so the pin stands upright, facing the viewer.
            transform: `translateZ(${(LAYERS - 1) * LAYER_GAP}px) rotateZ(${-TURN}deg) rotateX(${-TILT}deg)`,
          }}
        >
          <span className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
          <span className="track-pin absolute bottom-0 left-0 h-12 w-px bg-gold/70">
            <span
              className={`eyebrow absolute bottom-full mb-1 border border-gold/50 bg-ink/90 px-2 py-1 text-[0.625rem] leading-none whitespace-nowrap text-gold ${labelAlign[align]}`}
            >
              {label}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

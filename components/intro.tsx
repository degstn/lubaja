import { logo } from "@/lib/logo-paths";
import { IntroSkip } from "./intro-skip";

const [l, b] = logo.paths;
const cx = logo.width / 2;
const cy = logo.height / 2;

// The split runs through the gap between the L and the B (in logo units),
// so these need updating if the logo's shape changes.
const lPanel = "-4000,-4000 639.2,-4000 60.55,133.2 4000,133.2 4000,4000 -4000,4000";
const bPanel = "639.2,-4000 4000,-4000 4000,133.2 60.55,133.2";

// Ink strokes slide across inside the logo's outline, painting it top to bottom.
const strokes = [-12, 22, 56, 90, 124, 158];
const streaks = [
  { y: 8, h: 3 },
  { y: 40, h: 1.5 },
  { y: 70, h: 4 },
  { y: 104, h: 2 },
  { y: 136, h: 3.5 },
  { y: 168, h: 1.5 },
];

function Strokes() {
  return strokes.map((y, i) => (
    <rect
      key={y}
      className="intro-stroke"
      x="-30"
      y={y}
      width="300"
      height="44"
      style={{ animationDelay: `${0.42 + i * 0.07}s` }}
    />
  ));
}

export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <svg className="intro-stage" viewBox="-111.4 -135 446 450">
        <defs>
          <clipPath id="intro-clip-l">
            <path d={l} />
          </clipPath>
          <clipPath id="intro-clip-b">
            <path d={b} clipRule="evenodd" />
          </clipPath>
        </defs>
        <g className="intro-shake">
          <rect className="intro-backdrop" x="-4000" y="-4000" width="8000" height="8000" />
          <g className="intro-panel intro-panel-l">
            <polygon points={lPanel} />
            <g clipPath="url(#intro-clip-l)">
              <Strokes />
            </g>
          </g>
          <g className="intro-panel intro-panel-b">
            <polygon points={bPanel} />
            <g clipPath="url(#intro-clip-b)">
              <Strokes />
            </g>
          </g>
          <g transform={`translate(${cx} ${cy})`}>
            <g className="intro-mini">
              <g transform={`translate(${-cx} ${-cy})`}>
                <path d={l} />
                <path d={b} fillRule="evenodd" />
              </g>
            </g>
          </g>
          {streaks.map(({ y, h }, i) => (
            <rect
              key={y}
              className="intro-streak"
              x="-220"
              y={y}
              width="150"
              height={h}
              style={{ animationDelay: `${0.4 + i * 0.07}s` }}
            />
          ))}
        </g>
      </svg>
      <p className="intro-caption">Lehigh Baja SAE</p>
      <IntroSkip />
    </div>
  );
}

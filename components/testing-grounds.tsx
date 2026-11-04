import { site } from "@/lib/site";
import { tracks } from "@/lib/tracks";
import { Track3D, type TrackPin } from "./track-3d";

// In the course's viewBox units.
const pins: TrackPin[] = [
  { x: 432, y: 674, label: "Jump" },
  { x: 7, y: 1235, label: "Entrance / exit", align: "left" },
  { x: 686, y: 1195, label: "EMS exit", align: "right" },
];

const stats = [
  { label: "Season", value: site.season },
  { label: "Entrances", value: 2 },
  { label: "Jumps", value: 1 },
];

export function TestingGrounds() {
  return (
    <section aria-labelledby="testing-grounds" className="frame">
      <div className="grid items-center gap-x-16 gap-y-12 border-t border-white/10 py-20 md:py-28 lg:grid-cols-[minmax(0,24rem)_1fr]">
        <div>
          <p className="eyebrow text-clay">Home track</p>
          <h2 id="testing-grounds" className="headline mt-4 text-[clamp(3rem,7vw,5.5rem)] text-white">
            Testing
            <br />
            <span className="text-tan">grounds</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-tan">
            Lehigh gave us a piece of land to test on, so we built a track on it. We call it the
            testing grounds. This is the layout for the {site.season} season.
          </p>
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <dt className="eyebrow text-tan">{label}</dt>
                <dd className="headline mt-1 text-3xl whitespace-nowrap text-gold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grounds relative aspect-[4/3] [container-type:size] [perspective:1400px] [view-timeline-name:--grounds] sm:aspect-[16/11]">
          <Track3D track={tracks.testingGrounds} pins={pins} footprint={0.8}>
            <div className="track-grid absolute -inset-x-[14%] -top-[8%] -bottom-[1%] border border-gold/15" />
            <div className="absolute -inset-x-[34%] top-[101%] h-[5%] border-y border-white/15 bg-white/[0.04]">
              <span className="eyebrow absolute top-1/2 left-[58%] -translate-y-1/2 text-[0.625rem] whitespace-nowrap text-white/40">
                Mountain Dr N
              </span>
            </div>
          </Track3D>
        </div>
      </div>
    </section>
  );
}

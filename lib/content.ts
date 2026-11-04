import type { StaticImageData } from "next/image";
import cc11Chassis from "@/assets/cc11-chassis.png";
import cc9Photo from "@/assets/gallery/oktobajafest-2025-08.jpg";
import cc8Photo from "@/assets/gallery/williamsport-2024-05.jpg";
import benjaminEfraim from "@/assets/leads/benjamin-efraim.jpg";
import christopherSnyder from "@/assets/leads/christopher-snyder.jpg";
import elizabethSterner from "@/assets/leads/elizabeth-sterner.jpg";
import jamesKimble from "@/assets/leads/james-kimble.jpg";
import josephManeval from "@/assets/leads/joseph-maneval.jpg";
import maddoxCoffin from "@/assets/leads/maddox-coffin.jpg";
import seanDanecker from "@/assets/leads/sean-danecker.jpg";
import { site } from "./site";
import type { TrackId } from "./tracks";

export const socialLinks = [
  { label: "Instagram", handle: "@lehighbaja", href: site.socials.instagram },
  { label: "YouTube", handle: "LU Baja", href: site.socials.youtube },
  { label: "LinkedIn", handle: "Lehigh Baja", href: site.socials.linkedin },
  { label: "Facebook", handle: "LU Baja", href: site.socials.facebook },
] as const;

export const stats = [
  { value: "1", label: "Car built from scratch every year" },
  { value: "2", label: "Competitions a season" },
  { value: "4 hr", label: "Endurance race to survive" },
  { value: "101", label: "Other teams at Baja SAE New York" },
] as const;

export const competitionFormat = [
  {
    name: "Tech inspection",
    detail:
      "A full safety inspection plus brake, four-wheel-drive, and engine checks. Nothing runs until it passes.",
  },
  {
    name: "Dynamic events",
    detail: "Acceleration, hill climb, suspension & traction, and maneuverability.",
  },
  {
    name: "Presentations",
    detail: "We present the design and strategy behind the car to the judges.",
  },
  {
    name: "Endurance",
    detail:
      "Four hours of obstacles and rough terrain. Whatever breaks, we fix on site.",
  },
] as const;

type Competition = {
  name: string;
  dates: string;
  location?: string;
  result?: string;
  recap?: string;
  track?: TrackId;
  // Length of the endurance course.
  course?: string;
  teams?: number;
  // Endurance laps we completed, when the count is known.
  laps?: number;
};

export const competitions: Competition[] = [
  {
    name: "OktoBAJAfest 2026",
    dates: "October 2–4, 2026",
    location: "Seven Springs · Colton, NY",
    course: "1 mi",
    result: "Welded a snapped axle mid-endurance",
    recap:
      "Clean safety inspections on day one opened up every dynamic event. CC10 completed Hill Climb without issue and cleared several Baja Cross obstacles. In endurance, an impact snapped an axle. We welded it and got back on course, but it snapped again late in the race after CC10 rolled onto its side. The longer run exposed the axle design's weak point and gave us the data to make durability a priority for CC11.",
  },
  {
    name: "Baja SAE New York",
    dates: "June 11–14, 2026",
    location: "Hogback Hill MX · Palmyra, NY",
    track: "hogbackHill",
    course: "1.5 mi",
    teams: 102,
    laps: 4,
    result: "Rolled, repaired, and back on course",
    recap:
      "CC10 cleared safety inspection in just two attempts with only minor adjustments, then competed in Acceleration, Hill Climb, Suspension & Traction, and Endurance against 101 other teams. A first-lap rollover in Endurance damaged the gearbox, but we repaired the car and got it back on course, completing four laps with three different drivers before more damage ended our run. The suspension and chassis held up structurally the entire event, proof that this year's design changes delivered the reliability and durability we set out to build.",
  },
  {
    name: "OktoBAJAfest 2025",
    dates: "October 3–5, 2025",
    location: "Seven Springs · Colton, NY",
    course: "1 mi",
    result: "Passed every inspection on day one",
    recap:
      "Passing every safety inspection on day one put us in all of the next day's dynamic events. We completed Hill Climb, didn't finish Short Track, and made it past a few obstacles in Baja Cross. A couple of laps into the endurance race on day three, the front upper A-arm failed and damaged several drivetrain components. We couldn't repair it on site and had to sit out the rest of the race.",
  },
  {
    name: "Baja SAE Maryland",
    dates: "June 12–15, 2025",
    location: "Budds Creek MX · Mechanicsville, MD",
    track: "buddsCreek",
    course: "1.4 mi",
    result: "Fixed a fractured CV joint overnight",
    recap:
      "We passed all safety inspections and moved on to the dynamic events. Completing Acceleration earned us a spot in the next day's endurance lineup. In Maneuverability, a fracture in a CV joint's race took out our steering and we didn't finish. We repaired the car and ran the endurance race the next day, completing a few laps before CVT tensioning problems we couldn't resolve ended our race.",
  },
  {
    name: "OktoBAJAfest 2024",
    dates: "September 27–29, 2024",
    location: "Seven Springs · Colton, NY",
    course: "1 mi",
    laps: 7,
    result: "Seven endurance laps after a rollover",
    recap:
      "After passing safety inspection, we completed Hill Climb. In Short Track, the car rolled on a quick turn and the impact shattered a CV joint cup. We repaired it that night and ran the endurance race the next day, completing seven laps, with a quick stop to fix a broken shock, before the rear-right telescoping CV joint seized and couldn't be repaired in time.",
  },
  {
    name: "Baja SAE Williamsport",
    dates: "May 16–19, 2024",
    location: "Penn College · Montgomery, PA",
    // Outline of the Endurance area on the official 2024 event map.
    track: "williamsport",
    course: "1.1 mi",
    teams: 108,
    result: "Made it to endurance",
    recap:
      "A failing master cylinder gave us braking problems, but we worked through them and passed every safety inspection: general safety, engine check, four-wheel-drive test, and brake check. Passing brake check late on Saturday meant we missed the dynamic events, but we still raced in Sunday's endurance race.",
  },
];

// Cars without a name show their season year instead. Years between two
// entries show up in the archive as a stretch still being researched.
type Car = {
  name?: string;
  year: number;
  note?: string;
  // A cutout has a transparent background and is shown whole instead of cropped.
  image?: { src: StaticImageData; alt: string; cutout?: boolean };
};

export const cars: Car[] = [
  {
    name: "CC11",
    year: 2027,
    note: "In the works",
    image: {
      src: cc11Chassis,
      alt: "CC11 chassis concept, drawn as a wireframe roll cage",
      cutout: true,
    },
  },
  { name: "CC10", year: 2026 },
  {
    name: "CC9",
    year: 2025,
    image: { src: cc9Photo, alt: "Car 84 leading a line of cars across the grass at OktoBAJAfest 2025" },
  },
  {
    name: "CC8",
    year: 2024,
    image: { src: cc8Photo, alt: "A muddy car 64 rolling through the pits at Baja SAE Williamsport" },
  },
  { year: 1978, note: "First Lehigh entry" },
];

type Lead = {
  name: string;
  roles: string[];
  linkedin: string;
  photo?: StaticImageData;
};

export const leads: Lead[] = [
  {
    name: "James Kimble",
    roles: ["Team Captain", "Drivetrain Lead"],
    linkedin: "https://www.linkedin.com/in/jameskimble1/",
    photo: jamesKimble,
  },
  {
    name: "Benjamin Efraim",
    roles: ["Chassis Lead", "Welding Lead"],
    linkedin: "https://www.linkedin.com/in/benjamin-efraim/",
    photo: benjaminEfraim,
  },
  {
    name: "Maddox Coffin",
    roles: ["Suspension Lead"],
    linkedin: "https://www.linkedin.com/in/maddox-coffin/",
    photo: maddoxCoffin,
  },
  {
    name: "Christopher Snyder",
    roles: ["Brakes Lead"],
    linkedin: "https://www.linkedin.com/in/christopher-snyder06/",
    photo: christopherSnyder,
  },
  {
    name: "Sean Danecker",
    roles: ["Ergonomics Lead"],
    linkedin: "https://www.linkedin.com/in/sean-danecker/",
    photo: seanDanecker,
  },
  {
    name: "Joseph Maneval",
    roles: ["Business Lead"],
    linkedin: "https://www.linkedin.com/in/joseph-maneval/",
    photo: josephManeval,
  },
  {
    name: "Elizabeth Sterner",
    roles: ["Outreach Lead"],
    linkedin: "https://www.linkedin.com/in/elizabeth-sterner-75c/",
    photo: elizabethSterner,
  },
];

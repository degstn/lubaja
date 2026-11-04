import type { StaticImageData } from "next/image";
import okto25_01 from "@/assets/gallery/oktobajafest-2025-01.jpg";
import okto25_02 from "@/assets/gallery/oktobajafest-2025-02.jpg";
import okto25_03 from "@/assets/gallery/oktobajafest-2025-03.jpg";
import okto25_04 from "@/assets/gallery/oktobajafest-2025-04.jpg";
import okto25_05 from "@/assets/gallery/oktobajafest-2025-05.jpg";
import okto25_06 from "@/assets/gallery/oktobajafest-2025-06.jpg";
import okto25_07 from "@/assets/gallery/oktobajafest-2025-07.jpg";
import okto25_08 from "@/assets/gallery/oktobajafest-2025-08.jpg";
import okto25_09 from "@/assets/gallery/oktobajafest-2025-09.jpg";
import okto25_10 from "@/assets/gallery/oktobajafest-2025-10.jpg";
import okto25_11 from "@/assets/gallery/oktobajafest-2025-11.jpg";
import okto25_12 from "@/assets/gallery/oktobajafest-2025-12.jpg";
import md25_01 from "@/assets/gallery/maryland-2025-01.jpg";
import md25_02 from "@/assets/gallery/maryland-2025-02.jpg";
import md25_03 from "@/assets/gallery/maryland-2025-03.jpg";
import md25_04 from "@/assets/gallery/maryland-2025-04.jpg";
import md25_05 from "@/assets/gallery/maryland-2025-05.jpg";
import md25_06 from "@/assets/gallery/maryland-2025-06.jpg";
import md25_07 from "@/assets/gallery/maryland-2025-07.jpg";
import md25_08 from "@/assets/gallery/maryland-2025-08.jpg";
import md25_09 from "@/assets/gallery/maryland-2025-09.jpg";
import okto24_01 from "@/assets/gallery/oktobajafest-2024-01.jpg";
import okto24_02 from "@/assets/gallery/oktobajafest-2024-02.jpg";
import okto24_03 from "@/assets/gallery/oktobajafest-2024-03.jpg";
import okto24_04 from "@/assets/gallery/oktobajafest-2024-04.jpg";
import okto24_05 from "@/assets/gallery/oktobajafest-2024-05.jpg";
import okto24_06 from "@/assets/gallery/oktobajafest-2024-06.jpg";
import wpt24_01 from "@/assets/gallery/williamsport-2024-01.jpg";
import wpt24_02 from "@/assets/gallery/williamsport-2024-02.jpg";
import wpt24_03 from "@/assets/gallery/williamsport-2024-03.jpg";
import wpt24_04 from "@/assets/gallery/williamsport-2024-04.jpg";
import wpt24_05 from "@/assets/gallery/williamsport-2024-05.jpg";
import wpt24_06 from "@/assets/gallery/williamsport-2024-06.jpg";
import wpt24_07 from "@/assets/gallery/williamsport-2024-07.jpg";
import wpt24_08 from "@/assets/gallery/williamsport-2024-08.jpg";

export type Photo = { src: StaticImageData; alt: string };

type Album = {
  // Must match a competition name in lib/content.ts, which supplies the dates.
  competition: string;
  photos: Photo[];
};

export const albums: Album[] = [
  {
    competition: "OktoBAJAfest 2025",
    photos: [
      { src: okto25_01, alt: "The team in yellow shirts posing around car 84 in front of fall foliage" },
      { src: okto25_02, alt: "Car 84 waiting at a cone course while event staff look on" },
      { src: okto25_03, alt: "Teams crowded around a trailer in the pits, with car 84 parked out front" },
      { src: okto25_04, alt: "Team members working on car 84's front wheel in the pits" },
      { src: okto25_05, alt: "Car 84's number plate with its OktoBAJAfest 2025 Passed Tech sticker" },
      { src: okto25_06, alt: "Two team members with car 84 on a wooded dirt trail" },
      { src: okto25_07, alt: "Car 84 lined up at the start of the short track" },
      { src: okto25_08, alt: "Car 84 leading a line of cars across the grass" },
      { src: okto25_09, alt: "Team members in yellow and pink shirts on a grassy hilltop" },
      { src: okto25_10, alt: "Team members gathered around car 84 on a sunny afternoon" },
      { src: okto25_11, alt: "The team in yellow shirts pushing car 84 up a dirt road" },
      { src: okto25_12, alt: "Close-up of car 84's pink control arms and blue coilover shock" },
    ],
  },
  {
    competition: "Baja SAE Maryland",
    photos: [
      { src: md25_01, alt: "The team in light blue shirts posing with car 84" },
      { src: md25_02, alt: "Car 84 loaded in the back of the team's box truck" },
      { src: md25_03, alt: "Team members sitting in car 84 under the pit canopy" },
      { src: md25_04, alt: "A team member working underneath car 84 in the pits" },
      { src: md25_05, alt: "Car 84's number plate and event stickers" },
      { src: md25_06, alt: "The team working on car 84 under a white tent" },
      { src: md25_07, alt: "Team members tipping car 84 onto its side by the event tents" },
      { src: md25_08, alt: "Cars racing across the dirt endurance course" },
      { src: md25_09, alt: "Car 84 parked in the grass by the team trailers" },
    ],
  },
  {
    competition: "OktoBAJAfest 2024",
    photos: [
      { src: okto24_01, alt: "Car 64 parked on the grass beside a traffic cone" },
      { src: okto24_02, alt: "Team members crowded around car 64 making repairs" },
      { src: okto24_03, alt: "Car 64 on the hill climb as a team member watches" },
      { src: okto24_04, alt: "An obstacle course of logs and cones laid out across a field" },
      { src: okto24_05, alt: "Car 64 hitched behind a utility vehicle for a tow" },
      { src: okto24_06, alt: "Close-up of car 64's seat and red harness" },
    ],
  },
  {
    competition: "Baja SAE Williamsport",
    photos: [
      { src: wpt24_01, alt: "The team posing with car 64 in the pits" },
      { src: wpt24_02, alt: "Team members working on car 64 under a pit canopy" },
      { src: wpt24_03, alt: "Car 64's brake light and inspection stickers" },
      { src: wpt24_04, alt: "Car 64's number plate" },
      { src: wpt24_05, alt: "A muddy car 64 rolling through the pits" },
      { src: wpt24_06, alt: "A driver in a helmet climbing out of a mud-covered car 64" },
      { src: wpt24_07, alt: "Team members working under car 64 beside a gravel road" },
      { src: wpt24_08, alt: "Close-up of car 64's steering wheel and dash" },
    ],
  },
];

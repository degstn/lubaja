import type { StaticImageData } from "next/image";
import afco from "@/assets/sponsors/afco.png";
import asme from "@/assets/sponsors/asme.png";
import cargoraxx from "@/assets/sponsors/cargoraxx.png";
import dorman from "@/assets/sponsors/dorman.png";
import fiveRivers from "@/assets/sponsors/five-rivers.png";
import fkBearings from "@/assets/sponsors/fk-bearings.png";
import frazier from "@/assets/sponsors/frazier.png";
import geneHaas from "@/assets/sponsors/gene-haas-foundation.png";
import kingCoatings from "@/assets/sponsors/king-coatings.png";
import lehighRossin from "@/assets/sponsors/lehigh-rossin.png";
import sae from "@/assets/sponsors/sae-international.png";
import solidworks from "@/assets/sponsors/solidworks.png";
import speedyMetals from "@/assets/sponsors/speedy-metals.png";
import spiegler from "@/assets/sponsors/spiegler.png";

export type Sponsor = {
  name: string;
  url?: string;
  // Logo artwork made for a dark background.
  dark?: boolean;
} & (
  | { logo: StaticImageData; wordmark?: never }
  // Sponsors without a logo file get their name set in type instead.
  | { wordmark: string; logo?: never }
);

export const sponsors: Sponsor[] = [
  {
    name: "Lehigh Rossin College of Engineering",
    logo: lehighRossin,
    url: "https://engineering.lehigh.edu/",
  },
  { name: "SAE International", logo: sae, url: "https://www.sae.org/" },
  { name: "SOLIDWORKS", logo: solidworks, url: "https://www.solidworks.com/" },
  { name: "FK Bearings", logo: fkBearings, url: "https://www.fkrodends.com/" },
  { name: "CargoRaxx", logo: cargoraxx, url: "https://cargoraxx.com/" },
  { name: "Speedy Metals", logo: speedyMetals, url: "https://www.speedymetals.com/" },
  { name: "AFCO", logo: afco, url: "https://www.afcoracing.com/" },
  { name: "Spiegler", logo: spiegler, url: "https://spieglerusa.com/" },
  { name: "King Coatings", logo: kingCoatings, url: "https://king-coatings.com/" },
  { name: "Frazier Industrial", logo: frazier, url: "https://frazier.com/" },
  { name: "ASME", logo: asme, url: "https://www.asme.org/" },
  {
    name: "Gene Haas Foundation",
    logo: geneHaas,
    url: "https://www.ghaasfoundation.org/",
    dark: true,
  },
  { name: "Dorman Products", logo: dorman, url: "https://www.dormanproducts.com/" },
  { name: "Five Rivers Fabrication", logo: fiveRivers, url: "https://fiveriversfab.com/", dark: true },
  { name: "Aremac", wordmark: "aremac", url: "https://www.aremac.tech/" },
];

import { ButtonLink } from "@/components/button-link";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-brown">
      <LogoMark className="absolute top-1/2 -right-[12%] -z-10 h-[150%] w-auto -translate-y-1/2 text-rust/60" />
      <div className="frame flex min-h-[70svh] flex-col justify-center py-20">
        <p className="eyebrow text-gold">404</p>
        <h1 className="headline mt-4 text-[clamp(6rem,22vw,18rem)] text-white">DNF</h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-tan">
          Did not finish. This page broke down somewhere on the course.
        </p>
        <div className="mt-10">
          <ButtonLink href="/">Back to the pits</ButtonLink>
        </div>
      </div>
    </section>
  );
}

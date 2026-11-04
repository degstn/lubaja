import { logo } from "@/lib/logo-paths";

type LogoMarkProps = {
  className?: string;
  title?: string;
};

export function LogoMark({ className, title }: LogoMarkProps) {
  return (
    <svg
      viewBox={logo.viewBox}
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {logo.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

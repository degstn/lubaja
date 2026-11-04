export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="headline text-[clamp(2.5rem,6vw,5rem)] text-white">{children}</h1>;
}

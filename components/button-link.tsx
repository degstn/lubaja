import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "dark" | "outline";
};

const variants = {
  solid: "bg-gold text-ink hover:bg-white",
  dark: "bg-ink text-white hover:bg-brown focus-visible:outline-ink",
  outline: "border-2 border-current hover:border-white hover:bg-white hover:text-ink",
};

export function ButtonLink({ href, children, variant = "solid" }: ButtonLinkProps) {
  const className = `inline-flex h-12 -skew-x-8 items-center px-6 transition-colors ${variants[variant]}`;
  const label = (
    <span className="headline inline-block skew-x-8 text-sm tracking-wider">{children}</span>
  );

  if (href.startsWith("http") || href.endsWith(".pdf")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

type PhotoSlotProps = {
  label: string;
  className?: string;
};

export function PhotoSlot({ label, className = "" }: PhotoSlotProps) {
  return (
    <div className={`chamfer stripes flex items-end bg-soil text-tan ${className}`}>
      <span className="eyebrow m-4 bg-ink/80 px-2 py-1">Photo needed · {label}</span>
    </div>
  );
}

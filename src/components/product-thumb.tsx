import { cn } from "@/lib/utils";

export function ProductThumb({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("size-10 rounded-lg object-cover bg-secondary", className)}
    />
  );
}

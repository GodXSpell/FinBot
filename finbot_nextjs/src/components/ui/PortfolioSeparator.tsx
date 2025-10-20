import { cn } from "@/lib/utils";

interface PortfolioSeparatorProps {
  className?: string;
}

export function PortfolioSeparator({ className }: PortfolioSeparatorProps) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-border",
        "before:absolute before:-left-[100vw] before:-z-10 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_0,transparent_50%)] before:bg-[length:10px_10px]",
        className
      )}
    />
  );
}
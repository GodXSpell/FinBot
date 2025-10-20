"use client";

import { Separator as SeparatorPrimitive } from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  fullWidth = false,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive> & {
  fullWidth?: boolean;
}) {
  if (fullWidth) {
    return (
      <div className="relative w-screen -mx-[50vw] left-1/2 h-px bg-border" />
    );
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  );
}

export { Separator };

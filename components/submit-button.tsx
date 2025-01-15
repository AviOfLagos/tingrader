// components/submit-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
}

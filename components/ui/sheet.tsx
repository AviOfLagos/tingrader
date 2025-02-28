// "use client";

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetTitle = DialogPrimitive.Title;

// Add SheetHeader component
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-4 py-2 border-b', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

// Add SheetDescription component
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400 px-4', className)}
    {...props}
  />
));
SheetDescription.displayName = 'SheetDescription';

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: 'top' | 'bottom' | 'left' | 'right';
  }
>(({ className, children, side = 'right', ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50',
        side === 'left' ? 'left-0 top-0 h-full w-3/4' : undefined,
        side === 'right' ? 'right-0 top-0 h-full w-3/4' : undefined,
        side === 'top' ? 'top-0 left-0 w-full h-1/2' : undefined,
        side === 'bottom' ? 'bottom-0 left-0 w-full h-1/2' : undefined,
        'bg-white dark:bg-gray-900 p-4 overflow-auto',
        className
      )}
      {...props}
    >
      <VisuallyHidden>
        <SheetTitle>More Navigation</SheetTitle>
      </VisuallyHidden>
      {children}
      <SheetClose className="absolute top-4 right-4">
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

SheetContent.displayName = 'SheetContent';

export { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle, SheetHeader, SheetDescription };

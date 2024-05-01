import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  ',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-black font-medium text-md rounded-sm shadow ',
        pendiente:
          'border-transparent bg-primary text-black shadow ',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground ',
        entrevista:
          'border-transparent bg-green-700 text-primary-foreground ',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow ',
        rechazado:
          'border-transparent bg-destructive text-destructive-foreground shadow ',
        outline: 'text-foreground',
        canDeleted: 
        'border-transparent bg-primary text-black font-medium text-md rounded-sm shadow hover:bg-destructive hover:text-white hover:cursor-pointer'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface SectionCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  headerAction?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  contentClassName?: string;
}

export function SectionCard({
  className,
  title,
  description,
  headerAction,
  footer,
  children,
  contentClassName,
  ...props
}: SectionCardProps) {
  const hasHeader = title || description || headerAction;

  return (
    <Card className={className} {...props}>
      {hasHeader && (
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="min-w-0 flex-1 space-y-1.5">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </CardHeader>
      )}
      {children && (
        <CardContent className={cn(hasHeader && "pt-0", contentClassName)}>
          {children}
        </CardContent>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

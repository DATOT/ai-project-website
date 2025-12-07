// components/ui/card.tsx
import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bordered?: boolean;
  hover?: boolean;
  compact?: boolean;
}

export const Card = ({
  children,
  bordered = true,
  hover = true,
  compact = false,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={clsx(
        "card bg-base-100",
        bordered && "card-bordered",
        hover && "hover:shadow-xl hover:scale-[1.02] transition-all duration-200",
        compact && "card-compact",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = ({ children, className, ...props }: CardBodyProps) => {
  return (
    <div {...props} className={clsx("card-body", className)}>
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle = ({
  children,
  className,
  ...props
}: CardTitleProps) => {
  return (
    <h2 {...props} className={clsx("card-title", className)}>
      {children}
    </h2>
  );
};

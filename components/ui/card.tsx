import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  loading?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
  justify?: 'start' | 'center' | 'end' | 'between';
}

const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm',
  elevated: 'bg-white border-0 shadow-lg',
  outlined: 'bg-white border-2 border-gray-300 shadow-none',
  ghost: 'bg-transparent border-0 shadow-none'
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};

const contentPadding = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className,
    variant = 'default',
    padding = 'md',
    interactive = false,
    loading = false,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg relative overflow-hidden',
          'transition-all duration-200 ease-in-out',
          
          // Variant styles
          cardVariants[variant],
          
          // Padding
          cardPadding[padding],
          
          // Interactive state
          interactive && [
            'cursor-pointer',
            'hover:shadow-md hover:-translate-y-0.5',
            'active:translate-y-0 active:shadow-sm',
            'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50'
          ],
          
          // Loading state
          loading && 'animate-pulse',
          
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-10">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, border = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5',
          border && 'border-b border-gray-200 pb-4 mb-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight text-gray-900',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-sm text-gray-600 leading-relaxed',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = 'none', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          contentPadding[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ 
    className, 
    border = false, 
    justify = 'start',
    children, 
    ...props 
  }, ref) => {
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center', 
      end: 'justify-end',
      between: 'justify-between'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center pt-4',
          justifyClasses[justify],
          border && 'border-t border-gray-200 mt-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Pre-configured card variants for common use cases
export const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  ...props 
}: {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
} & Omit<CardProps, 'children'>) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600', 
    neutral: 'text-gray-600'
  };

  return (
    <Card variant="elevated" interactive {...props}>
      <CardContent padding="lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardDescription className="mb-1">{title}</CardDescription>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {description && (
              <p className={cn(
                'text-sm mt-1',
                trend ? trendColors[trend] : 'text-gray-600'
              )}>
                {description}
              </p>
            )}
          </div>
          {icon && (
            <div className="ml-4 text-gray-400">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const ActionCard = ({ 
  title, 
  description, 
  action, 
  icon,
  ...props 
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
} & Omit<CardProps, 'children'>) => {
  return (
    <Card variant="default" interactive {...props}>
      <CardContent padding="lg">
        <div className="flex items-start space-x-4">
          {icon && (
            <div className="flex-shrink-0 text-blue-600">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="mb-1">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

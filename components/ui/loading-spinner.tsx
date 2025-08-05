import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'current';
  speed?: 'slow' | 'normal' | 'fast';
  overlay?: boolean;
  text?: string;
  fullScreen?: boolean;
}

export interface DotsLoaderProps extends Omit<LoadingSpinnerProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'white';
}

export interface PulseLoaderProps extends Omit<LoadingSpinnerProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'white';
}

const spinnerSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4', 
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const spinnerColors = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  white: 'text-white',
  current: 'text-current'
};

const spinnerSpeeds = {
  slow: 'animate-spin-slow',
  normal: 'animate-spin',
  fast: 'animate-spin-fast'
};

const dotSizes = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2', 
  lg: 'w-3 h-3',
  xl: 'w-4 h-4'
};

const pulseSizes = {
  xs: 'w-2 h-2',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6', 
  xl: 'w-8 h-8'
};

export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({
    className,
    size = 'md',
    variant = 'primary',
    speed = 'normal',
    overlay = false,
    text,
    fullScreen = false,
    ...props
  }, ref) => {
    const spinner = (
      <div
        ref={ref}
        className={cn(
          'inline-block',
          spinnerSizes[size],
          spinnerColors[variant],
          spinnerSpeeds[speed],
          className
        )}
        {...props}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );

    if (fullScreen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="text-center">
            {spinner}
            {text && (
              <p className="mt-4 text-sm text-gray-600 font-medium">
                {text}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (overlay) {
      return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            {spinner}
            {text && (
              <p className="mt-2 text-xs text-gray-600">
                {text}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (text) {
      return (
        <div className="inline-flex items-center space-x-2">
          {spinner}
          <span className="text-sm text-gray-600 font-medium">
            {text}
          </span>
        </div>
      );
    }

    return spinner;
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export const DotsLoader = React.forwardRef<HTMLDivElement, DotsLoaderProps>(
  ({
    className,
    size = 'md',
    variant = 'primary',
    speed = 'normal',
    text,
    ...props
  }, ref) => {
    const animationDelay = speed === 'fast' ? '0.1s' : speed === 'slow' ? '0.3s' : '0.2s';
    
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center space-x-1', className)}
        {...props}
      >
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                'rounded-full animate-bounce',
                dotSizes[size],
                {
                  'bg-blue-600': variant === 'primary',
                  'bg-gray-600': variant === 'secondary', 
                  'bg-white': variant === 'white'
                }
              )}
              style={{
                animationDelay: `${index * parseFloat(animationDelay)}s`,
                animationDuration: speed === 'fast' ? '0.6s' : speed === 'slow' ? '1.4s' : '1s'
              }}
            />
          ))}
        </div>
        {text && (
          <span className="ml-3 text-sm text-gray-600 font-medium">
            {text}
          </span>
        )}
      </div>
    );
  }
);

DotsLoader.displayName = 'DotsLoader';

export const PulseLoader = React.forwardRef<HTMLDivElement, PulseLoaderProps>(
  ({
    className,
    size = 'md',
    variant = 'primary',
    speed = 'normal',
    text,
    ...props
  }, ref) => {
    const animationDuration = speed === 'fast' ? '1s' : speed === 'slow' ? '2s' : '1.5s';
    
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center space-x-2', className)}
        {...props}
      >
        <div className="relative">
          {[0, 1].map((index) => (
            <div
              key={index}
              className={cn(
                'absolute rounded-full animate-ping',
                pulseSizes[size],
                {
                  'bg-blue-600': variant === 'primary',
                  'bg-gray-600': variant === 'secondary',
                  'bg-white': variant === 'white'
                }
              )}
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration,
                opacity: index === 0 ? 0.75 : 0.5
              }}
            />
          ))}
          <div
            className={cn(
              'relative rounded-full',
              pulseSizes[size],
              {
                'bg-blue-600': variant === 'primary',
                'bg-gray-600': variant === 'secondary',
                'bg-white': variant === 'white'
              }
            )}
          />
        </div>
        {text && (
          <span className="text-sm text-gray-600 font-medium">
            {text}
          </span>
        )}
      </div>
    );
  }
);

PulseLoader.displayName = 'PulseLoader';

// Skeleton loader for content placeholders
export const SkeletonLoader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    lines?: number;
    avatar?: boolean;
    width?: string;
    height?: string;
  }
>(({ className, lines = 3, avatar = false, width, height, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('animate-pulse', className)}
      {...props}
    >
      {avatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-4 bg-gray-200 rounded"
            style={{
              width: width || (index === lines - 1 ? '75%' : '100%'),
              height: height || '16px'
            }}
          />
        ))}
      </div>
    </div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';

// Pre-configured loaders for common use cases
export const PageLoader = ({ text = 'Laddar...' }: { text?: string }) => (
  <LoadingSpinner 
    size="lg" 
    variant="primary" 
    fullScreen 
    text={text}
  />
);

export const ButtonLoader = ({ text }: { text?: string }) => (
  <LoadingSpinner 
    size="sm" 
    variant="white" 
    text={text}
  />
);

export const CardLoader = () => (
  <div className="p-6">
    <SkeletonLoader lines={3} />
  </div>
);

export const ListLoader = ({ items = 5 }: { items?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, index) => (
      <SkeletonLoader key={index} lines={2} avatar />
    ))}
  </div>
);

// Workout-specific loaders
export const WorkoutLoader = () => (
  <div className="space-y-4">
    <SkeletonLoader lines={1} height="32px" width="60%" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <SkeletonLoader lines={3} />
        </div>
      ))}
    </div>
  </div>
);

export const MealLoader = () => (
  <div className="space-y-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="space-y-3">
        <SkeletonLoader lines={1} height="24px" width="40%" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, mealIndex) => (
            <div key={mealIndex} className="p-4 border rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <SkeletonLoader lines={2} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

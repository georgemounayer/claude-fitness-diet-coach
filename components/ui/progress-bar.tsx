import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  showLabel?: boolean;
  showPercentage?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
  indeterminate?: boolean;
}

export interface CircularProgressProps extends Omit<ProgressBarProps, 'size' | 'striped'> {
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  children?: React.ReactNode;
}

const progressVariants = {
  default: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-cyan-500'
};

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4'
};

const backgroundVariants = {
  default: 'bg-blue-100',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  danger: 'bg-red-100',
  info: 'bg-cyan-100'
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    className,
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    showPercentage = false,
    label,
    animated = false,
    striped = false,
    indeterminate = false,
    ...props
  }, ref) => {
    const percentage = indeterminate ? 0 : Math.min(Math.max((value / max) * 100, 0), 100);
    const displayValue = indeterminate ? 'Laddar...' : `${Math.round(percentage)}%`;

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Label */}
        {(showLabel || label) && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {label || 'Framsteg'}
            </span>
            {showPercentage && (
              <span className="text-sm text-gray-600">
                {displayValue}
              </span>
            )}
          </div>
        )}

        {/* Progress container */}
        <div
          className={cn(
            'w-full rounded-full overflow-hidden',
            progressSizes[size],
            backgroundVariants[variant]
          )}
        >
          {/* Progress bar */}
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              progressVariants[variant],
              
              // Striped pattern
              striped && 'bg-stripes',
              
              // Animation
              animated && 'transition-all duration-500 ease-in-out',
              
              // Indeterminate animation
              indeterminate && 'animate-pulse'
            )}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              background: striped ? `
                repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.2) 10px,
                  rgba(255,255,255,0.2) 20px
                )
              ` : undefined
            }}
          >
            {indeterminate && (
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({
    className,
    value,
    max = 100,
    variant = 'default',
    size = 80,
    strokeWidth = 8,
    showValue = true,
    showPercentage = false,
    label,
    indeterminate = false,
    children,
    ...props
  }, ref) => {
    const percentage = indeterminate ? 25 : Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const progressColor = {
      default: '#3B82F6',
      success: '#10B981', 
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#06B6D4'
    }[variant];

    const backgroundColor = {
      default: '#DBEAFE',
      success: '#D1FAE5',
      warning: '#FEF3C7', 
      danger: '#FEE2E2',
      info: '#CFFAFE'
    }[variant];

    return (
      <div className={cn('relative inline-flex items-center justify-center', className)}>
        <svg
          ref={ref}
          width={size}
          height={size}
          className={cn(
            'transform -rotate-90',
            indeterminate && 'animate-spin'
          )}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-300 ease-out',
              !indeterminate && 'transition-stroke-dashoffset'
            )}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children || (
            <>
              {showValue && (
                <span className="text-lg font-semibold text-gray-900">
                  {indeterminate ? '...' : Math.round(percentage)}
                  {showPercentage && '%'}
                </span>
              )}
              {label && (
                <span className="text-xs text-gray-600 mt-1">
                  {label}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

// Pre-configured progress components for common use cases
export const WeightProgress = ({ 
  current, 
  target, 
  unit = 'kg',
  ...props 
}: {
  current: number;
  target: number;
  unit?: string;
} & Omit<ProgressBarProps, 'value' | 'max'>) => {
  const progress = Math.abs(current - target);
  const maxProgress = Math.abs(target);
  
  return (
    <ProgressBar
      value={maxProgress - progress}
      max={maxProgress}
      label="Viktmål"
      showPercentage
      variant="success"
      {...props}
    />
  );
};

export const WorkoutProgress = ({ 
  completed, 
  total,
  ...props 
}: {
  completed: number;
  total: number;
} & Omit<ProgressBarProps, 'value' | 'max'>) => {
  return (
    <ProgressBar
      value={completed}
      max={total}
      label="Träningspass"
      showPercentage
      variant="info"
      {...props}
    />
  );
};

export const CalorieProgress = ({ 
  consumed, 
  target,
  ...props 
}: {
  consumed: number;
  target: number;
} & Omit<CircularProgressProps, 'value' | 'max'>) => {
  const percentage = (consumed / target) * 100;
  const variant = percentage > 110 ? 'danger' : percentage > 90 ? 'warning' : 'success';
  
  return (
    <CircularProgress
      value={consumed}
      max={target}
      variant={variant}
      showValue
      label="kcal"
      {...props}
    />
  );
};

export const MacroProgress = ({ 
  current, 
  target, 
  type,
  ...props 
}: {
  current: number;
  target: number;
  type: 'protein' | 'carbs' | 'fat';
} & Omit<ProgressBarProps, 'value' | 'max'>) => {
  const labels = {
    protein: 'Protein',
    carbs: 'Kolhydrater',
    fat: 'Fett'
  };

  const variants = {
    protein: 'success' as const,
    carbs: 'warning' as const,
    fat: 'info' as const
  };

  return (
    <ProgressBar
      value={current}
      max={target}
      label={labels[type]}
      showPercentage
      variant={variants[type]}
      size="sm"
      {...props}
    />
  );
};

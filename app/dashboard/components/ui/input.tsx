'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'underlined'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    variant = 'default',
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    const baseStyles = 'w-full transition-colors focus-within:outline-none'
    
    const variants = {
      default: `
        border border-gray-300 dark:border-gray-600 rounded-lg 
        bg-white dark:bg-gray-800 
        focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20
        ${error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20' : ''}
        ${disabled ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed opacity-60' : ''}
      `,
      filled: `
        border-0 rounded-lg 
        bg-gray-100 dark:bg-gray-700
        focus-within:bg-white dark:focus-within:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500/20
        ${error ? 'bg-red-50 dark:bg-red-900/20 focus-within:ring-red-500/20' : ''}
        ${disabled ? 'bg-gray-50 dark:bg-gray-600 cursor-not-allowed opacity-60' : ''}
      `,
      underlined: `
        border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none 
        bg-transparent 
        focus-within:border-blue-500
        ${error ? 'border-red-500 focus-within:border-red-500' : ''}
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
      `
    }

    const inputStyles = `
      flex-1 px-3 py-2.5 text-sm
      placeholder:text-gray-500 dark:placeholder:text-gray-400
      text-gray-900 dark:text-white
      bg-transparent
      focus:outline-none
      disabled:cursor-not-allowed
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon || isPassword ? 'pr-10' : ''}
    `

    return (
      <div className="space-y-1">
        {label && (
          <label className={cn(
            "block text-sm font-medium transition-colors",
            error ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300",
            disabled && "opacity-60"
          )}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className={cn(baseStyles, variants[variant])}>
          <div className="relative flex items-center">
            {leftIcon && (
              <div className="absolute left-3 flex items-center pointer-events-none">
                <div className={cn(
                  "text-gray-500 dark:text-gray-400",
                  isFocused && !error && "text-blue-500",
                  error && "text-red-500"
                )}>
                  {leftIcon}
                </div>
              </div>
            )}
            
            <input
              type={inputType}
              className={cn(inputStyles, className)}
              ref={ref}
              disabled={disabled}
              onFocus={(e) => {
                setIsFocused(true)
                props.onFocus?.(e)
              }}
              onBlur={(e) => {
                setIsFocused(false)
                props.onBlur?.(e)
              }}
              {...props}
            />
            
            {isPassword && (
              <button
                type="button"
                className="absolute right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            
            {rightIcon && !isPassword && (
              <div className="absolute right-3 flex items-center pointer-events-none">
                <div className={cn(
                  "text-gray-500 dark:text-gray-400",
                  isFocused && !error && "text-blue-500",
                  error && "text-red-500"
                )}>
                  {rightIcon}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {(error || helperText) && (
          <div className="text-xs">
            {error && (
              <p className="text-red-600 dark:text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-current rounded-full" />
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-gray-500 dark:text-gray-400">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }

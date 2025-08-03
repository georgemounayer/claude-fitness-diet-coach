import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format weight for display
 * @param weight - Weight in kg
 * @returns Formatted weight string
 */
export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} kg`;
}

/**
 * Format height for display
 * @param height - Height in cm
 * @returns Formatted height string
 */
export function formatHeight(height: number): string {
  return `${height} cm`;
}

/**
 * Calculate BMI
 * @param weight - Weight in kg
 * @param height - Height in cm
 * @returns BMI value
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Get BMI category
 * @param bmi - BMI value
 * @returns BMI category string
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Undervikt';
  if (bmi < 25) return 'Normalvikt';
  if (bmi < 30) return 'Övervikt';
  return 'Fetma';
}

/**
 * Format date for display
 * @param date - Date object or string
 * @param locale - Locale string (default: 'sv-SE')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale: string = 'sv-SE'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format time for display
 * @param date - Date object or string
 * @param locale - Locale string (default: 'sv-SE')
 * @returns Formatted time string
 */
export function formatTime(date: Date | string, locale: string = 'sv-SE'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Format duration in minutes to readable string
 * @param minutes - Duration in minutes
 * @returns Formatted duration string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} tim`;
  }
  return `${hours} tim ${remainingMinutes} min`;
}

/**
 * Calculate percentage
 * @param value - Current value
 * @param total - Total value
 * @returns Percentage as number (0-100)
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Clamp number between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random ID string
 * @param length - Length of the ID (default: 8)
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep/delay function
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if device is mobile
 * @returns Boolean indicating if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string to specified length
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Format calories for display
 * @param calories - Calories as number
 * @returns Formatted calories string
 */
export function formatCalories(calories: number): string {
  return `${Math.round(calories)} kcal`;
}

/**
 * Format macros (protein, carbs, fat) for display
 * @param grams - Grams as number
 * @returns Formatted grams string
 */
export function formatMacros(grams: number): string {
  return `${Math.round(grams)}g`;
}

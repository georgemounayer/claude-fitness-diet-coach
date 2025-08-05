export type UserRole = 'user' | 'coach' | 'superadmin';

export type Gender = 'male' | 'female' | 'other';

export type FitnessGoal = 'lose_weight' | 'build_muscle' | 'stay_healthy' | 'improve_endurance';

export type WorkoutType = 'home' | 'gym' | 'outdoor' | 'swimming' | 'running' | 'weights';

export type ContentPreference = 'workout_plan' | 'meal_plan' | 'both';

export type Language = 'sv' | 'en';

// Base User interface from Supabase Auth
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    [key: string]: any;
  };
}

// Extended user profile stored in our database
export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  language: Language;
  
  // Personal information
  gender: Gender;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  country: string;
  address?: string;
  phone?: string;
  
  // Fitness preferences
  fitness_goals: FitnessGoal[];
  workout_types: WorkoutType[];
  content_preferences: ContentPreference[];
  
  // Dietary information
  allergies?: string;
  dietary_preferences?: string;
  dietary_restrictions?: string[];
  
  // Onboarding status
  onboarding_completed: boolean;
  onboarding_step: number;
  
  // Subscription info
  subscription_status: 'trial' | 'active' | 'inactive' | 'cancelled';
  subscription_end_date?: string;
  trial_end_date?: string;
  
  // Preferences
  notifications_enabled: boolean;
  push_notifications: boolean;
  email_notifications: boolean;
  weekly_reports: boolean;
  
  // Privacy
  privacy_policy_accepted: boolean;
  terms_accepted: boolean;
  marketing_consent: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  last_active_at?: string;
}

// Authentication state
export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
  remember_me?: boolean;
}

// Registration form data
export interface RegisterFormData {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  marketing_consent?: boolean;
}

// Password reset form data
export interface PasswordResetFormData {
  email: string;
}

// Update password form data
export interface UpdatePasswordFormData {
  current_password: string;
  new_password: string;
  password_confirmation: string;
}

// Onboarding step data
export interface OnboardingStepData {
  step: number;
  data: Partial<UserProfile>;
}

// Complete onboarding data
export interface OnboardingData {
  // Step 1: Language
  language: Language;
  
  // Step 2: Personal Info
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  
  // Step 3: Location
  country: string;
  address?: string;
  
  // Step 4: Goals
  fitness_goals: FitnessGoal[];
  
  // Step 5: Workout Preferences
  workout_types: WorkoutType[];
  
  // Step 6: Content Preferences
  content_preferences: ContentPreference[];
  
  // Step 7: Dietary Info
  allergies?: string;
  dietary_preferences?: string;
  dietary_restrictions?: string[];
}

// Profile update data
export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  gender?: Gender;
  age?: number;
  weight?: number;
  height?: number;
  country?: string;
  address?: string;
  phone?: string;
  fitness_goals?: FitnessGoal[];
  workout_types?: WorkoutType[];
  content_preferences?: ContentPreference[];
  allergies?: string;
  dietary_preferences?: string;
  dietary_restrictions?: string[];
  language?: Language;
  notifications_enabled?: boolean;
  push_notifications?: boolean;
  email_notifications?: boolean;
  weekly_reports?: boolean;
}

// Auth session data
export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: User;
}

// Auth error types
export type AuthError = 
  | 'invalid_credentials'
  | 'email_not_confirmed'
  | 'user_not_found'
  | 'weak_password'
  | 'email_already_registered'
  | 'signup_disabled'
  | 'too_many_requests'
  | 'session_expired'
  | 'network_error'
  | 'unknown_error';

// Auth action types for state management
export type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PROFILE'; payload: UserProfile | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'RESET_AUTH' };

// Auth context type
export interface AuthContextType {
  // State
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  
  // Actions
  signIn: (data: LoginFormData) => Promise<void>;
  signUp: (data: RegisterFormData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (data: UpdatePasswordFormData) => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  // Helpers
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
  isOnboardingComplete: boolean;
  canAccessFeature: (feature: string) => boolean;
}

// Route protection types
export type ProtectedRouteConfig = {
  requireAuth: boolean;
  requireOnboarding?: boolean;
  requireSubscription?: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
};

// Social auth providers
export type AuthProvider = 'google' | 'apple' | 'facebook';

// Social auth data
export interface SocialAuthData {
  provider: AuthProvider;
  redirect_url?: string;
}

// Account deletion reasons
export type AccountDeletionReason = 
  | 'not_using'
  | 'privacy_concerns'
  | 'found_alternative'
  | 'technical_issues'
  | 'cost'
  | 'other';

export interface AccountDeletionData {
  reason: AccountDeletionReason;
  feedback?: string;
  delete_data: boolean;
}

// Notification preferences
export interface NotificationPreferences {
  push_notifications: boolean;
  email_notifications: boolean;
  weekly_reports: boolean;
  workout_reminders: boolean;
  meal_reminders: boolean;
  progress_updates: boolean;
  marketing_emails: boolean;
}

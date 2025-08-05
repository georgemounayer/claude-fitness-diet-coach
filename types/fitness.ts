export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutCategory = 'strength' | 'cardio' | 'flexibility' | 'balance' | 'hiit' | 'yoga' | 'pilates';

export type MuscleGroup = 
  | 'chest' | 'back' | 'shoulders' | 'arms' | 'biceps' | 'triceps'
  | 'legs' | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves'
  | 'core' | 'abs' | 'full_body';

export type ExerciseType = 'reps' | 'time' | 'distance' | 'reps_weight';

export type EquipmentType = 
  | 'none' | 'dumbbells' | 'barbell' | 'resistance_bands' | 'kettlebell'
  | 'medicine_ball' | 'pull_up_bar' | 'bench' | 'gym_machine' | 'cable';

export type WorkoutStatus = 'scheduled' | 'in_progress' | 'completed' | 'skipped';

export type SetType = 'working' | 'warmup' | 'dropset' | 'superset' | 'rest_pause';

// Base Exercise definition
export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  muscle_groups: MuscleGroup[];
  category: WorkoutCategory;
  difficulty: WorkoutDifficulty;
  equipment: EquipmentType[];
  type: ExerciseType;
  
  // Media
  image_url?: string;
  video_url?: string;
  gif_url?: string;
  
  // Metadata
  calories_per_minute?: number;
  created_at: string;
  updated_at: string;
  
  // Alternatives for injuries/equipment
  alternatives?: string[]; // Exercise IDs
  modifications?: {
    easier: string[];
    harder: string[];
  };
}

// Set data for an exercise
export interface ExerciseSet {
  id: string;
  set_number: number;
  type: SetType;
  
  // Performance data (depends on exercise type)
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  distance?: number; // in meters
  rest_time?: number; // in seconds
  
  // Completion status
  completed: boolean;
  notes?: string;
  
  // RPE (Rate of Perceived Exertion) 1-10
  rpe?: number;
}

// Exercise within a workout
export interface WorkoutExercise {
  id: string;
  exercise_id: string;
  exercise: Exercise;
  order: number;
  
  // Prescribed sets
  sets: ExerciseSet[];
  
  // Instructions specific to this workout
  notes?: string;
  rest_between_sets?: number; // in seconds
  
  // Superset grouping
  superset_group?: string;
}

// Complete workout template/plan
export interface Workout {
  id: string;
  name: string;
  description?: string;
  category: WorkoutCategory;
  difficulty: WorkoutDifficulty;
  duration_minutes: number;
  
  // Target audience
  muscle_groups: MuscleGroup[];
  equipment_needed: EquipmentType[];
  
  // Exercises in this workout
  exercises: WorkoutExercise[];
  
  // Metadata
  calories_estimate?: number;
  created_by?: string; // user_id of creator
  is_template: boolean;
  is_public: boolean;
  
  // Stats
  times_completed: number;
  average_rating?: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// User's scheduled or completed workout session
export interface WorkoutSession {
  id: string;
  user_id: string;
  workout_id: string;
  workout: Workout;
  
  // Session details
  scheduled_date: string;
  started_at?: string;
  completed_at?: string;
  duration_minutes?: number;
  
  // Status
  status: WorkoutStatus;
  
  // Performance data
  exercises: WorkoutExercise[]; // With actual performance data
  total_volume?: number; // Total weight lifted
  calories_burned?: number;
  
  // User feedback
  rating?: number; // 1-5 stars
  notes?: string;
  energy_level_before?: number; // 1-10
  energy_level_after?: number; // 1-10
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Weekly workout plan
export interface WorkoutPlan {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  
  // Plan details
  duration_weeks: number;
  difficulty: WorkoutDifficulty;
  goal: string;
  
  // Schedule
  workouts_per_week: number;
  rest_days_per_week: number;
  
  // Workouts in this plan
  workouts: {
    day_of_week: number; // 0-6 (Sunday-Saturday)
    workout_id: string;
    workout: Workout;
  }[];
  
  // Progress tracking
  current_week: number;
  is_active: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  starts_at: string;
  ends_at?: string;
}

// User's fitness measurements and progress
export interface FitnessProgress {
  id: string;
  user_id: string;
  
  // Body measurements
  weight?: number; // kg
  body_fat_percentage?: number;
  muscle_mass?: number; // kg
  
  // Body measurements (cm)
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thighs?: number;
  
  // Performance metrics
  max_bench_press?: number;
  max_squat?: number;
  max_deadlift?: number;
  max_pull_ups?: number;
  
  // Cardio metrics
  resting_heart_rate?: number;
  max_heart_rate?: number;
  vo2_max?: number;
  
  // Flexibility/mobility
  flexibility_score?: number; // 1-10
  
  // Progress photos
  front_photo_url?: string;
  side_photo_url?: string;
  back_photo_url?: string;
  
  // Notes
  notes?: string;
  mood?: number; // 1-10
  sleep_quality?: number; // 1-10
  stress_level?: number; // 1-10
  
  // Timestamp
  recorded_at: string;
  created_at: string;
}

// Exercise personal records
export interface PersonalRecord {
  id: string;
  user_id: string;
  exercise_id: string;
  exercise: Exercise;
  
  // Record data
  weight?: number;
  reps?: number;
  duration?: number;
  distance?: number;
  
  // Calculated metrics
  one_rep_max?: number;
  volume?: number; // weight * reps
  
  // Context
  workout_session_id?: string;
  notes?: string;
  
  // Timestamps
  achieved_at: string;
  created_at: string;
}

// Workout statistics
export interface WorkoutStats {
  user_id: string;
  
  // Overall stats
  total_workouts: number;
  total_duration_minutes: number;
  total_calories_burned: number;
  total_volume: number; // Total weight lifted
  
  // Streak data
  current_streak: number;
  longest_streak: number;
  
  // Weekly stats
  workouts_this_week: number;
  average_workouts_per_week: number;
  
  // Monthly stats
  workouts_this_month: number;
  calories_this_month: number;
  
  // Favorite categories
  favorite_category: WorkoutCategory;
  favorite_muscle_groups: MuscleGroup[];
  
  // Performance trends
  strength_trend: 'improving' | 'maintaining' | 'declining';
  endurance_trend: 'improving' | 'maintaining' | 'declining';
  
  // Last updated
  calculated_at: string;
}

// AI workout generation request
export interface WorkoutGenerationRequest {
  user_id: string;
  
  // Preferences
  duration_minutes: number;
  difficulty: WorkoutDifficulty;
  category?: WorkoutCategory;
  muscle_groups?: MuscleGroup[];
  equipment_available: EquipmentType[];
  
  // Context
  previous_workouts?: string[]; // Recent workout IDs
  injured_areas?: string[];
  energy_level?: number; // 1-10
  
  // Goals
  focus_area?: string;
  specific_goals?: string[];
}

// Rest timer data
export interface RestTimer {
  exercise_id: string;
  set_number: number;
  duration_seconds: number;
  started_at: string;
  is_active: boolean;
}

// Workout feedback for AI improvement
export interface WorkoutFeedback {
  id: string;
  user_id: string;
  workout_id: string;
  session_id: string;
  
  // Ratings (1-5)
  difficulty_rating: number;
  enjoyment_rating: number;
  effectiveness_rating: number;
  
  // Specific feedback
  too_easy_exercises?: string[];
  too_hard_exercises?: string[];
  disliked_exercises?: string[];
  loved_exercises?: string[];
  
  // Free text
  comments?: string;
  suggestions?: string;
  
  // Timestamps
  created_at: string;
}

// Exercise substitution for injuries or preferences
export interface ExerciseSubstitution {
  original_exercise_id: string;
  substitute_exercise_id: string;
  reason: 'injury' | 'equipment' | 'preference' | 'difficulty';
  muscle_groups_maintained: MuscleGroup[];
  created_at: string;
}

// Workout sharing and social features
export interface SharedWorkout {
  id: string;
  workout_id: string;
  shared_by: string; // user_id
  shared_with?: string; // user_id or null for public
  is_public: boolean;
  
  // Social stats
  likes: number;
  saves: number;
  completed_by: number;
  
  // Timestamps
  shared_at: string;
}

// Training split types
export type TrainingSplit = 
  | 'full_body'
  | 'upper_lower'
  | 'push_pull_legs'
  | 'body_part_split'
  | 'custom';

// Workout intensity zones
export type IntensityZone = 'recovery' | 'aerobic' | 'threshold' | 'vo2max' | 'anaerobic';

// Exercise form cues and tips
export interface ExerciseCue {
  exercise_id: string;
  phase: 'setup' | 'execution' | 'breathing' | 'common_mistakes';
  cue: string;
  is_critical: boolean;
}

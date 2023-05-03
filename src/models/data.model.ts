export interface Exercise {
  name: string;
  desc: string;
  img: string;
  equip: string[];
  group: string[];
}

export interface RoutineExercise {
  id: string;
  reps: string;
  sets: number;
}

export interface Routine {
  name: string;
  exercises: RoutineExercise[];
}

export interface Equipment {
  name: string;
  desc: string;
}

export interface WorkoutData {
  exercises: Record<string, Exercise>;
  equipment: Record<string, Equipment>;
  routines: Record<string, Routine>;
}

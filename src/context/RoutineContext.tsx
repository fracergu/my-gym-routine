import { createContext, useState, useEffect, useCallback } from "react";
import workoutData from "../../data/data.json";
import { WorkoutData } from "../models/data.model";

const typedWorkoutData: WorkoutData = workoutData;

interface RoutineContextData {
  workoutData: WorkoutData;
  currentRoutine: string;
  setCurrentRoutine: (id: string) => void;
  updateSetProgress: (exerciseId: string, setsCompleted: number) => void;
  isRoutineComplete: () => boolean;
  routineProgress: Record<string, number>;
  isRoutineBlocked: () => boolean;
}

export const RoutineContext = createContext<RoutineContextData>(
  {} as RoutineContextData
);

interface RoutineProviderProps {
  children: React.ReactNode;
}

export const RoutineProvider: React.FC<RoutineProviderProps> = ({
  children,
}) => {
  const [currentRoutine, setCurrentRoutine] = useState<string>("");
  const [routineProgress, setRoutineProgress] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const storedRoutine = localStorage.getItem("currentRoutine");
    if (storedRoutine) {
      setCurrentRoutine(JSON.parse(storedRoutine));
    } else {
      setCurrentRoutine("1");
      localStorage.setItem("currentRoutine", JSON.stringify("1"));
    }

    const storedProgress = localStorage.getItem("routineProgress");
    if (storedProgress) {
      setRoutineProgress(JSON.parse(storedProgress));
    }
  }, []);

  const isRoutineComplete = useCallback((): boolean => {
    const routine = typedWorkoutData.routines[currentRoutine];
    return routine.exercises.every(
      (exercise) => routineProgress[exercise.id] === exercise.sets
    );
  }, [currentRoutine, routineProgress]);

  const completeRoutine = useCallback(() => {
    if (isRoutineComplete()) {
      const nextRoutine = getNextRoutine(currentRoutine);
      setCurrentRoutine(nextRoutine);
      localStorage.setItem("currentRoutine", JSON.stringify(nextRoutine));
      setRoutineProgress({});
      localStorage.setItem("routineProgress", JSON.stringify({}));
      localStorage.setItem(
        "lastCompleted",
        new Date().toISOString().split("T")[0]
      );
    }
  }, [currentRoutine, isRoutineComplete, setRoutineProgress]);

  useEffect(() => {
    if (currentRoutine && isRoutineComplete()) {
      completeRoutine();
    }
  }, [routineProgress, isRoutineComplete, completeRoutine, currentRoutine]);

  const updateSetProgress = (exerciseId: string, setsCompleted: number) => {
    const updatedProgress = { ...routineProgress, [exerciseId]: setsCompleted };
    setRoutineProgress(updatedProgress);
    localStorage.setItem("routineProgress", JSON.stringify(updatedProgress));
  };

  const isRoutineBlocked = (): boolean => {
    const lastCompleted = localStorage.getItem("lastCompleted");
    if (!lastCompleted) return false;

    const today = new Date().toISOString().split("T")[0];
    return lastCompleted === today;
  };

  return (
    <RoutineContext.Provider
      value={{
        workoutData,
        currentRoutine,
        setCurrentRoutine,
        updateSetProgress,
        isRoutineComplete,
        routineProgress,
        isRoutineBlocked,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

const getNextRoutine = (currentRoutine: string): string => {
  const totalRoutines = Object.keys(typedWorkoutData.routines).length;
  const nextRoutine = (parseInt(currentRoutine) % totalRoutines) + 1;
  return nextRoutine.toString();
};

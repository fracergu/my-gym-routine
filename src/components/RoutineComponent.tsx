import { useRoutine } from "../hooks/useRoutine";
import WorkoutComponent from "./WorkoutComponent";
import { Routine } from "../models/data.model";
import { useEffect } from "react";

interface RoutineComponentProps {
  routine: Routine;
}

const RoutineComponent = ({ routine }: RoutineComponentProps) => {
  const { workoutData, updateSetProgress, routineProgress } = useRoutine();

  const handleSetProgress = (exerciseId: string, setsCompleted: number) => {
    updateSetProgress(exerciseId, setsCompleted);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [routine]);

  return (
    <div>
      {routine.exercises.map((routineExercise) => {
        const exercise = workoutData.exercises[routineExercise.id];
        const setsCompleted = routineProgress[routineExercise.id] || 0;
        return (
          <WorkoutComponent
            key={routineExercise.id}
            exercise={exercise}
            routineExercise={routineExercise}
            setsCompleted={setsCompleted}
            handleSetProgress={handleSetProgress}
          />
        );
      })}
    </div>
  );
};

export default RoutineComponent;

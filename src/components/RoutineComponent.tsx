import { useRoutine } from "../hooks/useRoutine";
import WorkoutComponent from "./WorkoutComponent";
import { Routine } from "../models/data.model";

interface RoutineComponentProps {
  routine: Routine;
}

const RoutineComponent = ({ routine }: RoutineComponentProps) => {
  const {
    workoutData,
    updateSetProgress,
    isRoutineComplete,
    routineProgress,
    isRoutineBlocked,
  } = useRoutine();

  const handleSetProgress = (exerciseId: string, setsCompleted: number) => {
    updateSetProgress(exerciseId, setsCompleted);
  };

  if (isRoutineBlocked()) {
    return (
      <div>
        <h2>You have already completed the routine for today.</h2>
      </div>
    );
  }

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
      {isRoutineComplete() && (
        <div>
          <h3>Congratulations! You have completed the routine.</h3>
        </div>
      )}
    </div>
  );
};

export default RoutineComponent;

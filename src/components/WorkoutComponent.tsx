import styled from "styled-components";
import { Exercise, RoutineExercise } from "../models/data.model";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px #ccc;
  margin: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  width: 100%;
  padding: 1rem;
  background-color: #282c34;
  text-align: center;
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Image = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  background-color: #fff;
  gap: 2em;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  background-color: #282c34;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;

interface WorkoutComponentProps {
  exercise: Exercise;
  routineExercise: RoutineExercise;
  setsCompleted: number;
  handleSetProgress: (exerciseId: string, setsCompleted: number) => void;
}

const WorkoutComponent = ({
  exercise,
  routineExercise,
  setsCompleted,
  handleSetProgress,
}: WorkoutComponentProps) => {
  return (
    <Container>
      <Title>{exercise.name}</Title>
      <Content>
        <Image src={"/img/" + exercise.img} alt={exercise.name} />
        <div>
          <p>
            {routineExercise.sets} sets x {routineExercise.reps} reps
          </p>
          <p>
            {setsCompleted} / {routineExercise.sets} sets completed
          </p>
          {/* Progress bar */}
          <progress value={setsCompleted} max={routineExercise.sets}></progress>

          {setsCompleted < routineExercise.sets && (
            <Button
              onClick={() =>
                handleSetProgress(routineExercise.id, setsCompleted + 1)
              }
            >
              Complete a set
            </Button>
          )}
        </div>
      </Content>
    </Container>
  );
};

export default WorkoutComponent;

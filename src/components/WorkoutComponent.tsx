import styled from "styled-components";
import { Exercise, RoutineExercise } from "../models/data.model";
import doneIcon from "../../public/vector/done.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: solid 1px #ccc;
  margin: 1rem;
  border-radius: 15px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  max-width: 100%;
  @media (min-width: 768px) {
    margin: 2rem;
    max-width: 550px;
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  background-color: rgba(40, 44, 52, 1);
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  border: 1px solid #282c34;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  border-bottom: solid 1px #ccc;
  @media (min-width: 768px) {
    border-right: solid 1px #ccc;
    border-bottom: none;
    border-bottom-left-radius: 15px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  @media (min-width: 768px) {
    width: 50%;
    padding: 1rem;
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  min-width: 30%;
  border: solid 1px #ccc;
  & span {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem;
  }
`;

const IndicatorTitle = styled.h4<{ completed: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0;
  padding: 0.5rem;
  background-color: ${({ completed }) => (completed ? "#1b7c47" : "#282c34")};
  color: white;
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
        <ControlsContainer>
          <IndicatorContainer>
            <Indicator>
              <IndicatorTitle completed={false}>Sets</IndicatorTitle>
              <span>{routineExercise.sets}</span>
            </Indicator>
            <Indicator>
              <IndicatorTitle completed={false}>Reps</IndicatorTitle>
              <span>{routineExercise.reps}</span>
            </Indicator>
            <Indicator
              onClick={() =>
                handleSetProgress(routineExercise.id, setsCompleted + 1)
              }
            >
              <IndicatorTitle
                completed={setsCompleted === routineExercise.sets}
              >
                <img src={doneIcon} alt="Done" width={"14px"} />
              </IndicatorTitle>
              <span>{setsCompleted}</span>
            </Indicator>
          </IndicatorContainer>
        </ControlsContainer>
      </Content>
    </Container>
  );
};

export default WorkoutComponent;

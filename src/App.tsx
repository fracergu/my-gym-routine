import styled from "styled-components";
import RoutineComponent from "./components/RoutineComponent";
import { useRoutine } from "./hooks/useRoutine";

const AppHeader = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5vw;
  color: white;
  width: 100%;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 5rem;
  top: 0;
  h1 {
    margin: 0;
  }
  h2 {
    margin: 0;
  }
  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const AppContent = styled.div`
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  margin-top: 5rem;
  min-height: calc(100vh - 5rem);
`;

function App() {
  const { workoutData, currentRoutine } = useRoutine();

  const routine = workoutData.routines[currentRoutine];

  return (
    routine && (
      <>
        <AppHeader>
          <h1>{"Día " + currentRoutine}</h1>
          <h2>{workoutData.routines[currentRoutine].name}</h2>
        </AppHeader>
        <AppContent>
          <RoutineComponent routine={routine} />
        </AppContent>
      </>
    )
  );
}

export default App;

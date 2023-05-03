import { useContext } from "react";
import { RoutineContext } from "../context/RoutineContext";

export const useRoutine = () => useContext(RoutineContext);

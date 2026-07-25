"use client";

import { useEffect, useReducer } from "react";
import { bootSequence } from "@/data/bootSequence";
import BootTerminal from "./BootTerminal";
import LoadingBar from "./LoadingBar";


type BootState = {
  step: number;
  progress: number;
  completed: boolean;
  messages: string[];
};

type Action =
  | {
      type: "NEXT_STEP";
      progress: number;
      message: string;
    }
  | {
      type: "COMPLETE";
    };

const initialState: BootState = {
  step: 0,
  progress: 0,
  completed: false,
  messages: [],
};

function bootReducer(state: BootState, action: Action): BootState {
  switch (action.type) {
    case "NEXT_STEP":
  return {
    ...state,
    step: state.step + 1,
    progress: action.progress,
    messages: [...state.messages, action.message],
  };
    case "COMPLETE":
      return {
        ...state,
        completed: true,
      };

    default:
      return state;
  }
}

interface BootControllerProps {
  onComplete: () => void;
}

export default function BootController({
  onComplete,
}: BootControllerProps) {
  const [state, dispatch] = useReducer(bootReducer, initialState);

  useEffect(() => {
    if (state.completed) return;

   if (state.step >= bootSequence.length) {
  dispatch({ type: "COMPLETE" });

  setTimeout(() => {
    onComplete();
  }, 1200);

  return;
}

    const current = bootSequence[state.step];

    const timer = setTimeout(() => {
      dispatch({
  type: "NEXT_STEP",
  progress: current.progress,
  message: current.message,
});
    }, current.delay);

    return () => clearTimeout(timer);
  }, [state]);

  return (
    <>
      <>
  <BootTerminal
  messages={
    state.completed
      ? [...state.messages, "SYSTEM ONLINE"]
      : state.messages
  }
/>

  <LoadingBar progress={state.progress} />
  
</>
    </>
  );
}
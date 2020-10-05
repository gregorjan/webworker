import React, { useState, useRef, useEffect } from "react";
import { useWebWorker } from "./useWebWorker";
import { threadBlocker } from "./thread-blocker";

export const App = () => {
  const [time, setTime] = useState(new Date());
  const [displayValue, setDisplayValue] = useState<number | null>();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const result = useWebWorker();
  console.log(result);

  useEffect(() => {
    timer.current = setInterval(() => setTime(new Date()), 1000);
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [timer]);

  return (
    <div>
      <h2>{time.toLocaleTimeString()}</h2>
      <button onClick={() => setDisplayValue(null)}>clear</button>
    </div>
  );
};

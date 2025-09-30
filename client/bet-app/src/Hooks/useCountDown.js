import { useState, useEffect } from "react";

const useCountDown = (length) => {
  const [seconds, setSeconds] = useState(length);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSeconds((prevSecond) =>
        prevSecond > 0 ? prevSecond - 1 : prevSecond
      );
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [seconds]);

  return { seconds };
};

export default useCountDown;

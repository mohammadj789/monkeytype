import { useEffect } from "react";

function useKeyPress(callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      callback(event);
    };
    window.addEventListener("keydown", handleKeyPress);
    return (): void => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback]);
}

export default useKeyPress;

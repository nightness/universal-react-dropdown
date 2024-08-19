import { useState, useEffect } from "react";

function useWindowDimensions() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [event, setEvent] = useState<Event | UIEvent | AnimationEvent | TransitionEvent>();

  const handleResize = (event: 
    | Event 
    | UIEvent 
    | AnimationEvent 
    | TransitionEvent
  ) => {
    setEvent(event);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width: windowWidth, height: windowHeight, event };
}

export default useWindowDimensions;

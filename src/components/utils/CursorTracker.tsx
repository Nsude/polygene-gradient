import { createRef, useState } from "react";
import useCustomEffect from "../hooks/useCustomEffect";
import useMousePos from "../hooks/useMousePos";
import gsap from "gsap";

const CursorTracker = () => {
  const [trackerSize, setTrackerSize] = useState(0);
  const mousePos = useMousePos();
  const cursorRef = createRef<HTMLDivElement>();

  
  // hide cursor tracker on some elems
  const elemClass = "";
  const growTrackerOnShowcase = (elem: Element) => {
    if (elem.classList.contains(elemClass)) {
      gsap.to(".cursor-tracker", {
        opacity: 0,
        duration: 0,
      });
    } else {
      resetTracker();
    }
  };

  const resetTracker = () => {
    setTrackerSize(12);
    gsap.to(".cursor-tracker", {
      opacity: 1,
      duration: 0,
    });
  };

  useCustomEffect(() => {
    let cursor = cursorRef.current;
    const hoveredElems = document.elementsFromPoint(mousePos.x, mousePos.y);

    if (!cursor) return;
    gsap.to(".cursor-tracker", {
      left: mousePos.x,
      top: mousePos.y,
      duration: 0.2,
    });

    gsap.to(".cursor-tracker", {
      width: trackerSize,
      height: trackerSize,
      duration: 0.1,
    });

    const elem = hoveredElems[0];
    if (!(elem instanceof Element)) return;
    growTrackerOnShowcase(elem);
  }, [mousePos?.x, mousePos?.y]);

  return <div ref={cursorRef} className="cursor-tracker"></div>;
};

export default CursorTracker;

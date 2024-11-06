import React, { useRef } from 'react'
import { IconProps } from '../../components/utils/utils';
import { useGlobalContext } from '../../components/contexts/globalContext';
import useCustomEffect from '../../components/hooks/useCustomEffect';
import gsap from "gsap";

const MenuIcon:React.FC<IconProps> = ({size, color}) => {
  const {iconFill, menuOpen} = useGlobalContext();
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);

  useCustomEffect(() => {
    const duration = 0.4;
    const delay = 0.2;
  
    if (menuOpen) {
      gsap.to([leftPathRef.current, rightPathRef.current], {
        rotation: 180,
        scaleX: 1,
        duration,
        delay,
        transformOrigin: "center center"
      });
  
      gsap.to(rightPathRef.current, {
        x: 3,
        delay
      });
    } else {
      gsap.to([leftPathRef.current, rightPathRef.current], {
        rotation: 0,
        scaleX: 1,
        duration,
        delay,
        transformOrigin: "center center"
      });
  
      gsap.to(rightPathRef.current, {
        x: 0,
        delay,
      });
    }
  }, [menuOpen]);

  return (
    <svg width={size ? size - 3 : 13} height={size || 16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path ref={rightPathRef} d="M6.1341 12.959L9.51031 9.58281C11.0724 8.02071 11.0724 5.48805 9.51031 3.92595L6.1341 0.549732" stroke={color || iconFill} strokeWidth="2"/>
      <path ref={leftPathRef} d="M6.20465 15.4308L2.82843 12.0545C1.26633 10.4925 1.26633 7.95979 2.82843 6.39769L6.20465 3.02147" stroke={color ||iconFill} strokeWidth="2"/>
    </svg>

  )
}

export default MenuIcon;
import React, { useRef, useState } from 'react'
import useCustomEffect from '../../components/hooks/useCustomEffect';

const ThemeIcon:React.FC<{theme: string}> = ({theme}) => {
  const [fill, setFill] = useState("");
  const circles = useRef<SVGGElement>(null);

  useCustomEffect(() => {
    if (theme === "light") {
      setFill("#D9D9D9");
    } else {
      setFill("#000");
    }

  }, [theme])
  
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g ref={circles} clipPath="url(#clip0_140_189)">
        <circle cx="1.57622" cy="19.3268" r="9.99981" fill={fill}/>
        <circle cx="14.5799" cy="19.3268" r="9.99981" fill={fill} fillOpacity="0.6"/>
        <circle cx="8.98345" cy="18.3242" r="9.99981" fill={fill} fillOpacity="0.6"/>
      </g>
      <defs>
        <clipPath id="clip0_140_189">
          <rect x="0.651611" y="0.585602" width="19.3482" height="19.3482" rx="9.67412" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  )
}

export default ThemeIcon;
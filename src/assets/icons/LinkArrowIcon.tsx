import React from 'react'
import { IconProps } from '../../components/utils/utils';
import { useGlobalContext } from '../../components/contexts/globalContext';

const LinkArrowIcon:React.FC<IconProps> = ({size, color}) => {
  const {colors} = useGlobalContext();

  return (
    <svg width={size || 8} height={size || 8} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7.36711L7 1.36714M7 1.36714H1.46878M7 1.36714V6.87505" stroke={ color || colors.ivory} strokeWidth="1.1"/>
    </svg>
  )
}

export default LinkArrowIcon;
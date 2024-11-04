import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface Props {
  colors: {
    black: string, 
    ivory: string, 
    white: string, 
    grey: string, 
    gBlue: string, 
    gBlueOverlay: string
    gCyan: string
  }
  loaded: boolean;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  killAnim: boolean;
  setKillAnim: React.Dispatch<React.SetStateAction<boolean>>;
  bgTheme: string;
  setBGTheme: React.Dispatch<React.SetStateAction<string>>;
  iconFill: string;
  setIconFill: React.Dispatch<React.SetStateAction<string>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const globalContext = createContext<Props | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("Context is undefined");
  }

  return context;
}

const GlobalContextProvider:React.FC<PropsWithChildren>= ({children}) => {
  const colors = {
    black: "#171717", ivory: "#fffff0", 
    white: "#fff", grey: "#D9D9D9", 
    gBlue: "#758DB4", gBlueOverlay: "#B0B5BC",
    gCyan: "#ADDBF7"
  };
  const [loaded, setLoaded] = useState(false);
  const [killAnim, setKillAnim] = useState(false);
  const [bgTheme, setBGTheme] = useState("blue");
  const [iconFill, setIconFill] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <globalContext.Provider 
      value={{
        colors, 
        loaded, 
        setLoaded, 
        killAnim, 
        setKillAnim, 
        bgTheme, 
        setBGTheme,
        iconFill, 
        setIconFill,
        menuOpen, 
        setMenuOpen
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export default GlobalContextProvider;
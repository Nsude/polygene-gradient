import { useGlobalContext } from "./components/contexts/globalContext"
import GradientBG from "./components/GradientBG"
import useCustomEffect from "./components/hooks/useCustomEffect"
import LoadingScreen from "./components/LoadingScreen"
import Menu from "./components/Menu"
import { changeBGTheme } from "./components/utils"


function App() {
  const {bgTheme, loaded, setBGTheme} = useGlobalContext();

  useCustomEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollWidth = document.documentElement.scrollHeight / 5;
      const scroll = document.documentElement.scrollTop;
      if (scroll <= scrollWidth) {
        setBGTheme("blue")
      } else if (scroll > scrollWidth && scroll < scrollWidth * 2) {
        setBGTheme("cyan")
      } else if (scroll > scrollWidth * 2) {
        setBGTheme("pink")
      }
    })
  })

  useCustomEffect(() => {
    if (!loaded) return;
    changeBGTheme(".app-container", bgTheme);
  }, [bgTheme, loaded])

  return (
    <div className="app-container">
      <GradientBG />
      <LoadingScreen />
      <Menu />
    </div>
  )
}

export default App

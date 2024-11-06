import { useGlobalContext } from "./components/contexts/globalContext"
import GradientBG from "./components/GradientBG"
import HeroSection from "./components/HeroSection"
import useCustomEffect from "./components/hooks/useCustomEffect"
import LoadingScreen from "./components/LoadingScreen"
import Menu from "./components/Menu"
import CursorTracker from "./components/utils/CursorTracker"
import { changeBGTheme } from "./components/utils/utils"


function App() {
  const {bgTheme, loaded, setBGTheme, pageTheme} = useGlobalContext();

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
    <div data-page-theme={pageTheme} className="app-container">
      <CursorTracker />
      <GradientBG />
      <LoadingScreen />
      <Menu />
      <HeroSection />
    </div>
  )
}

export default App

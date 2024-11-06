import { useRef, useState } from "react";
import useCustomEffect from "./hooks/useCustomEffect";
import ButtonSolidOverlay from "./ButtonSolidOverlay";
import { useGlobalContext } from "./contexts/globalContext";
import gsap from "gsap"
import { polygonAnimDuration } from "../assets/shapes/Polygon";


const HeroSection = () => {
  const [time, setTime] = useState("");
  const {
    colors, killAnim, menuOpen, setMenuOpen, pageTheme, setPageTheme
  } = useGlobalContext();
  const [iconFill, setIconFill] = useState(colors.ivory);
  const container = useRef<HTMLDivElement>(null);

  // close menu when user clicks outside 
  useCustomEffect(() => {
    if (!container.current) return
    const handleClick = () => {
      setMenuOpen(false);
    }
    container.current.addEventListener("click", handleClick);

    return (() => {
      removeEventListener("click", handleClick);
    })
  })

  // blur on menu open
  useCustomEffect(() => {
    if (menuOpen) {
      gsap.to(container.current, {
        filter: "blur(5px)",
        duration: 1,
        delay: .2
      })
    } else {
      gsap.to(container.current, {
        filter: "blur(0px)",
        duration: .4,
        delay: .2
      })
    }

  }, [menuOpen])

  // hide all content until killAnim is true
  useCustomEffect(() => {
    if (!killAnim) return;
    gsap.to(container.current, {
      opacity: 1,
      duration: 0,
      delay: polygonAnimDuration
    })
  }, [killAnim])

  useCustomEffect(() => {
    const timeInterval = setInterval(() => {
      const nigerianTime = new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      });

      setTime(nigerianTime);
    }, 1000);

    return (() => {
      clearInterval(timeInterval);
    })

  })

  const switchTheme = () => {
    if (pageTheme === "light") {
      setPageTheme("dark");
    } else {
      setPageTheme("light");
    }
  }

  useCustomEffect(() => {
    if (pageTheme === "light") {
      // theme icon bg
      document.documentElement.style.setProperty("--bg", colors.black);
    } else {
      // theme icon bg
      document.documentElement.style.setProperty("--bg", colors.ivory);
    }

  }, [pageTheme])

  return (
    <div ref={container} className="hero-section-container">
      <div className="nav-area flex jc-sb">
        <p>POLYGENE.<span>PRO</span></p>
        <button onClick={() => switchTheme()} className="theme"></button>
      </div>

      {/* Top Right */}
      <div className="top-right-con flex jc-sb">
        <div className="left flex jc-sb">
          <div className="contents">
            <div className="top">
              <p>Creative</p>
              <p>Menace</p>
              <p>The Siege</p>
            </div>
            <p className="bottom">Cre8</p>
          </div>
          <p>(001)</p>
        </div>
        <div className="right">
          <h1>Bey.nd</h1>
        </div>
      </div>

      {/* center */}
      <div className="center-con flex jc-sb">
        <div className="left flex jc-sb">
          <div className="title flex jc-sb cg-10">
            <p>(002)</p>
            <h1>Th<span className="e">e</span></h1>
          </div>
          <div className="details">
            <p>.Pro</p>
            <p>Creativity does not discriminate, if you look for it, it will find you</p>
          </div>
        </div>
        <div className="right">
          <div className="top flex jc-sb">
            <div className="first flex jc-sb">
              <p>Think 2ice <br /> cre8 1<span style={{textTransform: "lowercase"}}>s</span></p>
              <div className="middle">
                <p>Polygene</p>
                <div onMouseEnter={() => setIconFill(colors.black)} onMouseLeave={() => setIconFill(colors.ivory)}>
                  <ButtonSolidOverlay 
                    text="GET POLYGENE" 
                    bg="transparent" 
                    overlay={colors.ivory} 
                    defaultColor={colors.ivory} 
                    fg={colors.black}  
                    arrowIcon={true}
                    iconFill={iconFill}
                  />
                </div>
              </div>
            </div>
            <div className="last">
              <p>Canonical</p>
              <p>DTS</p>
            </div>
          </div>
          <div className="bottom">
            <div className="sec-btn">
              <ButtonSolidOverlay 
                text="REQUEST DEMO" 
                arrowIcon={true}
                defaultColor={colors.ivory} 
                iconFill={colors.ivory}
                noBg={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-right-con flex">
        <h1>C.nvas</h1>
        <p>(003)</p>
      </div>

      {/* Bottom */}
      <div className="bottom-con flex jc-sb">
        <p>{time}</p>
        <p>(Scroll)</p>
      </div>
    </div>
  )
}

export default HeroSection;
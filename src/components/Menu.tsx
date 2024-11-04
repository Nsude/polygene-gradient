import { useRef, useState } from 'react'
import MenuShapeTop from '../assets/shapes/MenuShapeTop';
import MenuShapeBottom from '../assets/shapes/MenuShapeBottom';
import useCustomEffect from './hooks/useCustomEffect';
import gsap from "gsap"
import { useGlobalContext } from './contexts/globalContext';
import Logo from '../assets/icons/Logo';
import { polygonAnimDuration } from '../assets/shapes/Polygon';
import MenuIcon from '../assets/icons/MenuIcon';
import { scrambleText } from './animations-helpers/ScrambleText';

const Menu = () => {
  const detailsRef = useRef<HTMLHeadingElement | null>(null);
  const {loaded, colors, bgTheme, menuOpen, setMenuOpen} = useGlobalContext();
  const [menuColor, setMenuColor] = useState("");
  
  useCustomEffect(() => {
    if (!loaded) {
      return setMenuColor(colors.grey);
    };
    if (bgTheme === "ivory") {
      setMenuColor(colors.black);
    } else {
      setMenuColor(colors.ivory);
    }
    
  }, [bgTheme, loaded])

  // menu beep animation
  const detailsAnimRef = useRef<GSAPTween>();
  useCustomEffect(() => {
    if (!detailsRef.current) return;
    detailsAnimRef.current = gsap.fromTo(detailsRef.current, {
      opacity: 0,
      ease: "power2.out",
      duration: 2
    }, {
      repeat: -1,
      opacity: .6,
      duration: 2
    })
  })

  // stop menu opacity change animation
  useCustomEffect(() => {
    if (!loaded) return;
    detailsAnimRef.current?.kill();    
  }, [loaded])

  useCustomEffect(() => {
    gsap.set(".menu-container", {
      background: menuColor
    })

  }, [menuColor])

  // set .shape width to svg width
  useCustomEffect(() => {
    if (!loaded) {
      gsap.set(".menu-container .shape", {
        width: 245.4
      })
    } else {
      gsap.to(".menu-container .shape", {
        width: 351,
        duration: .4
      })
      
      gsap.to(".menu-container .details", {
        opacity: 0, 
        duration: .4, 
        display: "none"
      });

      const d = .4;
      // Logo
      const logo = ".menu-container .logo";
      gsap.to(`${logo}:first-child`, {
        opacity: 1,
        transform: "translateY(0)",
        duration: d,
        delay: polygonAnimDuration
      })

      // menu texts and icon
      const menuText = [
        ".controls .frame .animate-in", 
        ".texts .frame :nth-child(1)"
      ]
      gsap.to(menuText, {
        transform: "translateY(0)",
        opacity: 1,
        duration: d,
        stagger: .02,
        delay: polygonAnimDuration
      })
    }

  }, [loaded])

  useCustomEffect(() => {
    const shape = document.querySelector(".menu-container .shape");
    const menuItems = ".menu-items .frame :first-child";
    const duration = .4;
    const delay = .2;
    if (menuOpen) {
      gsap.to(shape, {
        height: 500,
        duration,
        ease: "power2.out",
        delay
      })

      // switch menu text 
      gsap.fromTo(".menu .open-text", {
        y: 0
      }, {
        y: -100,
        duration: .6,
        delay
      })

      gsap.fromTo(".menu .close-text", {
        y: 100
      }, {
        y: 0,
        duration
      })
      
      // displays the dashed line right above the main menu
      shape?.classList.remove("remove-delay");
      shape?.classList.add("show-after");

      // animate menu items 
      gsap.to(menuItems, {
        transform: "translateY(0)", 
        opacity: 1,
        duration: .6,
        delay: .3,
        stagger: .02
      })
      
    } else {
      gsap.to(shape, {
        height: 55, 
        duration,
        ease: "power2.out",
        delay
      })

      // switch menu text 
      gsap.fromTo(".menu .open-text", {
        y: -100
      }, {
        y: 0,
        duration
      })

      gsap.fromTo(".menu .close-text", {
        y: 0
      }, {
        y: 100,
        duration,
        delay
      })

      // hides the dashed line right above the main menu
      shape?.classList.add("remove-delay");
      shape?.classList.remove("show-after");

      // animate menu items 
      // gsap.set(menuItems, {opacity: 0})
      gsap.to(menuItems, {
        transform: "translateY(100%)", 
        opacity: 0,
        duration: .6,
        stagger: {
          each: .02,
          from: "end"
        }
      })
    }

  }, [menuOpen])

  useCustomEffect(() => {
    const toAnim = document.querySelectorAll(".menu-items .frame .item p:first-child");
    if (!toAnim) return;

    let finalText: string;
    toAnim.forEach((e) => {
      let elem = e as HTMLParagraphElement;
      elem.parentElement?.addEventListener("mouseenter", () => {
        finalText = elem.textContent || "";
        scrambleText(elem, finalText, 350, "GENEY")
      })
    })
  })

  const handleMenu = () => {
    setMenuOpen((prev) => !prev);
  }

  return (
    <div className="menu-container">
      <div className="logo">
        <Logo color={colors.black} />
      </div>
      <div className="menu">
        <div className="controls flex">
          <button onClick={() => handleMenu()} className="frame flex cg-5">
            <div className="menu-icon animate-in">
              <MenuIcon size={18} color={colors.black} />
            </div>
            <div className="menu-text-con animate-in">
              <p className="open-text">Menu</p>
              <p className="close-text">Close</p>
            </div>
          </button>
        </div>
        <div className="texts">
          <div className="frame">
           <p>Polygene <br/> Pro</p>
          </div>
          <div className="frame">
            <p>Cre8 Yours</p>
          </div>
        </div>
      </div>
      <div className="details">
        <p>Website Info</p>
        <h2 ref={detailsRef}>{ loaded ? "Completed" : "Fetching Data" }</h2>
      </div>
      {/* affect menu height */}
      <div className="shape">
        <div className="top">
          <MenuShapeTop fill={menuColor} />
        </div>

        {/* MENU ITEMs */}
        <div className="menu-items">
          <div className="frame">
            <div className="item">
              <p>01</p>
              <p>Technology</p>
            </div>
          </div>

          <div className="frame">
            <div className="item">
              <p>02</p>
              <p>Services</p>
            </div>
          </div>

          <div className="frame">
            <div className="item">
              <p>03</p>
              <p>Partners</p>
            </div>
          </div>

          <div className="frame">
            <div className="item">
              <p>04</p>
              <p>Reach Out</p>
            </div>
          </div>
        </div>

        <div className="bottom">
          <MenuShapeBottom fill={menuColor}/>
        </div>
      </div>
    </div>
  )
}

export default Menu;
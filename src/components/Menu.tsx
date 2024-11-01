import { useRef, useState } from 'react'
import MenuShapeTop from '../assets/shapes/MenuShapeTop';
import MenuShapeBottom from '../assets/shapes/MenuShapeBottom';
import useCustomEffect from './hooks/useCustomEffect';
import gsap from "gsap"
import { useGlobalContext } from './contexts/globalContext';
import Logo from '../assets/icons/Logo';
import { polygonAnimDuration } from '../assets/shapes/Polygon';
import MenuIcon from '../assets/icons/MenuIcon';

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
      
      gsap.to(".menu-container .details", {opacity: 0, duration: .4, display: "none"});

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
        ".controls .frame :nth-child(1)", 
        ".controls .frame :nth-child(2)", 
        ".texts .frame :nth-child(1)"
      ]
      gsap.to(menuText, {
        transform: "translateY(0)",
        opacity: 1,
        duration: d,
        stagger: .1,
        delay: polygonAnimDuration
      })

      //TODOL Delete if not used
      // // show dotted line
      // document.querySelector(".menu-container .controls")?.classList.add("show-after");
    }

  }, [loaded])

  useCustomEffect(() => {
    const shape = document.querySelector(".menu-container .shape");
    const duration = .4;
    const delay = .2;
    if (menuOpen) {
      gsap.to(shape, {
        height: 500, 
        duration,
        delay
      })
      
      shape?.classList.remove("remove-delay");
      shape?.classList.add("show-after");
    } else {
      gsap.to(shape, {
        height: 55, 
        duration,
        delay
      })

      shape?.classList.add("remove-delay");
      shape?.classList.remove("show-after");
    }

  }, [menuOpen])

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
            <div className="menu-icon">
              <MenuIcon size={18} color={colors.black} />
            </div>
            <p>Menu</p>
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
          <div className="item">
            <p>01</p>
            <p>Technology</p>
          </div>
          <div className="item">
            <p>02</p>
            <p>Services</p>
          </div>
          <div className="item">
            <p>03</p>
            <p>Partners</p>
          </div>
          <div className="item">
            <p>04</p>
            <p>Community</p>
          </div>
        </div>

        <div className="ad-display">
          
        </div>

        <div className="bottom">
          <MenuShapeBottom fill={menuColor}/>
        </div>
      </div>
    </div>
  )
}

export default Menu;
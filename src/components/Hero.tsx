import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from "../ultis"
import { useEffect, useState } from "react"
import { heroPrice } from "../data-constants/data-constants"

// there are two videos one for smartphones and one for desktops, i need to figure out the width of the screen to be able to know when to ultilize them

gsap.registerPlugin(useGSAP)
const Hero = () => {

  const [videoSrc, setVideoSrc] = useState<string>(window.innerWidth <760 ? smallHeroVideo : heroVideo)

  const dynamicVideoSrc = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', dynamicVideoSrc)

    return () => {
      window.removeEventListener('resize', dynamicVideoSrc)
    }
  },[])

  useGSAP(() => {
    gsap.to("#hero", { 
      opacity: 1, 
      delay: 2,
      duration: 1
    })

    gsap.to("#cta", {
      y: '-20',
      opacity: 1,
      delay: 2,
      duration: 1
    })

  },[])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">Iphone 15 Pro Bro</p>
        <div>
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id='cta' className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        {heroPrice.map((price) => (
          <p key={price} className="font-normal text-xl">{price}</p>
        ))}
      </div>
    </section>
  )
}

export default Hero

// Anotations

// PlaysInLine Function
// By default, on iOS or Safari, when a video plays, it opens in fullscreen mode.
// The playsinline attribute tells the browser to play the video inline (within the webpage) instead of forcing fullscreen mode.

// classname of 'pointer-events-none'
// nobody can click in the video

// id of 'cta'
// call to action
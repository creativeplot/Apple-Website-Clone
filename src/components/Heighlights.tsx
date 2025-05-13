import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { watchImg, rightImg } from "../ultis"
import VideoCarousel from "./VideoCarousel"

gsap.registerPlugin(useGSAP)
const Heighlights = () => {

  useGSAP(() => {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
      delay: 0.5,
      duration: 1,
    })

    gsap.to(".link", {
      y: 0,
      opacity: 1,
      delay: 1,
      duration: 1,
      stagger: 0.25
    })
  },[])

  return (
    <section id='heighlights' className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id='title' className="section-heading">Heighlights homie</h1>
          
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="watch" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  )
}

// className="flex flex-wrap items-end gap-5"

export default Heighlights
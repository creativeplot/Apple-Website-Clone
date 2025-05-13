import { hightlightsSlides } from "../data-constants/data-constants"
import { useEffect, useRef, useState } from "react"
import { pauseImg, replayImg, playImg } from "../ultis";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(useGSAP,ScrollTrigger)
const VideoCarousel = () => {
    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([])
    const videoDivRef = useRef<HTMLDivElement[]>([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false
    })

    const [loadedData, setLoadedData] = useState<React.SyntheticEvent<HTMLVideoElement>[]>([])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    startPlay: true,
                    isPlaying: true
                }))
            }
        })
    },[isEnd, videoId])

    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                // added optional chaining (?.) when accessing the video elements, which is a good practice since the elements might not exist when the effect runs.
                videoRef.current[videoId]?.pause();
            } else {
                startPlay && videoRef.current[videoId]?.play()
            }
        }
    },[startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetadata = (i:number, e:React.SyntheticEvent<HTMLVideoElement>) => {
        setLoadedData(prev => [...prev, e])
    }

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]) {
            // animate the progress of the video
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)

                    if(progress != currentProgress) {
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId],  {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            background: 'white'
                        })
                    }
                },

                onComplete: () => {
                    if(isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if(videoId === 0) {
                anim.restart()
            }

            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }

            if(isPlaying){
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    },[videoId, startPlay])

    const handleProcess = (type:string, id?: number) => {
        switch(type) {
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: id! + 1}))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo:true}))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo:false, videoId: 0}))
                break;
            case 'play':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            case 'pause':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            default:
                return video;
        }
    }
    
  return (
    <>
    <div className="flex items-center">
        {hightlightsSlides.map((slider, i) => (
            <div id="slider" key={slider.id} className="sm:pr-20 pr-10">
                <div className="video-carousel_container">
                    <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                        {/* if check for null */}
                        <video 
                        id="video" 
                        playsInline={true} 
                        preload="auto" 
                        muted 
                        ref={(el) => { if(el) (videoRef.current[i] = el)}}
                        onEnded={() => {
                            i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                        }}
                        onPlay={() => {
                                setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying: true
                                }))
                            }}
                        onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                        className={`${
                            slider.id === 2 && 'translate-x-44'
                        } pointer-events-none`}>
                            <source src={slider.video} type="video/mp4"/>
                        </video>
                    </div>
                    {/* Make the slider work */}
                    <div className="absolute top-12 left-[5%] z-10">
                        {slider.textLists.map((text) => (
                            <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>

    <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
            {videoRef.current.map((_, i) => (
                <span key={i} className="mx-2 h-3 bg-gray-200 rounded-full relative cursor-pointer" ref={(el) => { if(el) (videoSpanRef.current[i] = el)}}>
                    <span className="absolute h-full w-full rounded-full" ref={(el) => { if(el) (videoSpanRef.current[i] = el)}}/>
                </span>
            ))}
        </div>

        <button className="control-btn">
            <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying? 'play' : 'pause'}
            onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying ? () => handleProcess('play') : () => handleProcess('pause')}/>
        </button>
    </div>
    </>
  )
}

export default VideoCarousel
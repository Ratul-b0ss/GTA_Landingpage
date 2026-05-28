import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showcontent, setShowContent] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

 useGSAP(() => {
    if (!showcontent) return;

    // Fixed: converted negative string delays to numerical timeline position shifts or standard numbers
    const tlMain = gsap.timeline();

    tlMain.to(".landing", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut"
    })
    .to(".sky, .bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
    }, "<0.2") 
    .to(".character", {
      scale: 0.8,
      x: "-50%",
      bottom: "-75%",
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
    }, "<");

    gsap.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".deatails", 
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play pause resume reverse",
        refreshPriority: 1,

      },
    });
    gsap.from(".imag",{
      x: -100,
      opacity: 0,
      duration:2,
      scrollTrigger: {
        trigger: ".deatails", 
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play pause resume reverse",
        refreshPriority: 1,

      },

    })
    gsap.to(".anitext", {
      x: "-50%", // Moves text left based on its width string
      scrollTrigger: {
        trigger: ".ani",     // Trigger and pin the parent container
        start: "top top",    // Animation starts when top of container hits top of viewport
        end: "+=1500",       // Creates 1500px of scrolling space for the horizontal movement
        pin: true,           // Locks the container on screen
        scrub: 3,            // Smoothly tracks scrollbar
        anticipatePin: 1,
        refreshPriority: 2,
      },
    });
    // Mousemove parallax effect
    const mainElement = document.querySelector('.main');
    if (!mainElement) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      
      gsap.to(".text", { x: `${xMove * 0.7}%`, duration: 0.5, ease: "power2.out" });
      gsap.to(".sky", { x: xMove * 0.8, duration: 0.5, ease: "power2.out" });
      gsap.to(".bg", { x: xMove * 1.1, duration: 0.5, ease: "power2.out" });
    };

    mainElement.addEventListener('mousemove', handleMouseMove);

    // Cleanup mouse listener if component unmounts
    return () => {
      mainElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showcontent]);
  return (

    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showcontent && (
        <div className='main w-full overflow-hidden'>
          <div className='landing w-full h-screen  rotate-[-10deg] scale-[1.7] bg-black overflow-hidden'>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img  draggable='false' className='sky scale-[1.5] rotate-[-20deg] w-full h-full object-cover scale-[1.1]' src="sky.png" alt="" />


              <img  draggable='false' className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover" src="bg.png" alt="" />

              <div className="text select-none text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1] ">
                <h1 className="text-[9rem] leading-none -ml-30">grand</h1>
                <h1 className="text-[9rem] leading-none ml-30">theft</h1>
                <h1 className="text-[9rem] leading-none -ml-25">auto</h1>
              </div>

              <img  draggable='false' className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg]" src="girlbg.png" alt="" />

              <div className='w-full py-4 bg-gradient-to-t from-black to-transparent text-white absolute bottom-0 left-1/2 -translate-x-1/2'>
                <div className="flex gap-4 items-center">
                  <i className="text-4xl ri-arrow-down-line"></i>
                  <h3 className="text-xl font-sans">
                    Scroll Down
                  </h3>
                </div>
                <img  draggable='false' className='h-[5vw]  select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src="ps5.png" alt="" />
              </div>
            </div>
          </div>
          <div className='ani w-full h-screen bg-black flex items-center overflow-hidden relative select-none'>
            <h1 className="text-[25rem] uppercase whitespace-nowrap text-white anitext will-change-transform label-marquee">
              grand theft auto 6 gra  
            </h1>
          </div>
          <div className='deatails flex items-center justify-center h-screen w-full bg-black'>
            <div className='w-1/2 ppr h-screen ml-8'>
              <img className='h-full imag w-full object-cover select-none' draggable='false' src="/imag.png" alt="" />
            </div>
            <div className='w-1/2 ppt h-scren text-white'>
              <h1 className="text-8xl reveal-text">Still Running,</h1>
              <h1 className="text-8xl reveal-text">Not Hunting</h1>
              <p className="mt-10 text-xl font-sans reveal-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Distinctio possimus, asperiores nam, omnis inventore nesciunt
                a architecto eveniet saepe, ducimus necessitatibus at
                voluptate.
              </p>

              <p className="mt-10 text-xl font-sans reveal-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                eius illum fugit eligendi nesciunt quia similique velit
                excepturi soluta tenetur illo repellat consectetur laborum
                eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                autem sapiente.
              </p>
              <button className="bg-yellow-500 px-5 py-5 text-black mt-10 text-4xl">
                Download Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App

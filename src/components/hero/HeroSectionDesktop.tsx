import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HeroSectionDesktop = () => {
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const cyberTextRef = useRef<HTMLDivElement | null>(null);
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  const [showRegisterButton, setShowRegisterButton] = useState(false); // State to control the visibility of the register button

  // Function to update text sizes based on viewport
  const updateTextSizes = () => {
    if (!cyberTextRef.current || !heroTextRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Responsive font size calculations
    const cyberFontSize = Math.min(vw * 0.15, vh * 0.2); // 15% of viewport width or 20% of height, whichever is smaller
    const timerFontSize = Math.min(vw * 0.05, vh * 0.08); // 5% of viewport width or 8% of height

    cyberTextRef.current.style.fontSize = `${cyberFontSize}px`;
    heroTextRef.current.style.fontSize = `${timerFontSize}px`;
  };

  useEffect(() => {
    // Initial size update
    updateTextSizes();

    // Add resize listener
    window.addEventListener('resize', updateTextSizes);

    const targetDate = new Date("2024-12-20T10:00:00"); // Target date and time

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0 };
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
      }
    };

    const heroSection = heroSectionRef.current;
    const heroImage = heroImageRef.current;
    const heroText = heroTextRef.current;

    // Timer logic
    let timerInterval;
    ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: "+=500%",
      onEnter: () => {
        timerInterval = setInterval(() => {
          setTimer(calculateTimeLeft());
        }, 1000);
      },
      onLeave: () => clearInterval(timerInterval),
      onEnterBack: () => {
        timerInterval = setInterval(() => {
          setTimer(calculateTimeLeft());
        }, 1000);
      },
      onLeaveBack: () => clearInterval(timerInterval),
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=500%",
        scrub: true,
        pin: true,
        snap: {
          snapTo: "labels",
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
      },
    });

    timeline
      .addLabel("start")
      .fromTo(
        heroImage,
        { scale: 1.5, rotate: -20, y: 100, opacity: 0 },
        { scale: 1.2, rotate: 0, y: 50, opacity: 1, duration: 1 }
      )
      .fromTo(
        heroText,
        { scale: 3, rotate: -20, y: 100, opacity: 0 },
        { scale: 2, rotate: 0, y: 50, opacity: 1, duration: 1 },
        "<"
      )
      .addLabel("mid")
      .to(heroImage, { scale: 0.8, rotate: 0, y: 0, opacity: 1, duration: 1 })
      .to(
        heroText,
        {
          scale: 1.5,
          rotate: 0,
          y: "50%",
          xPercent: -50,
          left: "50%",
          opacity: 1,
          duration: 1
        },
        "<"
      )
      .addLabel("end")
      .call(() => setShowRegisterButton(true)); // Show the button after the animation is done

    return () => {
      window.removeEventListener('resize', updateTextSizes);
      clearInterval(timerInterval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={heroSectionRef}
      className="hero-section"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background CYBERTHON text */}
      <div
        ref={cyberTextRef}
        style={{
          position: "absolute",
          top: "17%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: "center",
          color: "rgba(255, 255, 255, 1)", // More transparent
          fontWeight: "bold",
          letterSpacing: "0.5rem",
          zIndex: 1,
          userSelect: "none", // Prevent text selection
          whiteSpace: "nowrap", // Prevent text wrapping
        }}
      >
        CYBERTHON
      </div>

      <img
        ref={heroImageRef}
        src="/hero.svg"
        alt="Hero"
        style={{
          position: "absolute",
          width: "80%",
          height: "80%",
          objectFit: "cover",
          zIndex: 2,
          margin: "auto",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Timer */}
      <div
        ref={heroTextRef}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          zIndex: 3,
          width: "100%",
          fontFamily: "monospace",
          letterSpacing: "0.2rem",
        }}
      >
        <p>
          {`${timer.days}d:${timer.hours.toString().padStart(2, '0')}h:${timer.minutes.toString().padStart(2, '0')}m`}
        </p>
      </div>

      {/* Register Button */}
      {showRegisterButton && (
        <>
        {/* <NavBar/> */}
        <button
          onClick={() => alert("Navigate to registration page")}
          style={{
            position: "absolute",
            bottom: "5%",
            left: "1%",
            padding: "10px 20px",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            zIndex: 4
          }}
        >
          <span style={{paddingRight:"100px",}}>
          Register Now
          </span>
          <span>
          &#62;
          </span>
         
        </button>
        <div
        onClick={() => alert("Navigate to registration page")}
        style={{
          position: "absolute",
          bottom: "5%",
          right: "1%",
          padding: "10px 20px",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
         
          cursor: "pointer",
          zIndex: 4
        }}
      >
        <h1 className="text-3xl">
        Feb 20  <br /> & 21
        </h1>
        <p>A high-stakes arena where <br /> top minds tackle real-world <br /> problems. </p>
      </div>
      </>
      )}
    </div>
  );
};

export default HeroSectionDesktop;
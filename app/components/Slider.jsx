"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

const Slider = () => {
  const container = useRef(null);
  const [isLocked, setIsLocked] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "auto";
      lenis?.start();
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
      lenis?.start();
    };
  }, [isLocked, lenis]);

  useGSAP(
    () => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const splitText = (selector, type, className) => {
        return new SplitText(selector, {
          type: type,
          [`${type}Class`]: className,
          mask: type, // Note: 'mask' property might need custom CSS or a specific plugin version. Keeping it consistent with user request if it works for them.
        });
      };

      const headerSplit = splitText(".header h1", "chars", "char");
      const navSplit = splitText("nav a", "words", "word");
      const footerSplit = splitText(".hero-footer p", "words", "word");

      const q = gsap.utils.selector(container);
      const counterProgress = q(".preloader-counter h1")[0];
      const counterContainer = q(".preloader-counter")[0];
      const counter = { value: 0 };

      const tl = gsap.timeline();
      tl.to(counter, {
        value: 100,
        duration: 3,
        ease: "power3.out",
        onUpdate: () => {
          counterProgress.textContent = Math.floor(counter.value);
        },
        onComplete: () => {
          const counterDigits = splitText(counterProgress, "chars", "digit");
          gsap.to(counterDigits.chars, {
            y: "-100%",
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            delay: 1,
            onComplete: () => {
              counterContainer.remove();
            },
          });
        },
      });
      tl.to(
        counterContainer,
        {
          scale: 1,
          duration: 3,
          ease: "power3.out",
        },
        "<",
      );

      tl.to(
        ".progress-bar",
        {
          scaleX: 1,
          duration: 3,
          ease: "power3.out",
        },
        "<",
      );

      tl.to(
        ".hero-bg",
        {
          clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
          duration: 1.5,
          ease: "hop",
        },
        "4.5",
      );

      tl.to(
        ".hero-bg img",
        {
          scale: 1.5,
          duration: 1.5,
          ease: "hop",
        },
        "<",
      );

      tl.to(
        ".hero-bg",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "hop",
        },
        "6",
      );

      tl.to(
        ".hero-bg img",
        {
          scale: 1,
          duration: 2,
          ease: "hop",
        },
        "6",
      );
      tl.to(
        ".progress",
        {
          scaleX: 1,
          duration: 3,
          ease: "hop",
        },
        "6",
      );

      tl.to(
        headerSplit.chars,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.075,
        },
        "7",
      );

      tl.to(
        navSplit.words,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.075,
        },
        "7.5",
      );

      tl.to(
        footerSplit.words,
        {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.075,
          onComplete: () => {
            setIsLocked(false);
            if (lenis) {
              lenis.scrollTo("#hero-section", {
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard lenis easing
              });
            }
          },
        },
        "7.5",
      );
    },
    { scope: container, dependencies: [lenis] },
  );

  return (
    <main ref={container}>
      <div className="preloader-counter">
        <h1>0</h1>
      </div>

      <nav>
        <div className="nav-logo">
          <Link href="/">LCID</Link>
        </div>
        <div className="nav-links">
          <Link href="/">Index</Link>
          <Link href="/works">Collection</Link>
          <Link href="#">Material</Link>
          <Link href="/process">Process</Link>
          <Link href="/about">Info</Link>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-bg">
          <img src="sticky-cards/card_4.jpg" alt="" />
        </div>
        <div className="header">
          <h1>LCID</h1>
        </div>
        <div className="slider-cards-container">
          <div className="slider-cards">
            <div className="slider-card-1">
              <img src="sticky-cards/card_1.jpg" alt="" />
            </div>
            <div className="slider-card-2">
              <img src="sticky-cards/card_2.jpg" alt="" />
            </div>
            <div className="slider-card-3">
              <img src="sticky-cards/card_3.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="hero-footer">
          <p>Performance</p>
          <p>craftsmanship</p>
          <p>innovation</p>
        </div>
        <div className="progress-bar">
          <div className="progress"></div>{" "}
          {/* Fixed empty div structure if needed */}
        </div>
      </section>
    </main>
  );
};

export default Slider;

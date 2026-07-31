"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./hero2.module.css";

gsap.registerPlugin(ScrollTrigger);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const slidesData = [
  { line1: "Title Line 1", line2: "Title Line 2", img: "/hero/img1.jpg" },
  { line1: "Title Line 1", line2: "Title Line 2", img: "/hero/img2.jpg" },
  { line1: "Modern Concrete", line2: "Warm Details", img: "/hero/img3.jpg" },
  { line1: "Curved Elements", line2: "Modern Flow", img: "/hero/img4.jpg" },
  { line1: "Minimal Design", line2: "Natural Light", img: "/hero/img5.jpg" },
];

const Hero2 = () => {
  const stickyRef = useRef(null);
  const sliderRef = useRef(null);
  const slidesContainerRef = useRef(null);

  useGSAP(
    () => {
      const stickySection = stickyRef.current;
      const slider = sliderRef.current;
      const slidesContainer = slidesContainerRef.current;
      if (!stickySection || !slider || !slidesContainer) return;

      const slides = slidesContainer.querySelectorAll(`.${styles.slide}`);

      const stickyHeight = window.innerHeight * 6;
      const totalMove = slidesContainer.offsetWidth - slider.offsetWidth;

      // 1. Initial GSAP Set: Hide all titles, then show first slide title immediately
      const titles = Array.from(slides).map((slide) =>
        slide.querySelector(`.${styles.title} h1`),
      );
      titles.forEach((title) => {
        if (title) gsap.set(title, { y: -200 });
      });
      // Show first slide title on load
      if (titles[0]) gsap.set(titles[0], { y: 0 });

      const slideWidth = slider.offsetWidth;
      let lastDisplayedSlide = 0; // Start at 0 since first title is already visible

      // 2. ScrollTrigger: pin + horizontal translate + title & parallax animations
      const st = ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${stickyHeight}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const mainMove = progress * totalMove;

          gsap.set(slidesContainer, { x: -mainMove });

          const currentSlide = Math.floor(mainMove / slideWidth);
          const sliderProgress = (mainMove % slideWidth) / slideWidth;

          // Show title of incoming slide when it's 30% visible (tweak TRIGGER to adjust)
          const TRIGGER = 0.5;
          const desiredSlide =
            sliderProgress >= TRIGGER
              ? Math.min(currentSlide + 1, slides.length - 1)
              : currentSlide;

          if (desiredSlide !== lastDisplayedSlide) {
            // Hide old title
            if (titles[lastDisplayedSlide]) {
              gsap.to(titles[lastDisplayedSlide], {
                y: -200,
                duration: 0.3,
                ease: "expo.in",
                overwrite: true,
              });
            }
            // Show new title
            if (titles[desiredSlide]) {
              gsap.to(titles[desiredSlide], {
                y: 0,
                duration: 0.4,
                ease: "expo.out",
                overwrite: true,
              });
            }
            lastDisplayedSlide = desiredSlide;
          }

          // Parallax image logic
          slides.forEach((slide, index) => {
            const image = slide.querySelector("img");
            if (image) {
              if (index === currentSlide || index === currentSlide + 1) {
                const relativeProgress =
                  index === currentSlide ? sliderProgress : sliderProgress - 1;
                const parallaxAmount = relativeProgress * slideWidth * 0.25;
                gsap.set(image, { x: parallaxAmount, scale: 1.35 });
              } else {
                gsap.set(image, { x: 0, scale: 1.35 });
              }
            }
          });
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: stickyRef },
  );

  return (
    <>
      <section className={`${styles.section} ${styles.sticky}`} ref={stickyRef}>
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.slides} ref={slidesContainerRef}>
            {slidesData.map((slide, i) => (
              <div key={i} className={styles.slide}>
                <div className={styles.img}>
                  <Image
                    src={`${BASE}${slide.img}`}
                    alt={`${slide.line1} ${slide.line2}`}
                    fill
                    sizes="100vw"
                  />
                </div>
                <div className={styles.title}>
                  <h1>
                    {slide.line1} <br /> {slide.line2}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.outro}`}>
        <h1>Shaping timeless spaces with contemporary vision</h1>
      </section>
    </>
  );
};

export default Hero2;

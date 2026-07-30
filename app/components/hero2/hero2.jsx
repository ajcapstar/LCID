"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./hero2.module.css";

gsap.registerPlugin(ScrollTrigger);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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

      // 1. Initial GSAP Set: Hide titles
      slides.forEach((slide) => {
        const title = slide.querySelector(`.${styles.title} h1`);
        if (title) gsap.set(title, { y: -200 });
      });

      let currentVisibleIndex = null;

      // 2. IntersectionObserver for Title Slide In/Out animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const currentIndex = Array.from(slides).indexOf(entry.target);
            const titles = Array.from(slides).map((slide) =>
              slide.querySelector(`.${styles.title} h1`)
            );

            if (entry.intersectionRatio >= 0.25) {
              currentVisibleIndex = currentIndex;
              titles.forEach((title, index) => {
                if (title) {
                  gsap.to(title, {
                    y: index === currentIndex ? 0 : -200,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              });
            } else if (
              entry.intersectionRatio < 0.25 &&
              currentVisibleIndex === currentIndex
            ) {
              const prevIndex = currentIndex - 1;
              currentVisibleIndex = prevIndex >= 0 ? prevIndex : null;

              titles.forEach((title, index) => {
                if (title) {
                  gsap.to(title, {
                    y: index === prevIndex ? 0 : -200,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: true,
                  });
                }
              });
            }
          });
        },
        {
          root: slider,
          threshold: [0, 0.25],
        }
      );

      slides.forEach((slide) => observer.observe(slide));

      const slideWidth = slider.offsetWidth;

      // 3. ScrollTrigger pinning and horizontal translation
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

          gsap.set(slidesContainer, {
            x: -mainMove,
          });

          const currentSlide = Math.floor(mainMove / slideWidth);
          const sliderProgress = (mainMove % slideWidth) / slideWidth;

          slides.forEach((slide, index) => {
            const image = slide.querySelector("img");
            if (image) {
              if (index === currentSlide || index === currentSlide + 1) {
                const relativeProgress =
                  index === currentSlide ? sliderProgress : sliderProgress - 1;
                const parallaxAmount = relativeProgress * slideWidth * 0.25;
                gsap.set(image, {
                  x: parallaxAmount,
                  scale: 1.35,
                });
              } else {
                gsap.set(image, {
                  x: 0,
                  scale: 1.35,
                });
              }
            }
          });
        },
      });

      return () => {
        observer.disconnect();
        st.kill();
      };
    },
    { scope: stickyRef }
  );

  return (
    <>
      <section className={`${styles.section} ${styles.sticky}`} ref={stickyRef}>
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.slides} ref={slidesContainerRef}>
            <div className={styles.slide}>
              <div className={styles.img}>
                <Image src={`${BASE}/hero/img1.jpg`} alt="" fill sizes="100vw" />
              </div>
              <div className={styles.title}>
                <h1>
                  Title Line 1 <br /> Title Line 2
                </h1>
              </div>
            </div>

            <div className={styles.slide}>
              <div className={styles.img}>
                <Image src={`${BASE}/hero/img2.jpg`} alt="" fill sizes="100vw" />
              </div>
              <div className={styles.title}>
                <h1>
                  Title Line 1 <br /> Title Line 2
                </h1>
              </div>
            </div>

            <div className={styles.slide}>
              <div className={styles.img}>
                <Image src={`${BASE}/hero/img3.jpg`} alt="" fill sizes="100vw" />
              </div>
              <div className={styles.title}>
                <h1>
                  Modern Concrete <br /> Warm Details
                </h1>
              </div>
            </div>

            <div className={styles.slide}>
              <div className={styles.img}>
                <Image src={`${BASE}/hero/img4.jpg`} alt="" fill sizes="100vw" />
              </div>
              <div className={styles.title}>
                <h1>
                  Curved Elements <br /> Modern Flow
                </h1>
              </div>
            </div>

            <div className={styles.slide}>
              <div className={styles.img}>
                <Image src={`${BASE}/hero/img5.jpg`} alt="" fill sizes="100vw" />
              </div>
              <div className={styles.title}>
                <h1>
                  Minimal Design <br /> Natural Light
                </h1>
              </div>
            </div>
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

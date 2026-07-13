"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import styles from "./page.module.css";
import IntroLoader from "./components/IntroLoader/IntroLoader";

gsap.registerPlugin(CustomEase);

export default function Home() {
  useEffect(() => {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const projectsContainer = document.querySelector(`.${styles.projects}`);
    const locationsContainer = document.querySelector(`.${styles.locations}`);
    const gridImages = gsap.utils.toArray(`.${styles.img}`);
    const heroImage = document.querySelector(
      `.${styles.img}.${styles["hero-img"] || "hero-img"}`,
    );

    const images = gridImages.filter((img) => img !== heroImage);

    const allImageSources = Array.from(
      { length: 35 },
      (_, i) => `/img${i + 1}.jpeg`,
    );

    const getRandomImageSet = () => {
      const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    function startImageRotation() {
      const totalCycles = 20;

      for (let cycle = 0; cycle < totalCycles; cycle++) {
        const randomImages = getRandomImageSet();

        gsap.to(
          {},
          {
            duration: 0,
            delay: cycle * 0.15,
            onComplete: () => {
              gridImages.forEach((img, index) => {
                const imgElement = img.querySelector("img");
                if (cycle === totalCycles - 1 && img === heroImage) {
                  imgElement.src = "/img5.jpeg";
                  gsap.set(".hero-img img", { scale: 2 });
                } else {
                  imgElement.src = randomImages[index];
                }
              });
            },
          },
        );
      }
    }

    function setupInitialStates() {
      gsap.set(`.${styles.nav}`, {
        y: "-125%",
      });

      gsap.set(`.${styles["intro-copy"]} .${styles.word}`, {
        y: "110%",
      });

      gsap.set(`.${styles.title} .${styles.word}`, {
        y: "110%",
      });
    }

    function init() {
      initializeDynamicContent();
      setupInitialStates();
      createAnimationTimelines();
    }

    init();
    function createAnimationTimelines() {
      const overlayTimeline = gsap.timeline();
      const imagesTimeline = gsap.timeline();
      const textTimeline = gsap.timeline();

      overlayTimeline.to(".logo-line-1", {
        backgroundPosition: "0% 0%",
        color: "#fff",
        duration: 1,
        ease: "none",
        delay: 0.5,
        onComplete: () => {
          gsap.to(".logo-line-2", {
            backgroundPosition: "0% 0%",
            color: "#fff",
            duration: 1,
            ease: "none",
          });
        },
      });
      overlayTimeline.to(
        [`.${styles["projects-header"]}`, `.${styles["project-item"]}`],
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.075,
          delay: 1,
        },
      );

      overlayTimeline.to(
        [`.${styles["locations-header"]}`, `.${styles["location-item"]}`],
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.075,
        },
        "<",
      );

      overlayTimeline.to(`.${styles["project-item"]}`, {
        color: "#fff",
        duration: 0.15,
        stagger: 0.075,
      });

      overlayTimeline.to(
        `.${styles["location-item"]}`,
        {
          color: "#fff",
          duration: 0.15,
          stagger: 0.075,
        },
        "<",
      );

      overlayTimeline.to(
        [`.${styles["projects-header"]}`, `.${styles["project-item"]}`],
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
        },
      );

      overlayTimeline.to(
        [`.${styles["locations-header"]}`, `.${styles["location-item"]}`],
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
        },
        "<",
      );

      overlayTimeline.to(`.${styles.overlay}`, {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });

      imagesTimeline.to(`.${styles.img}`, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: "hop",
        onStart: () => {
          setTimeout(() => {
            startImageRotation();
            gsap.to(`.${styles.loader}`, { opacity: 0, duration: 0.3 });
          }, 1000);
        },
      });

      imagesTimeline.to(images, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        delay: 2.5,
        stagger: 0.05,
        ease: "hop",
      });

      imagesTimeline.to(heroImage, {
        y: -50,
        duration: 1,
        ease: "hop",
      });

      imagesTimeline.to(heroImage, {
        scale: 4,
        clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
        duration: 1.5,
        ease: "hop",
        onStart: () => {
          gsap.to(heroImage.querySelector("img"), {
            scale: 1,
            duration: 1.5,
            ease: "hop",
          });
          gsap.to(`.${styles["banner-img"]}`, {
            scale: 1,
            delay: 0.5,
            duration: 0.5,
          });
          gsap.to(`.${styles.nav}`, {
            y: "0%",
            duration: 1,
            ease: "hop",
            delay: 0.25,
          });
        },
      });

      imagesTimeline.to(
        ".banner-img-1",
        {
          left: "40%",
          rotate: -20,
          duration: 1.5,
          delay: 0.5,
          ease: "hop",
        },
        "<",
      );
      imagesTimeline.to(
        ".banner-img-2",
        {
          left: "60%",
          rotate: 20,
          duration: 1.5,
          delay: 0.5,
          ease: "hop",
        },
        "<",
      );

      textTimeline.to(`.${styles.title} .${styles.word}`, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        delay: 9.5,
        ease: "power3.out",
      });
    }

    function initializeDynamicContent() {
      // Stub - to be implemented
    }
  }, []);

  return (
    <IntroLoader />
  );
}

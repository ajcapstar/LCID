"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import SplitType from "split-type";
import styles from "./page.module.css";

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

    const introCopy = new SplitType(`.${styles["intro-copy"]} h3`, {
      type: "words",
      absolute: false,
    });

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
        "<"
      );
    }

    function initializeDynamicContent() {
      // Stub - to be implemented
    }
  }, []);
  // return (
  //   <>
  //     <div className="container">
  //       <div className="page-header">
  //         <h1> Timeless form</h1>
  //       </div>
  //     </div>
  //     {/* <Nav /> */}
  //   </>
  // );

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.projects}>
          <div className={styles["projects-header"]}>
            <p>Projects</p>
            <p>Directors</p>
          </div>
        </div>
        <div className={styles.loader}>
          <h1 className="logo-line-1">Nova</h1>
          <h1 className="logo-line-2">Vice</h1>
        </div>
        <div className={styles.locations}>
          <div className={styles["locations-header"]}>
            <p>Location</p>
          </div>
        </div>
      </div>

      <div className={styles["image-grid"]}>
        <div className={styles["grid-row"]}>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_1.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_2.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_3.jpg" alt="" />
          </div>
        </div>
        <div className={styles["grid-row"]}>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_4.jpg" alt="" />
          </div>
          <div className={`${styles.img} ${styles["hero-img"] || "hero-img"}`}>
            <img src="/LCID/sticky-cards/card_5.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_1.jpg" alt="" />
          </div>
        </div>
        <div className={styles["grid-row"]}>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_2.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_3.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_4.jpg" alt="" />
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.links}>
          <a href="#">Index</a>
          <a href="#">Work</a>
        </div>
        <div className={styles["nav-logo"]}>
          <a href="#">
            Nova
            <br />
            Vice
          </a>
        </div>
        <div className={styles.links}>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <div
        className={`${styles["banner-img"]} ${styles["banner-img-1"] || "banner-img-1"}`}
      >
        <img src="/LCID/sticky-cards/card_2.jpg" alt="" />
      </div>
      <div
        className={`${styles["banner-img"]} ${styles["banner-img-2"] || "banner-img-2"}`}
      >
        <img src="/LCID/sticky-cards/card_5.jpg" alt="" />
      </div>

      <div className={styles["intro-copy"]}>
        <h3>
          {"Creative Solutions".split(" ").map((word, i) => (
            <span key={i} className={styles.word}>
              {word}{" "}
            </span>
          ))}
        </h3>
        <h3>
          {"Impactful Results".split(" ").map((word, i) => (
            <span key={i} className={styles.word}>
              {word}{" "}
            </span>
          ))}
        </h3>
      </div>

      <div className={styles.title}>
        <h1>
          {"Crafting Bold Experiences".split(" ").map((word, i) => (
            <span key={i} className={styles.word}>
              {word}{" "}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
}

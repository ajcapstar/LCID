"use client";
import Link from "next/link";
import styles from "./Slider.module.css";
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
          mask: type,
        });
      };

      const headerSplit = splitText(
        `.${styles.header} h1`,
        "chars",
        styles.char,
      );
      const navSplit = splitText(`.${styles.nav} a`, "words", styles.word);
      const footerSplit = splitText(
        `.${styles["hero-footer"]} p`,
        "words",
        styles.word,
      );

      gsap.set(
        [`.${styles.header}`, `.${styles.nav}`, `.${styles["hero-footer"]}`],
        {
          autoAlpha: 1,
        },
      );

      const q = gsap.utils.selector(container);
      const counterProgress = q(`.${styles["preloader-counter"]} h1`)[0];
      const counterContainer = q(`.${styles["preloader-counter"]}`)[0];
      const counter = { value: 0 };

      const tl = gsap.timeline();
      tl.to(counter, {
        value: 100,
        duration: 3,
        ease: "power3.out",
        onUpdate: () => {
          if (counterProgress)
            counterProgress.textContent = Math.floor(counter.value);
        },
        onComplete: () => {
          const counterDigits = splitText(
            counterProgress,
            "chars",
            styles.digit,
          );
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
        `.${styles["progress-bar"]}`,
        {
          scaleX: 1,
          duration: 3,
          ease: "power3.out",
        },
        "<",
      );

      tl.to(
        `.${styles["hero-bg"]}`,
        {
          clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
          duration: 1.5,
          ease: "hop",
        },
        "4.5",
      );

      tl.to(
        `.${styles["hero-bg"]} img`,
        {
          scale: 1.5,
          duration: 1.5,
          ease: "hop",
        },
        "<",
      );

      tl.to(
        `.${styles["hero-bg"]}`,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 2,
          ease: "hop",
        },
        "6",
      );

      tl.to(
        `.${styles["hero-bg"]} img`,
        {
          scale: 1,
          duration: 2,
          ease: "hop",
        },
        "6",
      );
      tl.to(
        `.${styles.progress}`,
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
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      <div className={styles["preloader-counter"]}>
        <h1>0</h1>
      </div>

      <nav className={styles.nav}>
        <div className="nav-logo">
          <Link href="/">LCID</Link>
        </div>
        <div className={styles["nav-links"]}>
          <Link href="/">Index</Link>
          <Link href="/works">Collection</Link>
          <Link href="#">Material</Link>
          <Link href="/process">Process</Link>
          <Link href="/about">Info</Link>
        </div>
      </nav>
      <section className={styles.hero}>
        <div className={styles["hero-bg"]}>
          <img src="sticky-cards/card_4.jpg" alt="" />
        </div>
        <div className={styles.header}>
          <h1>LCID</h1>
        </div>

        <div className={styles["hero-footer"]}>
          <p>Performance</p>
          <p>craftsmanship</p>
          <p>innovation</p>
        </div>
        <div className={styles["progress-bar"]}>
          <div className={styles.progress}></div>
        </div>
      </section>
    </main>
  );
};

export default Slider;

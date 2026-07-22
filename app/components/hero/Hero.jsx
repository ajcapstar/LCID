"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import styles from "./hero.module.css";

gsap.registerPlugin(SplitText, Flip);

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const heroImages = Array.from({ length: 15 }, (_, i) => ({
  src: `${BASE}/hero/img${i + 1}.jpg`,
  alt: `Studio frame ${i + 1} — Creative direction asset`,
}));

const Hero = () => {
  const heroRef = useRef(null);
  const counterRefs = useRef([]);
  const imgRefs = useRef([]);
  const headerRef = useRef(null);
  const siteInfoRef = useRef(null);
  const footerRef = useRef(null);
  const sidebarRef = useRef(null);
  const heroBgRef = useRef(null);

  useGSAP(
    () => {
      const digits = counterRefs.current.filter(Boolean);
      const imgs = imgRefs.current.filter(Boolean);

      // 1. Initial State Settings (Matches line 127: gsap.set(".img", { scale: 0 }))
      gsap.set(imgs, { scale: 0 });
      gsap.set(`.${styles.dividerVertical}`, { scaleY: 0, transformOrigin: "top" });
      gsap.set(`.${styles.divider}`, { scaleX: 0, transformOrigin: "left" });
      gsap.set(`.${styles.logo}`, { scale: 0 });

      // 2. Setup Text Splitting (Matching your new screenshot structure)
      const textNodes = heroRef.current.querySelectorAll("h1, h2, p");
      const split = new SplitText(textNodes, {
        type: "lines",
        linesClass: "text-line",
      });

      // Add the inner spans just like your new screenshot
      split.lines.forEach((line) => {
        const textContent = line.textContent;
        // We'll add the overflow hidden to the line, and animate the inner span
        line.style.overflow = "hidden";
        line.innerHTML = `<span style="display:block;">${textContent}</span>`;
      });

      // Target the inner spans for the animation so they slide up from behind the mask
      const textLines = heroRef.current.querySelectorAll(".text-line span");
      gsap.set(textLines, { y: "100%" });

      /* ── 3. Build digit strips safely ─────────────────────── */
      digits.forEach((el) => {
        el.innerHTML = "";
        const strip = document.createElement("div");
        strip.style.cssText = "display:flex;flex-direction:column;";
        for (let n = 0; n <= 9; n++) {
          const span = document.createElement("span");
          span.textContent = n;
          span.style.display = "block";
          strip.appendChild(span);
        }
        el.appendChild(strip);
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* ── 4. Animate counter digits (Matching exact screenshot timings) ────────── */
      // Screenshot timings mapping:
      // counter-1 (digits[0]): target 1, duration 2, delay 1.5
      // counter-2 (digits[1]): target 10, duration 3, delay 0
      // counter-3 (digits[2]): target 30, duration 2.5, delay 0
      const counterConfigs = [
        { target: 1, duration: 2, delay: 1.5 },
        { target: 10, duration: 3, delay: 0 },
        { target: 30, duration: 2.5, delay: 0 }
      ];
      
      digits.forEach((el, i) => {
        const strip = el.firstChild;
        const spanH = el.getBoundingClientRect().height || 120;
        const config = counterConfigs[i];
        
        tl.to(
          strip,
          {
            y: -(config.target * spanH),
            duration: config.duration,
            ease: "power2.inOut",
          },
          config.delay
        );
      });

      /* ── 5. Reveal background and scale in images (Matching screenshot timing) ─────────────────────────────── */
      tl.to(
        heroBgRef.current, 
        { 
          scaleY: 1, 
          duration: 3, 
          ease: "power2.inOut" 
        }, 
        0.25 // absolute 0.25s
      );

      tl.to(
        imgs,
        {
          scale: 1,
          duration: 1,
          stagger: 0.125,
          ease: "power3.out"
        },
        "<" // starts at the exact same time as the background reveal above
      );

      /* ── 6. Fade counter out & trigger FLIP Scatter ──────────────────────────────── */
      const counterContainer = heroRef.current.querySelector(`.${styles.counter}`);
      
      tl.to(
        counterContainer, 
        { 
          opacity: 0, 
          duration: 0.3, 
          ease: "power3.out",
          delay: 0.3,
          onStart: () => {
            /* ── 7. FLIP Scattering Effect (Triggered via onStart) ────────── */
            imgs.forEach((img) => img.classList.remove(styles.animateOut));
            const state = Flip.getState(imgs);
            imgs.forEach((img) => img.classList.add(styles.animateOut));

            const flipAnim = Flip.from(state, {
              duration: 1,
              stagger: 0.1,
              ease: "power3.inOut",
              absolute: true,
            });

            const scatterTimeline = gsap.timeline();
            scatterTimeline.add(flipAnim, 0);

            // Combined dynamic scaling sub-timelines (Re-applied in parallel)
            imgs.forEach((el, i) => {
              const scaleTimeline = gsap.timeline();
              scaleTimeline
                .to(el, { scale: 2.5, duration: 0.45, ease: "power3.in" }, 0.025)
                .to(el, { scale: 1, duration: 0.45, ease: "power3.out" }, 0.5);
              scatterTimeline.add(scaleTimeline, i * 0.1);
            });
          }
        }
      );

      /* ── 8. Reveal sidebar divider ── */
      const sidebarDivider = heroRef.current.querySelector(`.${styles.dividerVertical}`);
      tl.to(sidebarDivider, {
        scaleY: "100%",
        duration: 1,
        ease: "power3.inOut",
        delay: 1.25,
      });

      /* ── 8.5 Reveal horizontal dividers (Matching Screenshot) ── */
      // Targets the horizontal divider inside site-info (and optionally a nav if it exists)
      const siteInfoDivider = heroRef.current.querySelector(`.${styles.siteInfo} .${styles.divider}`);
      const navDivider = document.querySelector("nav [class*='divider']");
      const horizontalDividers = [navDivider, siteInfoDivider].filter(Boolean);

      tl.to(
        horizontalDividers,
        {
          scaleX: "100%",
          duration: 1,
          stagger: 0.5,
          ease: "power3.inOut",
        },
        "<" // Starts exactly with the sidebar divider animation above
      );

      /* ── 8.7 Reveal logo (Matching Screenshot) ── */
      const logo = heroRef.current.querySelector(`.${styles.logo}`);
      tl.to(
        logo,
        {
          scale: 1,
          duration: 1,
          ease: "power4.inOut",
        },
        "<" // Starts exactly with the horizontal dividers
      );

      /* ── 9. Reveal text lines (Matching Screenshot) ── */
      tl.to(
        textLines,
        {
          y: "0%",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        },
        "<" // Starts exactly alongside the logo scale animation (and insertion of the first text tween)
      );
    },
    { scope: heroRef },
  );

  return (
    <section ref={heroRef} className={styles.hero}>
      <div ref={heroBgRef} className={styles.heroBg} />

      <div className={styles.counter}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => (counterRefs.current[i] = el)}
            className={`${styles.digit}${i === 1 ? ` ${styles.numOffset2}` : ""}`}
          />
        ))}
      </div>

      <div ref={sidebarRef} className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={heroImages[0].src} alt="Logo branding icon" />
        </div>
        <div className={styles.dividerVertical} />
      </div>

      <div className={styles.imagesContainer}>
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => (imgRefs.current[i] = el)}
            className={styles.img}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i < 5 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div ref={headerRef} className={styles.header}>
        <h1>Visual engineering for modern brands</h1>
      </div>

      <div ref={siteInfoRef} className={styles.siteInfo}>
        <h2>A design team focused on brands, websites, apps&nbsp;&amp;&nbsp;products</h2>
        <div className={styles.divider} />
        <div className={styles.siteInfoCopy}>
          <p>Award-winning creative studio</p>
          <p>Operating since 2019</p>
        </div>
      </div>

      <div ref={footerRef} className={styles.heroFooter}>
        <h2>Watch showreel</h2>
      </div>
    </section>
  );
};

export default Hero;

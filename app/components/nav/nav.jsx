"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react"; // 1. Grabbing your global Lenis instance
import { gsap } from "gsap";
import styles from "./nav.module.css";

const Nav = () => {
  const navRef = useRef(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const navAnimationRef = useRef(null);

  useEffect(() => {
    if (!lenis || !navRef.current) return;

    // 1. HARD-RESET THE COLOR STARTING CHANNELS
    // Set alpha to 0 of your clean white/grey value so it transitions cleanly without mud
    gsap.set(navRef.current, { 
      backgroundColor: "rgba(247, 247, 250, 0)",
      maxWidth: "100%" 
    });

    // 2. Set up the fluid GSAP morph timeline
    navAnimationRef.current = gsap.to(navRef.current, {
      maxWidth: "600px",
      backgroundColor: "rgba(247, 247, 250, 1)", // Your custom light-capsule background
      borderRadius: "9999px",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
      border: "1px solid rgba(220, 220, 230, 0.6)", // Sleek subtle accent ring
      duration: 0.6, // Tighter duration for snappier feedback when leaving the top layout
      ease: "power2.out",
      paused: true,
    });

    const handleScroll = (e) => {
      // Triggers right at 50px of vertical travel
      if (e.scroll > 50) {
        navAnimationRef.current.play();
      } else {
        navAnimationRef.current.reverse();
      }
    };

    // Bind seamlessly into your core Lenis lifecycle
    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
      if (navAnimationRef.current) {
        navAnimationRef.current.kill();
      }
    };
  }, [lenis]);

  // Instantly reset navigation pill back to full width on route changes
  useEffect(() => {
    if (navAnimationRef.current) {
      navAnimationRef.current.progress(0).pause();
    }
  }, [pathname]);

  return (
    // Outer structural wrapper styled via CSS module
    <div className={styles.navWrapper}>
      {/* Dynamic Navigation Capsule Morphing via GSAP */}
      <div ref={navRef} role="navigation" className={styles.navCapsule}>
        {/* Logo Element */}
        <div className="nav-logo">
          <Link href="/" className={styles.logo}>
            LCID
          </Link>
        </div>

        {/* Navigation Links Grid */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/works" className={styles.link}>
            Works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

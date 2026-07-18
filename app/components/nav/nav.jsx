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
  const isDocked = useRef(false);

  useEffect(() => {
    if (!lenis || !navRef.current) return;

    // 1. Set initial layout states
    gsap.set(navRef.current, {
      backgroundColor: "rgba(247, 247, 250, 0)",
      maxWidth: "100%",
      borderColor: "rgba(220, 220, 230, 0)",
      borderRadius: "0px",
    });

    const handleScroll = (e) => {
      if (e.scroll > 50) {
        if (!isDocked.current) {
          isDocked.current = true;
          gsap.to(navRef.current, {
            maxWidth: "600px",
            backgroundColor: "rgba(247, 247, 250, 1)",
            borderRadius: "9999px",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
            borderColor: "rgba(220, 220, 230, 0.6)",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      } else {
        if (isDocked.current) {
          isDocked.current = false;
          gsap.to(navRef.current, {
            maxWidth: "100%",
            backgroundColor: "rgba(247, 247, 250, 0)",
            borderRadius: "0px",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            boxShadow: "none",
            borderColor: "rgba(220, 220, 230, 0)",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
      gsap.killTweensOf(navRef.current);
    };
  }, [lenis]);

  // Instantly reset navigation pill back to full width on route changes
  useEffect(() => {
    isDocked.current = false;
    if (navRef.current) {
      gsap.killTweensOf(navRef.current);
      gsap.set(navRef.current, {
        maxWidth: "100%",
        backgroundColor: "rgba(247, 247, 250, 0)",
        borderRadius: "0px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        boxShadow: "none",
        borderColor: "rgba(220, 220, 230, 0)",
      });
    }
  }, [pathname]);

  return (
    // Outer structural wrapper styled via CSS module
    <div className={`${styles.navWrapper} global-nav`}>
      {/* Dynamic Navigation Capsule Morphing via GSAP */}
      <div ref={navRef} role="navigation" className={styles.navCapsule}>
        {/* Logo Element */}
        <div className="nav-logo">
          <Link href="/" className={styles.logo}>
            <svg
              width="70px"
              height="auto"
              viewBox="0 0 192 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M56.5 6.00092L6 36.1707C56.5 72.1707 75 67.6707 81.5 67.6707C87.7452 67.6707 99.5 64.6707 108.5 56.6707C117.5 48.6707 120.684 38.5376 125.5 33.1707C136.036 17.2165 145.5 6.00092 157 6.00092C170.759 6.00092 186 13.5323 186 36.1707C186 51.1707 177 64.1707 157 64.1707C139 64.1707 135.21 44.6707 127.482 30.1707C124.018 23.6707 112.5 6.00093 96.5083 6.00092C80.5166 6.0009 67.5 16.6706 67.5 33.6707C67.5 50.6707 76 64.1707 96.5083 64.1707"
                stroke="#F31616"
                strokeOpacity="0.65"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Navigation Links Grid */}
        <div className={styles.navLinks}>
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

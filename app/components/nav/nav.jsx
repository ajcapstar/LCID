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
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
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

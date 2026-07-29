"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import { usePageTransition } from "@/app/pageTransition";
import styles from "./nav.module.css";
import Logo from "@/app/logo";

const Nav = () => {
  const navRef = useRef(null);
  const logoSvgRef = useRef(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const isDocked = useRef(false);
  const { transitionTo } = usePageTransition();

  useEffect(() => {
    if (!lenis || !navRef.current) return;

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
            maxWidth: "480px",
            backgroundColor: "rgba(247, 247, 250, 1)",
            borderRadius: "9999px",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
            borderColor: "rgba(220, 220, 230, 0.6)",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (logoSvgRef.current) {
            gsap.to(logoSvgRef.current, {
              width: "50px",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
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
            paddingLeft: "2rem",
            paddingRight: "2rem",
            boxShadow: "none",
            borderColor: "rgba(220, 220, 230, 0)",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (logoSvgRef.current) {
            gsap.to(logoSvgRef.current, {
              width: "70px",
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      }
    };

    lenis.on("scroll", handleScroll);
    const navNode = navRef.current;
    return () => {
      lenis.off("scroll", handleScroll);
      gsap.killTweensOf(navNode);
    };
  }, [lenis]);

  // Reset navigation pill state on route changes
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
        paddingLeft: "2rem",
        paddingRight: "2rem",
        boxShadow: "none",
        borderColor: "rgba(220, 220, 230, 0)",
      });
    }
    if (logoSvgRef.current) {
      gsap.killTweensOf(logoSvgRef.current);
      gsap.set(logoSvgRef.current, { width: "70px" });
    }
  }, [pathname]);

  return (
    <div className={`${styles.navWrapper} global-nav`}>
      <div ref={navRef} role="navigation" className={styles.navCapsule}>
        <div className="nav-logo">
          <Link
            href="/"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              transitionTo("/");
            }}
          >
            <Logo ref={logoSvgRef} />
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link
            href="/about"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              transitionTo("/about");
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              transitionTo("/contact");
            }}
          >
            Contact
          </Link>
          <Link
            href="/works"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              transitionTo("/works");
            }}
          >
            Works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

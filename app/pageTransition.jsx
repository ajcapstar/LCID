"use client";
import Logo from "@/app/logo";
import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
const PageTransition = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const blocksRef = useRef([]);
  const logoRef = useRef(null);
  const isTransitioning = useRef(false);

  const coverPage = useCallback(
    (url) => {
      const tl = gsap.timeline({
        onComplete: () => router.push(url),
      });

      const path = logoRef.current?.querySelector("path");

      tl.to(blocksRef.current, {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "left",
      });

      if (path) {
        tl.set(logoOverlayRef.current, { opacity: 1 }, "-=0.2")
          .set(
            path,
            {
              strokeDashoffset: path.getTotalLength(),
              fill: "transparent",
            },
            "-=0.25",
          )
          .to(
            path,
            {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.inOut",
            },
            "-=0.5",
          )
          .to(
            path,
            {
              fill: "#e3e4d8",
              duration: 1,
              ease: "power2.inOut",
            },
            "-=0.5",
          )
          .to(logoOverlayRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
          });
      }
    },
    [router],
  );

  const revealPage = useCallback(() => {
    gsap.set(blocksRef.current, {
      scaleX: 1,
      transformOrigin: "right",
    });

    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, []);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      }
    }
    revealPage();

    const handleLinkClick = (e) => {
      const link = e.currentTarget;
      // Don't run transition for links that open in a new tab
      if (link.target === "_blank" || e.ctrlKey || e.metaKey) {
        return;
      }

      e.preventDefault();

      const href = link.href;
      const url = new URL(href).pathname;

      if (url !== pathname) {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        coverPage(url);
      }
    };

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [pathname, coverPage, revealPage]);

  return (
    <>
      <div ref={overlayRef} className="transition-overlay"></div>
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;

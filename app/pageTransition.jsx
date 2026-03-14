"use client";
import Logo from "./logo";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
const pageTransition = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const blocksRef = useRef(null);
  const logoRef = useRef(null);
  const isTransitioning = useRef(false);

  const coverPage = (url) => {
    const tl = gsap.timeline();
    tl.to(blocksRef.current, {
      scaleY: 1,
      transformOrigin: "left",
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(url);
      },
    });
  };

  const revealPage = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    // Animate logo
    const path = logoRef.current ? logoRef.current.querySelector("path") : null;
    if (path) {
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }

    // Animate blocks to reveal page
    tl.to(blocksRef.current, {
      scaleY: 0,
      transformOrigin: "right",
      duration: 0.5,
      stagger: -0.05,
      ease: "power2.inOut",
    });
  };
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

    gsap.set(blocksRef.current, {
      scaleY: isTransitioning.current ? 1 : 0,
      transformOrigin: "left",
    });

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

    const handleRouteChange = (url) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    const Links = document.querySelectorAll("a");
    const handleClick = (e) => {
      // Check if the link is external or a download link
      const link = e.currentTarget;
      if (link.hostname !== window.location.hostname || link.download) {
        return;
      }
      e.preventDefault();
      const url = new URL(link.href).pathname;
      if (url !== pathname) {
        handleRouteChange(url);
      }
    };

    Links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      Links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, [pathname]);
  return (
    <>
      <div ref={overlayRef} className="transition-overlay"></div>
      <div ref={logoOverlayRef} className="logo-overlay"></div>
      <div className="logo-container">
        <Logo ref={logoRef} />
      </div>
      {children}
    </>
  );
};

export default pageTransition;

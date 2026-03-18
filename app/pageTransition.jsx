"use client";
import Logo from "@/app/logo";
import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
const PageTransition = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const blocksRef = useRef([]);
  const logoRef = useRef(null);
  const isTransitioning = useRef(false);

  // Blocks are now rendered declaratively in the JSX below

  // Stable and scoped coverPage function for manual calls
  const { contextSafe } = useGSAP({ scope: overlayRef });

  const coverPage = useCallback(
    contextSafe((url) => {
      const path = logoRef.current?.querySelector("path");

      if (!path) {
        const tl = gsap.timeline({
          onComplete: () => router.push(url),
        });
        tl.to(blocksRef.current, {
          scaleX: 1,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.out",
          transformOrigin: "left",
        }).to(logoOverlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
        return;
      }

      const length = path.getTotalLength();
      const tl = gsap.timeline({
        onComplete: () => router.push(url),
      });

      tl.to(blocksRef.current, {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "left",
      })
        .addLabel("revealFinished") // Mark the end of block animation
        .set(
          logoOverlayRef.current,
          { opacity: 1 },
          "revealFinished-=0.2" // Start showing overlay slightly before blocks finish
        )
        .set(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
            fill: "transparent",
          },
          "revealFinished-=0.2" // Initialize path at the same time
        )
        .to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
          },
          "revealFinished+=0.1" // Start drawing slightly AFTER initialization
        )
        .to(
          path,
          {
            fill: "#e3e4d8",
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(logoOverlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
    }),
    [contextSafe, router]
  );

  // Stable handleRouteChange function
  const handleRouteChange = useCallback(
    (url) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    },
    [coverPage]
  );

   // Entrance animation scoped to useGSAP
   useGSAP(
     () => {
       // Use requestAnimationFrame to ensure the new page's DOM is painted
       requestAnimationFrame(() => {
         // Hard reset to ensure blocks are covered before reveal
         gsap.set(blocksRef.current, {
           scaleX: 1,
           transformOrigin: "right",
           clearProps: "all",
         });
         gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });
 
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
       });
     },
     { scope: overlayRef, dependencies: [pathname] }
   );

  // Global Event Delegation for Navigation
  useEffect(() => {
    const basePath = "/LCID";

    const handleGlobalClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      // Filter internal links that aren't opening in a new tab/window
      const isInternal = link.origin === window.location.origin;
      const isNewTab =
        link.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey;
      const isDownload = link.hasAttribute("download");

      if (!isInternal || isNewTab || isDownload) return;

      // Extract and clean the path (strip basePath)
      const fullPath = link.pathname;
      const navPath = fullPath.startsWith(basePath)
        ? fullPath.slice(basePath.length) || "/"
        : fullPath;

      // If it's a new route, prevent default and trigger transition
      if (navPath !== pathname) {
        e.preventDefault();
        handleRouteChange(navPath);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleGlobalClick, {
        capture: true,
      });
  }, [pathname, handleRouteChange]);

  return (
    <>
      <div ref={overlayRef} className="transition-overlay">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="block"
            ref={(el) => (blocksRef.current[i] = el)}
          ></div>
        ))}
      </div>
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

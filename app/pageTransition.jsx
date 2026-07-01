"use client";
import Logo from "@/app/logo";
import {
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

const PageTransitionContext = createContext({
  transitionTo: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

const PageTransition = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const blocksRef = useRef([]);
  const logoRef = useRef(null);
  const isTransitioning = useRef(false);
  const lenis = useLenis();

  const { contextSafe } = useGSAP({ scope: overlayRef });

  const coverPage = useCallback(
    contextSafe((url) => {
      const path = logoRef.current?.querySelector("path");

      if (lenis) lenis.stop(); // Freeze scrolling immediately

      // If the logo path doesn't exist for some reason, fallback safely
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
        });
        return;
      }

      const length = path.getTotalLength();
      const tl = gsap.timeline({
        onComplete: () => router.push(url), // Route changes while Logo is STILL visible and filled!
      });

      tl.to(blocksRef.current, {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
        transformOrigin: "left",
      })
        .addLabel("revealFinished")
        .set(logoOverlayRef.current, { opacity: 1 }, "revealFinished-=0.2")
        .set(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
            fill: "transparent",
          },
          "revealFinished-=0.2",
        )
        .to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
          },
          "revealFinished+=0.1",
        )
        .to(
          path,
          {
            fill: "#e3e4d8",
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        );

      // REMOVED: The logo fade-out has been extracted from here!
    }),
    [contextSafe, router, lenis],
  );

  const handleRouteChange = useCallback(
    (url) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    },
    [coverPage],
  );

  // Entrance animation: Fires instantly when Next.js completes the route change
  useGSAP(
    () => {
      // 1. Instantly snap scroll container to top behind the scenes
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }

      // 2. Ensure blocks are locked at solid scaleX(1) pointing rightward
      gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

      // 3. Create a master timeline that fades out the logo AND clears the blocks together
      const entranceTl = gsap.timeline({
        onComplete: () => {
          isTransitioning.current = false;
          if (lenis) {
            lenis.start();
            lenis.resize();
            gsap.delayedCall(0.1, () => lenis.resize()); // Safety net catch for late paints
          }
        },
      });

      entranceTl
        .to(logoOverlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          blocksRef.current,
          {
            scaleX: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            transformOrigin: "right",
          },
          "-=0.3",
        ); // Overlap slightly with the logo fade for fluid motion
    },
    { scope: overlayRef, dependencies: [pathname, lenis] }, // Removed requestAnimationFrame wrapper
  );

  // Global Event Delegation
  useEffect(() => {
    const basePath = "/LCID";
    const handleGlobalClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const isInternal = link.origin === window.location.origin;
      const isNewTab =
        link.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey;
      const isDownload = link.hasAttribute("download");

      if (!isInternal || isNewTab || isDownload) return;

      const fullPath = link.pathname;
      const navPath = fullPath.startsWith(basePath)
        ? fullPath.slice(basePath.length) || "/"
        : fullPath;

      if (navPath !== pathname) {
        e.preventDefault();
        const targetUrl = navPath + link.search + link.hash;
        handleRouteChange(targetUrl);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleGlobalClick, {
        capture: true,
      });
  }, [pathname, handleRouteChange]);

  return (
    <PageTransitionContext.Provider value={{ transitionTo: handleRouteChange }}>
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
    </PageTransitionContext.Provider>
  );
};

export default PageTransition;

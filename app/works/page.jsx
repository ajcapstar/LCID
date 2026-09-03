"use client";
import React from "react";
import Image from "next/image";
import "./works.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const cardData = [
    {
      title: "Flip Me",
      description: "Go on, give it a hover <br/> dare you",
      thumbImg: "/hero/img1.jpg",
    },
    {
      title: "Spin Cycle",
      description: "Gets dizzy real fast <br/> watch out",
      thumbImg: "/hero/img1.jpg",
    },
    {
      title: "Peek-a-Boo",
      description: "Now you see me <br/> now you don't",
      thumbImg: "/hero/img1.jpg",
    },
    {
      title: "Lean In",
      description: "It follows your cursor <br/> a little clingy, honestly",
      thumbImg: "/hero/img1.jpg",
    },
  ];

  const container = React.useRef(null);

  useGSAP(() => {
    const PARALLAX_STRENGTH = 40;
    const cardWrappers = gsap.utils.toArray(".card");
    const cardCubes = [];

    cardWrappers.forEach((cardWrapper) => {
      const cardCube = cardWrapper.querySelector(".cube");
      if (!cardCube) return;

      const cardDepth = parseFloat(
        getComputedStyle(cardWrapper).getPropertyValue("--card-depth") || 340
      );

      cardCubes.push({ cardCube, cardDepth });
    });

    cardCubes.forEach(({ cardCube, cardDepth }) => {
      const rotation = { flip: 0, tiltX: 0, tiltY: 0 };
      let isFlipped = false;

      function render() {
        gsap.set(cardCube, {
          rotationX: rotation.flip + rotation.tiltX,
          rotationY: rotation.tiltY,
          z: -cardDepth / 2,
        });
      }
      render();

      // for when the mouse hovers on the cube
      cardCube.addEventListener("mouseenter", () => {
        isFlipped = false;
        gsap.to(rotation, {
          flip: 180,
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: true,
          onUpdate: render,
          onComplete: () => {
            isFlipped = true;
          },
        });
      });
      
      // FOR WHEN THE MOUSE / CURSOR LEAVES THE CARD
      cardCube.addEventListener("mouseleave", () => {
        isFlipped = false;
        gsap.to(rotation, {
          flip: 0,
          tiltX: 0,
          tiltY: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
          onUpdate: render,
        });
      });

      // for when the mouse moves over the card
      cardCube.addEventListener("mousemove", (event) => {
        if (!isFlipped) return; // Only parallax after flip finishes

        const bounds = cardCube.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        const offsetX = (event.clientX - centerX) / bounds.width;
        const offsetY = (event.clientY - centerY) / bounds.height;

        gsap.to(rotation, {
          tiltY: offsetX * PARALLAX_STRENGTH,
          tiltX: -offsetY * PARALLAX_STRENGTH, // Negative so tilting feels natural
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
          onUpdate: render,
        });
      });
    });
  }, { scope: container });

  const renderFaceContent = (card) => (
    <>
      <Image className="card-thumb" src={card.thumbImg} alt={card.title} width={125} height={155} />
      <h2 className="card-title">{card.title}</h2>
      <div className="card-meta">
        <p className="card-desc" dangerouslySetInnerHTML={{ __html: card.description }}></p>
        <svg className="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="12" x2="20" y2="12" />
          <polyline points="14 6 20 12 14 18" />
        </svg>
      </div>
    </>
  );

  return (
    <section className="spotlight" ref={container}>
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <div className="cube">
            <div className="face face-front">{renderFaceContent(card)}</div>
            <div className="face face-back">{renderFaceContent(card)}</div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Works;

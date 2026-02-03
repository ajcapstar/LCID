"use client";

import{useRef} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import{useGSAP} from "@gsap/react"

gsap.registerPlugin(ScrollTrigger); 

import Image from "next/image";
import "./StickyCards.css";
const StickyCards = () => {
  const stickyCardsData = [
    {
      index: 1,
      title: "Modularity",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 2,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 3,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 4,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
    {
      index: 5,
      title: "Character",
      image: "/sticky-cards/card_1.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostru possun possum possum possum possum possum possum possum possum",
    },
  ];

const container = useRef(null);

useGSAP(() => {
  const stickyCards = document.querySelectorAll(".sticky-card");
  stickyCards.forEach((card,index) => {
    if (index<stickyCards.length - 1) {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: stickyCards[stickyCards.length - 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
      })}
    if (index < stickyCards.length -1) {
      ScrollTrigger.create({
        trigger:stickyCards[index+1],
        start:"top buttom",
        end :"top top",
        onUpdate:(self)=>{
          const progress = self.progress;
          const scale = 1 - progress *0.25;
          const rotation = (index % 2===0?5:-5)* progress;
          const afterOpacity = progress;
           gsap.set(card,{
            
            scale:scale,
            rotation:rotation,
            "--after-opacity":afterOpacity
        })
        }
      })
    }
    }) 
      
    },
 {scope: container});

  return (
    <div ref={container} className="sticky-cards">
      {stickyCardsData.map((cardData, index) => (
        <div className="sticky-card" key={index}>
          <div className="sticky-card-index" >
            <h1>{cardData.index}</h1>
          </div>
          <div className="sticky-card-content" key={index}>
            <div className="sticky-card-content-wrapper">
              <div className="sticky-card-header">
                <h1> {cardData.title}</h1>
                <div className="sticky-card-image">
                <Image src={cardData.image} alt="" width={500} height={500} />
                </div>
                <div className="sticky-card-copy">
                  <div className="sticky-card-copy-title">
                    <p>(About this page)</p>
                  </div>
                  <div className="sticky-card-copy-description">
                    <p>{cardData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCards;

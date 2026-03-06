"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./about.module.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const teamSection = document.querySelector(`.${styles.team}`);
    const teamMembers = gsap.utils.toArray(`.${styles.teamMember}`);
    const teamMemberCards = gsap.utils.toArray(`.${styles.teamMemberCard}`);
    const teamMemberInitials = teamMembers.map((member) =>
      member.querySelector(`.${styles.teamMemberNameInitial} h1`),
    );

    let cardPlaceholderEntrance = null;
    let cardSlideInAnimation = null;
    let outroAnimation = null;

    function initTeamAnimations() {
      if (window.innerWidth < 1000) {
        if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
        if (cardSlideInAnimation) cardSlideInAnimation.kill();
        if (outroAnimation) outroAnimation.kill();

        teamMembers.forEach((member, index) => {
          gsap.set(member, { clearProps: "all" });
          gsap.set(teamMemberInitials[index], { clearProps: "all" });
        });

        teamMemberCards.forEach((card) => {
          gsap.set(card, { clearProps: "all" });
        });

        return;
      }
      if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
      if (cardSlideInAnimation) cardSlideInAnimation.kill();
      if (outroAnimation) outroAnimation.kill();

      cardPlaceholderEntrance = ScrollTrigger.create({
        trigger: teamSection,
        start: "top bottom",
        end: "top top",
        scrub: 1,

        onUpdate: (self) => {
          const progress = self.progress;

          teamMembers.forEach((member, index) => {
            const entranceDelay = 0.15;
            const entranceDuration = 0.7;
            const entranceStart = index * entranceDelay;
            const entranceEnd = entranceStart + entranceDuration;

            if (progress >= entranceStart && progress <= entranceEnd) {
              const memberEntranceProgress =
                (progress - entranceStart) / entranceDuration;

              const entranceY = 125 - memberEntranceProgress * 125;
              gsap.set(member, { y: `${entranceY}%` });

              const initialLetterScaleDelay = 0.4;
              const initialLetterScaleProgress = Math.max(
                0,
                (memberEntranceProgress - initialLetterScaleDelay) /
                  (1 - initialLetterScaleDelay),
              );

              gsap.set(teamMemberInitials[index], {
                scale: initialLetterScaleProgress,
              });
            } else if (progress > entranceEnd) {
              gsap.set(member, { y: "0%" });
              gsap.set(teamMemberInitials[index], { scale: 1 });
            } else {
              gsap.set(member, { y: "125%" });
              gsap.set(teamMemberInitials[index], { scale: 0 });
            }
          });
        },
      });
      cardSlideInAnimation = ScrollTrigger.create({
        trigger: teamSection,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          teamMemberCards.forEach((card, index) => {
            const slideInStagger = 0.075;
            const xRotationDuration = 0.4;
            const xRotationStart = index * slideInStagger;
            const xRotationEnd = xRotationStart + xRotationDuration;

            if (progress >= xRotationStart && progress <= xRotationEnd) {
              const cardProgress =
                (progress - xRotationStart) / xRotationDuration;

              const cardInitialX = 300 - index * 100;
              const cardTargetX = -50;
              const cardSlideInX =
                cardInitialX + cardProgress * (cardTargetX - cardInitialX);

              const cardSlideInRotation = 20 - cardProgress * 20;

              gsap.set(card, {
                x: `${cardSlideInX}%`,
                rotation: cardSlideInRotation,
              });
            } else if (progress > xRotationEnd) {
              gsap.set(card, { x: "-50%", rotation: 0 });
            } else {
              const cardInitialX = 300 - index * 100;
              gsap.set(card, { x: `${cardInitialX}%`, rotation: 20 });
            }

            const cardScaleStagger = 0.12;
            const cardScaleStart = 0.4 + index * cardScaleStagger;
            const cardScaleEnd = 0.9; // Adding 10% buffer at the end of the scroll

            if (progress >= cardScaleStart && progress <= cardScaleEnd) {
              const scaleProgress =
                (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
              const scaleValue = 0.75 + scaleProgress * 0.25;

              gsap.set(card, {
                scale: scaleValue,
              });
            } else if (progress > cardScaleEnd) {
              gsap.set(card, {
                scale: 1,
              });
            } else {
              gsap.set(card, {
                scale: 0.75,
              });
            }
          });
        },
      });

      const outroSection = document.querySelector(`.${styles.outro}`);
      const outroTitle = outroSection.querySelector(`h1`);

      outroAnimation = gsap.fromTo(
        outroTitle,
        {
          opacity: 0,
          y: "150%",
        },
        {
          opacity: 1,
          y: "0%",
          scrollTrigger: {
            trigger: outroSection,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
    }

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initTeamAnimations();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    initTeamAnimations();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  });

  return (
    <div className={styles.wrapper}>
      <section className={`${styles.section} ${styles.hero}`}>
        <h1 className={styles.title}>Faces Behind the Frame</h1>
      </section>

      <section className={`${styles.team} ${styles.section}`}>
        <div className={styles.teamMember}>
          <div className={styles.teamMemberNameInitial}>
            <h1 className={styles.title}>C</h1>
          </div>
          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberImg}>
              <img
                src="sticky-cards/card_4.jpg"
                alt=""
                srcSet=""
                className={styles.img}
              />
            </div>
            <div className={styles.teamMemberInfo}>
              <p className={styles.copy}>( Chairman )</p>
              <h1 className={styles.title}>
                Cephas <span className={styles.label}>Lawrence</span>
              </h1>
            </div>
          </div>
        </div>

        <div className={styles.teamMember}>
          <div className={styles.teamMemberNameInitial}>
            <h1 className={styles.title}>T</h1>
          </div>
          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberImg}>
              <img
                src="sticky-cards/card_4.jpg"
                alt=""
                srcSet=""
                className={styles.img}
              />
            </div>
            <div className={styles.teamMemberInfo}>
              <p className={styles.copy}>( Chair Lady )</p>
              <h1 className={styles.title}>
                Tunmis <span className={styles.label}>Label</span>
              </h1>
            </div>
          </div>
        </div>

        <div className={styles.teamMember}>
          <div className={styles.teamMemberNameInitial}>
            <h1 className={styles.title}>A</h1>
          </div>
          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberImg}>
              <img
                src="sticky-cards/card_4.jpg"
                alt=""
                srcSet=""
                className={styles.img}
              />
            </div>
            <div className={styles.teamMemberInfo}>
              <p className={styles.copy}>( Creative Director )</p>
              <h1 className={styles.title}>
                Abiola <span className={styles.label}>Akpeme</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.outro} ${styles.section}`}>
        <h1 className={styles.title}>Where Vision Becomes Work</h1>
      </section>
    </div>
  );
};

export default About;

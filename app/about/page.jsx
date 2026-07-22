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

      // ── Set initial states ──────────────────────────────────────────────────
      teamMembers.forEach((member, index) => {
        gsap.set(member, { y: "125%" });
        gsap.set(teamMemberInitials[index], { scale: 0 });
      });

      teamMemberCards.forEach((card, index) => {
        gsap.set(card, { x: `${300 - index * 100}%`, rotation: 20, scale: 0.75 });
      });

      // ── Entrance timeline (members rising up + initials scaling in) ─────────
      const entranceTl = gsap.timeline({ paused: true });
      teamMembers.forEach((member, index) => {
        const entranceStart = index * 0.15;
        const entranceDuration = 0.7;
        const scaleStart = entranceStart + entranceDuration * 0.4;
        const scaleDuration = entranceDuration * 0.6;

        entranceTl
          .to(member, { y: "0%", duration: entranceDuration, ease: "none" }, entranceStart)
          .to(teamMemberInitials[index], { scale: 1, duration: scaleDuration, ease: "none" }, scaleStart);
      });

      cardPlaceholderEntrance = ScrollTrigger.create({
        animation: entranceTl,
        trigger: teamSection,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      });

      // ── Card slide-in + scale timeline ──────────────────────────────────────
      const cardTl = gsap.timeline({ paused: true });
      teamMemberCards.forEach((card, index) => {
        const xRotationStart = index * 0.075;
        cardTl.to(
          card,
          { x: "-50%", rotation: 0, duration: 0.4, ease: "none" },
          xRotationStart,
        );

        const cardScaleStart = 0.4 + index * 0.12;
        const cardScaleDuration = 0.9 - cardScaleStart;
        cardTl.to(
          card,
          { scale: 1, duration: cardScaleDuration, ease: "none" },
          cardScaleStart,
        );
      });

      cardSlideInAnimation = ScrollTrigger.create({
        animation: cardTl,
        trigger: teamSection,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 1,
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
        <h1 className={styles.title}>
          FACES BEHIND <br /> THE FRAME
        </h1>
      </section>

      <section className={`${styles.team} ${styles.section}`}>
        <div className={styles.teamMember}>
          <div className={styles.teamMemberNameInitial}>
            <h1 className={styles.title}>C</h1>
          </div>
          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberImg}>
              <img
                src="/LCID/sticky-cards/card_4.jpg"
                alt=""
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
                src="/LCID/sticky-cards/card_4.jpg"
                alt=""
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
        <h1 className={styles.title}>
          WHERE VISION <br /> BECOMES WORK
        </h1>
      </section>
    </div>
  );
};

export default About;

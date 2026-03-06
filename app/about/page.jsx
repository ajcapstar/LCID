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

    let cardPlaceholderEntrance = null;
    let cardSlideInAnimation = null;

    function initTeamAnimations() {
      if (window.innerWidth < 1000) {
        if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
        if (cardSlideInAnimation) cardSlideInAnimation.kill();

        teamMembers.forEach((member) => {
          gsap.set(member, { clearProps: "all" });

          const teamMemberInitial = member.querySelector(
            `.${styles.teamMemberNameInitial} h1`,
          );
          if (teamMemberInitial) {
            gsap.set(teamMemberInitial, { clearProps: "all" });
          }
        });

        teamMemberCards.forEach((card) => {
          gsap.set(card, { clearProps: "all" });
        });

        return;
      }
      if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
      if (cardSlideInAnimation) cardSlideInAnimation.kill();

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
              const teamMemberInitial = member.querySelector(
                `.${styles.teamMemberNameInitial} h1`,
              );

              const initialLetterScaleDelay = 0.4;
              const initialLetterScaleProgress = Math.max(
                0,
                (memberEntranceProgress - initialLetterScaleDelay) /
                  (1 - initialLetterScaleDelay),
              );

              if (teamMemberInitial) {
                gsap.set(teamMemberInitial, {
                  scale: initialLetterScaleProgress,
                });
              }
            } else if (progress > entranceEnd) {
              gsap.set(member, { y: "0%" });
              const teamMemberInitial = member.querySelector(
                `.${styles.teamMemberNameInitial} h1`,
              );
              if (teamMemberInitial) gsap.set(teamMemberInitial, { scale: 1 });
            } else if (progress < entranceStart) {
              gsap.set(member, { y: "125%" });
              const teamMemberInitial = member.querySelector(
                `.${styles.teamMemberNameInitial} h1`,
              );
              if (teamMemberInitial) gsap.set(teamMemberInitial, { scale: 0 });
            }
          });
        },
      });
    }

    initTeamAnimations();
  });

  return (
    <div className={styles.wrapper}>
      <section className={`${styles.section} ${styles.hero}`}>
        <h1 className={styles.title}>Faces behind the frame</h1>
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
        <h1 className={styles.title}>where visions become works </h1>
      </section>
    </div>
  );
};

export default About;

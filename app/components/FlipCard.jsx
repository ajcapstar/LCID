import React from "react";
import styles from "./FlipCard.module.css";

const FlipCard = () => {
  return (
    <div className={styles.flipCardContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.label}>LCID</span>
        </div>
        <div className={styles.menuBtn}>
          <span className={styles.label}>Menu</span>
        </div>
      </nav>
      <section className={`${styles.section} ${styles.hero}`} id="hero-section">
        <div className={styles.heroCards}>
          <div
            className={`${styles.card} ${styles.heroCard1}`}
            id="hero-card-1"
          >
            <div className={styles.cardTitle}>
              <span className={styles.label}>Plan</span>
              <span className={styles.label}>01</span>
            </div>
            <div className={styles.cardTitle}>
              <span className={styles.label}>01</span>
              <span className={styles.label}>plan</span>
            </div>
          </div>
          <div
            className={`${styles.card} ${styles.heroCard2}`}
            id="hero-card-2"
          >
            <div className={styles.cardTitle}>
              <span className={styles.label}>Design</span>
              <span className={styles.label}>02</span>
            </div>
            <div className={styles.cardTitle}>
              <span className={styles.label}>02</span>
              <span className={styles.label}>Design</span>
            </div>
          </div>
          <div
            className={`${styles.card} ${styles.heroCard3}`}
            id="hero-card-3"
          >
            <div className={styles.cardTitle}>
              <span className={styles.label}>Develop</span>
              <span className={styles.label}>03</span>
            </div>
            <div className={styles.cardTitle}>
              <span className={styles.label}>03</span>
              <span className={styles.label}>Develop</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${styles.section} ${styles.about}`}
        id="about-section"
      >
        <h1 className={styles.title}>Keep scrolling - it gets good</h1>
      </section>
      <section className={styles.section} id="services-section">
        <div className={styles.servicesHeader}>
          <h1 className={styles.title}>Stuffs i make so you dont have</h1>
        </div>
      </section>
      <section
        className={`${styles.section} ${styles.cards}`}
        id="cards-section"
      >
        <div className={styles.cardsContainer}>
          <div className={`${styles.card} ${styles.flipCard1}`} id="card-1">
            <div className={styles.cardWrapper}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>Plan</span>
                    <span className={styles.label}>01</span>
                  </div>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>01</span>
                    <span className={styles.label}>plan</span>
                  </div>
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>plan</span>
                    <span className={styles.label}>01</span>
                  </div>
                  <div className={styles.cardCopy}>
                    <p className={styles.copy}>Discovery</p>
                    <p className={styles.copy}>Research</p>
                    <p className={styles.copy}>Planning</p>
                    <p className={styles.copy}>Strategy</p>
                    <p className={styles.copy}>Roadmap</p>
                    <p className={styles.copy}>Strategy</p>
                  </div>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>01</span>
                    <span className={styles.label}>plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.flipCard2}`} id="card-2">
            <div className={styles.cardWrapper}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>Design</span>
                    <span className={styles.label}>02</span>
                  </div>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>02</span>
                    <span className={styles.label}>Design</span>
                  </div>
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>Design</span>
                    <span className={styles.label}>02</span>
                  </div>
                  <div className={styles.cardCopy}>
                    <p className={styles.copy}>Wireframes</p>
                    <p className={styles.copy}>Research</p>
                    <p className={styles.copy}>Planning</p>
                    <p className={styles.copy}>Strategy</p>
                    <p className={styles.copy}>Roadmap</p>
                    <p className={styles.copy}>Design QA</p>
                  </div>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>02</span>
                    <span className={styles.label}>Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.flipCard3}`} id="card-3">
            <div className={styles.cardWrapper}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>Develop</span>
                    <span className={styles.label}>03</span>
                  </div>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>03</span>
                    <span className={styles.label}>Develop</span>
                  </div>
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>Develop</span>
                    <span className={styles.label}>03</span>
                  </div>
                  <div className={styles.cardCopy}>
                    <p className={styles.copy}>Html</p>
                    <p className={styles.copy}>Css</p>
                    <p className={styles.copy}>JavaScript</p>
                    <p className={styles.copy}>Strategy</p>
                    <p className={styles.copy}>Roadmap</p>
                    <p className={styles.copy}>Launch</p>
                  </div>
                  <div className={styles.cardTitle}>
                    <span className={styles.label}>03</span>
                    <span className={styles.label}>Develop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`${styles.section} ${styles.outro}`}
        id="outro-section"
      >
        <h1 className={styles.title}> the story is not over yet</h1>
      </section>
    </div>
  );
};

export default FlipCard;

import React from "react";
import styles from "../../page.module.css";

const IntroLoader = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.projects}>
          <div className={styles["projects-header"]}>
            <p>Projects</p>
            <p>Directors</p>
          </div>
          <div className={styles["project-item"]}>
            <p>Lawrence</p>
            <p>Cephaas</p>
          </div>
          <div className={styles["project-item"]}>
            <p>Lawrence</p>
            <p>Cephaas</p>
          </div>
          <div className={styles["project-item"]}>
            <p>Lawrence</p>
            <p>Cephaas</p>
          </div>
          <div className={styles["project-item"]}>
            <p>Lawrence</p>
            <p>Cephaas</p>
          </div>
          <div className={styles["project-item"]}>
            <p>Lawrence</p>
            <p>Cephaas</p>
          </div>
        </div>
        <div className={styles.loader}>
          <h1 className="logo-line-1">LC</h1>
          <h1 className="logo-line-2">ID</h1>
        </div>
        <div className={styles.locations}>
          <div className={styles["locations-header"]}>
            <p>Location</p>
          </div>
          <div className={styles["location-item"]}>
            <p>Intelligence Design</p>
          </div>
          <div className={styles["location-item"]}>
            <p>Intelligence Design</p>
          </div>
          <div className={styles["location-item"]}>
            <p>Intelligence Design</p>
          </div>
          <div className={styles["location-item"]}>
            <p>Intelligence Design</p>
          </div>
          <div className={styles["location-item"]}>
            <p>Intelligence Design</p>
          </div>
        </div>
      </div>

      <div className={styles["image-grid"]}>
        <div className={styles["grid-row"]}>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_1.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_2.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_3.jpg" alt="" />
          </div>
        </div>
        <div className={styles["grid-row"]}>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_4.jpg" alt="" />
          </div>
          <div className={`${styles.img} ${styles["hero-img"] || "hero-img"}`}>
            <img src="/LCID/sticky-cards/card_5.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_1.jpg" alt="" />
          </div>
        </div>
        <div className={styles["grid-row"]}>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_2.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_3.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/LCID/sticky-cards/card_4.jpg" alt="" />
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles["nav-logo"]}>
          <a href="#">LCID</a>
        </div>
      </nav>

      <div
        className={`${styles["banner-img"]} ${styles["banner-img-1"] || "banner-img-1"}`}
      >
        <img src="/LCID/sticky-cards/card_2.jpg" alt="" />
      </div>
      <div
        className={`${styles["banner-img"]} ${styles["banner-img-2"] || "banner-img-2"}`}
      >
        <img src="/LCID/sticky-cards/card_5.jpg" alt="" />
      </div>

      <div className={styles["intro-copy"]}>
        <h3>
          <span className={styles.word}>Creative </span>
          <span className={styles.word}>Solutions </span>
        </h3>
        <h3>
          <span className={styles.word}>Impactful </span>
          <span className={styles.word}>Results </span>
        </h3>
      </div>

      <div className={styles.title}>
        <h1>
          <span className={styles.word}>Crafting </span>
          <span className={styles.word}>Bold </span>
          <span className={styles.word}>Experiences </span>
        </h1>
      </div>
    </>
  );
};

export default IntroLoader;

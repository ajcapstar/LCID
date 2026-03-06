"use client";
import styles from "./works.module.css";
const page = () => {
  return (
    <div>
      <section className={`${styles.intro} ${styles.section}`}>
        <h1 className={styles.title}>
          we create modern interiors that feel effortlessly personal
        </h1>
      </section>
      <section className={`${styles.stickyCols} ${styles.section}`}>
        <div className={styles.stickyColsWrapper}>
          <div className={styles.colCol1}>
            <div className={styles.colContent}>
              <div className={styles.colContentWrapper}>
                <h1 className={styles.title}>
                  we design spaces where comfort meets quiet sophistication
                </h1>
                <p className={styles.copy}>
                  layered textures, rich tones, and thoughtful details come
                  togrther to create interiors that feel lived-in yet elevated
                </p>
              </div>
            </div>
          </div>
          <div className={styles.colCol2}>
            <div className={`${styles.colImg} ${styles.colImg1}`}>
              <div className={styles.colImgWrapper}>
                <img
                  src="sticky-cards/card_4.jpg"
                  alt=""
                  srcSet=""
                  className={styles.img}
                />
              </div>
            </div>
            <div className={`${styles.colImg} ${styles.colImg2}`}>
              <div className={styles.colImgWrapper}>
                <img
                  src="sticky-cards/card_4.jpg"
                  alt=""
                  srcSet=""
                  className={styles.img}
                />
              </div>
            </div>
          </div>
          <div className={styles.colCol3}>
            <div className={styles.colContentWrapper}>
              <h1 className={styles.title}>
                Our intentions are crafted to feel as calm as they look
              </h1>
              <p className={styles.copy}>
                each space is designed with intentional balance between warmth
                and modernity, light and shadow, function and beauty.
              </p>
            </div>
            <div className={styles.colContentWrapper2}>
              <h1 className={styles.title}>
                Our intentions are crafted to feel as calm as they look
              </h1>
              <p className={styles.copy}>
                each space is designed with intentional balance between warmth
                and modernity, light and shadow, function and beauty.
              </p>
            </div>
          </div>
          <div className={styles.colCol4}>
            <div className={styles.colImg}>
              <div className={styles.colImgWrapper}>
                <img
                  src="sticky-cards/card_4.jpg"
                  alt=""
                  srcSet=""
                  className={styles.img}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.outro} ${styles.section}`}>
        <h1>Timeless design begins with a conversation</h1>
      </section>
    </div>
  );
};

export default page;

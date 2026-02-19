import StickyCards from "../components/StickyCards";
import styles from "./process.module.css";

const process = () => {
  return (
    <div>
      <div className={styles.intro}>
        <h1 className={styles.title}>{"<Landing page/blog-post>"}</h1>
      </div>
      <StickyCards />
      <div className={styles.intro}>
        <h1 className={styles.title}>{"<footer here>"}</h1>
      </div>
    </div>
  );
};

export default process;

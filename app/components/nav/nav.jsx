import Link from "next/link";
import styles from "./nav.module.css";
const Nav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <div className="nav-logo">
          <Link href="/">LCID</Link>
        </div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/works">Works</Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;

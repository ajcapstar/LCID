import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="preloader-counter">
        <h1>0</h1>
      </div>

      <nav>
        <div className="nav-logo">
          <Link href="/">LCID</Link>
        </div>
        <div className="nav-links">
          <Link href="/">Index</Link>
          <Link href="#">Collection</Link>
          <Link href="#">Material</Link>
          <Link href="/process">Process</Link>
          <Link href="#">Info</Link>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-bg">
          <img src="sticky-cards/card_4.jpg" alt="" />
        </div>
        <div className="header">
          <h1>LCID</h1>
        </div>

        <div className="hero-footer">
          <p>Performance</p>
          <p>craftsmanship</p>
          <p>innovation</p>
        </div>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </section>
    </main>
  );
}

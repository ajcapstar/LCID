import StickyCards from "./components/StickyCards";

export default function Home() {
  return (
    <>
      <div>
        <section className="intro">
          <h1>The Foundations</h1>
        </section>
        <StickyCards />
        <section className="outro">
          <h1>Ends In</h1>
        </section>
      </div>
    </>
  );
}

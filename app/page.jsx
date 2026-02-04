import {ReactLenis} from "lenis/react";


import StickyCards from "./components/StickyCards";

export default function Home() {
  return (
    <>
    <ReactLenis root />
      <div>
        <section className="intro">
         <h1>{'<Landing page/blog-post>'}</h1>
        </section>
        <StickyCards />
        <section className="outro">
          <h1>{'<footer here>'}</h1>

        </section>
      </div>
    </>
  );
}

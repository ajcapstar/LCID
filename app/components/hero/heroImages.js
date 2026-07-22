/**
 * Hero image manifest — all files live in /public/hero/.
 * NEXT_PUBLIC_BASE_PATH is set in next.config.mjs → always '/LCID'.
 * This ensures the browser requests /LCID/hero/imgN.jpg correctly.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const heroImages = [
  { src: `${BASE}/hero/img1.jpg`,  alt: "Creative direction — campaign 01" },
  { src: `${BASE}/hero/img2.jpg`,  alt: "Creative direction — campaign 02" },
  { src: `${BASE}/hero/img3.jpg`,  alt: "Creative direction — campaign 03" },
  { src: `${BASE}/hero/img4.jpg`,  alt: "Creative direction — campaign 04" },
  { src: `${BASE}/hero/img5.jpg`,  alt: "Creative direction — campaign 05" },
  { src: `${BASE}/hero/img6.jpg`,  alt: "Studio — architectural texture" },
  { src: `${BASE}/hero/img7.jpg`,  alt: "Studio — product editorial" },
  { src: `${BASE}/hero/img8.jpg`,  alt: "Studio — fashion editorial" },
  { src: `${BASE}/hero/img9.jpg`,  alt: "Studio — abstract fluid" },
  { src: `${BASE}/hero/img10.jpg`, alt: "Studio — workspace interior" },
  { src: `${BASE}/hero/img11.jpg`, alt: "Studio — luxury identity" },
  { src: `${BASE}/hero/img12.jpg`, alt: "Studio — urban architecture" },
  { src: `${BASE}/hero/img13.jpg`, alt: "Studio — motion blur" },
  { src: `${BASE}/hero/img14.jpg`, alt: "Studio — minimalist object" },
  { src: `${BASE}/hero/img15.jpg`, alt: "Studio — cinematic atmosphere" },
];


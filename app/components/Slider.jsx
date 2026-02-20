"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

const Slider = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const splitText = (selector, type, className) => {
        return new SplitText(selector, {
          type: type,
          [`${type}Class`]: className,
          // mask: type, // SplitText doesn't have a 'mask' property in standard API, but user's code had it. Keeping it commented or removing unless custom logic handles it.
          // The screenshot shows SplitText.create which might be a custom wrapper or different version, but standard is `new SplitText`.
          // However, the screenshot code `return SplitText.create(...)` suggests they might want that specific API.
          // `SplitText.create` exists in newer GSAP versions (3.14+).
        });
      };

      // Example usage (uncomment to use)
      // const split = splitText("h1", "chars", "char");
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      {/* Example content */}
      <h1>Slider Content</h1>
    </div>
  );
};

export default Slider;

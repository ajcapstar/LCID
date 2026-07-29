import { forwardRef } from "react";

const Logo = forwardRef(function Logo(props, ref) {
  return (
    <svg
      ref={ref}
      width="68px"
      height="auto"
      viewBox="-4 -4 106 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
      {...props}
    >
      <path
        d="M48.89 24.4833C45.5896 19.6318 37.5037 4.44925 23.5871 4.90587C7.08529 6.0474 4.5 19.5747 4.5 24.3692C4.5 38.2389 14.8412 43.49 23.5871 43.49C34.7534 43.49 41.9042 34.2435 50.5402 22.8852C62.0915 6.44695 70.6724 4.36704 75.293 4.50631C88.5494 4.90586 93.5 14.8944 93.5 23.9126C92.9499 38.2389 82.1137 43.49 75.1829 43.49C64.3137 43.901 53.8589 31.637 49.9901 25.4536"
        stroke="black"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
});

Logo.displayName = "Logo";

export default Logo;

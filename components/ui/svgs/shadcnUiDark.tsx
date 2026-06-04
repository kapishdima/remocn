import type { SVGProps } from "react";

const ShadcnUiDark = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 256">
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      stroke="#fff"
      strokeWidth="25"
      strokeLinecap="round"
      d="M208 128l-80 80M192 40L40 192"
    />
  </svg>
);

export { ShadcnUiDark };

import type { SVGProps } from "react";

export function ChefHatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19.3 12.8A6.2 6.2 0 0 0 17.5 9h-11A6.2 6.2 0 0 0 4.7 12.8" />
      <path d="M12 18v3" />
      <path d="M12 10V8c0-2.2 1.8-4 4-4h.5c1.4 0 2.5 1.1 2.5 2.5v1.5" />
      <path d="M12 8c0-2.2-1.8-4-4-4h-.5C6.1 4 5 5.1 5 6.5V8" />
    </svg>
  );
}

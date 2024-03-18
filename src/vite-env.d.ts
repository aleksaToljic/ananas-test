/// <reference types="vite/client" />

import "react";
declare module "react" {
  // Extending the CSSProperties because by default, they are not supporting css variables.
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

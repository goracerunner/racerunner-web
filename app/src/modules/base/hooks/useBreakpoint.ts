import useBp from "use-breakpoint";

import { Breakpoint } from "./types";

/**
 * Breakpoint configuration
 */
const BREAKPOINTS: { [key in Breakpoint]: number } = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

/**
 * Ordering of breakpoint names
 */
const BREAKPOINT_ORDER: Array<Breakpoint> = ["xs", "sm", "md", "lg", "xl"];

/**
 * An extension of the `use-breakpoint` hook with a custom default
 * configuration. Returns an object with three fields: `in`, `above`
 * and `below`. Each field contains a mapping of the breakpoint sizes
 * and whether we are currently in, above or below the specified
 * breakpoint respectively.
 */
const useBreakpoint = () => {
  const { breakpoint } = useBp(BREAKPOINTS, "md");
  const info = {
    in: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    },
    above: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    },
    below: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    },
    current: breakpoint as Breakpoint
  };

  // Set the current break point as true
  info.in[breakpoint as Breakpoint] = true;

  // Iterate through the breakpoints in order
  BREAKPOINT_ORDER.reduce((isBelow, currentBreakpoint) => {
    // If we are already passed the current breakpoint,
    // set all following breakpoints to true
    if (isBelow) {
      info.below[currentBreakpoint] = true;
    }
    // If we pass the current breakpoint, return true so
    // that we will set all following breakpoints as true.
    if (!isBelow && breakpoint === currentBreakpoint) {
      return true;
    }
    return isBelow;
  }, false);

  // Do the same thing for isAbove but in reverse
  [...BREAKPOINT_ORDER].reverse().reduce((isAbove, currentBreakpoint) => {
    if (isAbove) {
      info.above[currentBreakpoint] = true;
    }
    if (!isAbove && breakpoint === currentBreakpoint) {
      return true;
    }
    return isAbove;
  }, false);

  return info;
};

export default useBreakpoint;

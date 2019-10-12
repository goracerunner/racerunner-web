import { useState, useEffect } from "react";

import { UseTransitionOptions, UseTransitionHookResult } from "./types";

/**
 * A convenience hook to use with Transition components.
 * Returns an object with the `in` and `style` properties
 * which can be passed as props to a Transition component.
 * @param options options to customise the CSS transition
 */
export const useTransition: (
  options?: UseTransitionOptions
) => UseTransitionHookResult = (options?: UseTransitionOptions) => {
  const [activate, setActivate] = useState(false);

  // Activate the transition once.
  useEffect(() => {
    if (!activate) setActivate(true);
  }, [activate, setActivate]);

  const style: { [key: string]: string } = {};
  const timeout: { [key: string]: number } = {};

  // If options are given, return the props as CSS properties
  if (options) {
    const { delay, duration } = options;
    if (delay) style.transitionDelay = `${delay}ms`;
    if (duration) timeout.enter = duration;
  }

  return {
    in: activate,
    style,
    timeout
  };
};

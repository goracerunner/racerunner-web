import React from "react";

export interface ContainerProps {
  /**
   * Children to render.
   */
  children?: React.ReactNode | React.ReactNodeArray;

  /**
   * Make the container always fill the full width of
   * the screen with a 1rem margin.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Width of margins if container is `fullWidth`.
   * @default 1rem
   */
  margins?: string;
}

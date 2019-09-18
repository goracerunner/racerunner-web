export interface RaceRunnerLogoProps {
  /**
   * Invert the logo colours.
   * @default false
   */
  inverted?: boolean;

  /**
   * Custom styles.
   * @default null
   */
  className?: string;

  /**
   * The base size of the logo in px. The logo size will be
   * reduced by 20% on mobile devices.
   * @default 45
   */
  baseSize?: number;
}

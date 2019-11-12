export interface LoaderProps {
  /**
   * The main message to show on the loader.
   */
  title?: string | JSX.Element;

  /**
   * By default, the title prop is rendered with a stylised
   * font. Set this prop to use the default font for the title.
   */
  unstyledTitle?: boolean;

  /**
   * The smaller message to show on the loader.
   */
  message?: string | JSX.Element;

  /**
   * If true, the spinner is hidden.
   * @default false
   */
  hideSpinner?: boolean;

  /**
   * If true, the background is hidden.
   * @default false
   */
  hideBackground?: boolean;

  /**
   * If `true`, the loader will have an animated transition.
   */
  animated?: boolean;

  /**
   * If `true`, an inverted logo will be shown (black).
   */
  inverted?: boolean;
}

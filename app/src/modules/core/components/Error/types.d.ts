export interface ErrorProps {
  /**
   * The icon to use. The default is a Warning icon from Material UI.
   */
  Icon?;

  /**
   * The error message.
   */
  caption: string;

  /**
   * The error details. If this value is falsy,
   * the entire component will not be shown.
   * Otherwise, the `toString()` method will
   * be called to provide a tooltip.
   */
  error: any;

  /**
   * The margin surrounding the loader. This will
   * be passed as the CSS `margin-top` and
   * `margin-bottom` properties.
   * @default 2rem
   */
  margin?: string;

  /**
   * The spacing between the icon and the caption.
   * This will be passed as the CSS `margin-bottom`
   * property.
   * @default 0.5rem
   */
  iconSpacing?: string;

  /**
   * The size of the icon. This will be passed
   * as the CSS `height` and `width` properties
   * to the icon.
   * @default 2.5rem
   */
  iconSize?: string;
}

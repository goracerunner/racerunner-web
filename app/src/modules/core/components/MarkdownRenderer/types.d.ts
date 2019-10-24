export interface MarkdownRendererProps {
  /**
   * The source string to be rendered (includes encoded characters).
   * The editor will decode all special characters automatically.
   */
  source: string;
}

export interface HeadingProps {
  /**
   * The level of the heading. A number between 1 and 6.
   */
  level: number;
}

export interface ManagerPageContainerProps {
  /**
   * The title for the page.
   */
  title: string;

  /**
   * The subtitle to show underneath the title.
   * If this is not give, `for ${race.name}` will
   * be shown.
   */
  subtitle?: string;

  /**
   * The maxWidth to use for the container in which
   * the content (children) will be rendered.
   * @default md
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

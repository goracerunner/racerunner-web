export interface LinkListProps {
  /**
   * A list of links to render in the link list.
   */
  links: Array<LinkCardProps>;

  /**
   * If `true`, link cards will always be rendered at full width.
   */
  fullWidth?: boolean;
}

export interface LinkCardProps {
  /**
   * A unique identifier for the link.
   */
  id: string;

  /**
   * The human friendly name of the link.
   */
  name: string;

  /**
   * A (very) short description of the link.
   */
  description?: string;

  /**
   * The URL to access the link. This will be passed to a
   * `Link` component as the `to` prop.
   */
  link: string;

  /**
   * If this is `true`, the title shown on the link
   * card will be larger in size.
   */
  largeTitle?: boolean;

  /**
   * The icon for the link.
   */
  icon: JSX.Element;

  /**
   * If `true`, the link card will always be rendered at full width.
   */
  fullWidth?: boolean;
}

export interface LinkListProps {
  /**
   * A list of links to render in the link list.
   */
  links: Array<LinkCardProps>;
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
  description: string;

  /**
   * The URL to access the link. This will be passed to a
   * `Link` component as the `to` prop.
   */
  link: string;

  /**
   * The icon for the link.
   */
  icon: JSX.Element;
}

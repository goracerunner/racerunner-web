export interface AppDrawerProps {
  /**
   * The open/close state of the drawer.
   */
  open?: boolean;

  /**
   * The function to call that will close the drawer. Calling
   * this function should change the `open` prop to `false`.
   */
  onClose: () => any;
}

export interface AppDrawerItemsProps {
  /**
   * The function to call that will close the drawer. Calling
   * this function should change the `open` prop to `false`.
   */
  onClose: () => any;
}

export interface AppDrawerItemProps {
  /**
   * Callback function to closer the drawer when the item is clicked.
   */
  onClose: () => void;

  /**
   * The icon to use for the item.
   */
  Icon;

  /**
   * The color of the icon.
   */
  iconColor?: "inherit" | "disabled";

  /**
   * The style to apply to the item text.
   */
  itemStyle?: string;

  /**
   * The link for the item.
   */
  to: string;

  /**
   * The name of the item.
   */
  name: string;
}

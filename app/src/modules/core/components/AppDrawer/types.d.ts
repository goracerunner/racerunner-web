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

export interface TabBar {
  /**
   * The id of the tab.
   */
  id: string;

  /**
   * The human-friendly name for the tab.
   */
  name: string;

  /**
   * The link that the tab should navigate to.
   */
  link: string;
}

export interface TabBarProps {
  /**
   * The list of tabs to show in the tab bar.
   */
  tabs: Array<TabBar>;

  /**
   * The id of the currently selected tab. This should match
   * one of the tab bar objects in the `tabs` list.
   */
  currentTab?: number;
}

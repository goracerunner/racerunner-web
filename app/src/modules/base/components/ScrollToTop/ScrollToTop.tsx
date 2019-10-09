import React, { ComponentType } from "react";
import { withRouter } from "react-router-dom";
import { ScrollToTopProps } from "./types";

/**
 * Scroll the screen to the top if the location changes.
 */
class ScrollToTopComponent extends React.PureComponent<ScrollToTopProps> {
  public componentDidUpdate(prevProps: ScrollToTopProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  public render = () => this.props.children || null;
}

export const ScrollToTop = withRouter<
  ScrollToTopProps,
  ComponentType<ScrollToTopProps>
>(ScrollToTopComponent);

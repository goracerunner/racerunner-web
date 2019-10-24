import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { TabBarProps } from "./types";
import useStyles from "./styles";

/**
 * The TabBar component renders a list of tabs for a page. The current
 * tab should be stored in the `NavigationContext` and passed to this
 * component as a prop.
 *
 * Each tab is rendered as a link. It is intended that the tab state be
 * updated in the `NavigationContext` when the user navigates to a new
 * tab.
 */
export const TabBar: React.FC<TabBarProps> = ({ tabs, currentTab }) => {
  const classes = useStyles();

  let tabIndex = currentTab;
  let spareTab = null;

  // If we are passed an index of -1, it means that the requested
  // tab is not available. We add an extra tab with 'Not Found' to
  // indicate this to the user.
  if (currentTab === -1) {
    tabIndex = tabs.length;
    spareTab = (
      <Tab
        disableRipple
        key="tab-not-found"
        label="Not found"
        className={classes.notFound}
        disabled
      />
    );
  }

  return (
    <AppBar position="static" color="secondary" elevation={0}>
      <Tabs
        value={tabIndex}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          className: classes.indicator
        }}
        classes={{
          scroller: classes.scroller
        }}
      >
        {tabs.map(tab => (
          <Tab
            disableRipple
            key={tab.id}
            label={tab.name}
            component={Link}
            to={tab.link}
            className={classes.tab}
          />
        ))}
        {spareTab}
      </Tabs>
    </AppBar>
  );
};

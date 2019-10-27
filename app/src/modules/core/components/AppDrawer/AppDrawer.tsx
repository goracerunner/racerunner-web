import React, { FC } from "react";
import clsx from "clsx";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import Header from "../../../base/components/Header";
import DefaultTheme, { DarkTheme } from "../../../base/components/Theme";

import { RaceDrawerItems } from "./RaceDrawerItems";
import { ManageDrawerItems } from "./ManageDrawerItems";
import { DashboardDrawerItems } from "./DashboardDrawerItems";
import { AdminDrawerItems } from "./AdminDrawerItems";
import { AppDrawerProps } from "./types";
import useStyles from "./styles";

/**
 * The app drawer shows navigation links for the user.
 */
export const AppDrawer: FC<AppDrawerProps> = ({ children, open, onClose }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  let content: JSX.Element = <></>;

  // Show the appropriate menu items based on the path.
  const path = /^\/(\w+)/.exec(pathname) || [];
  switch (path[1]) {
    case "dashboard": {
      content = <DashboardDrawerItems onClose={onClose} />;
      break;
    }
    case "race": {
      content = <RaceDrawerItems onClose={onClose} />;
      break;
    }
    case "manage": {
      content = <ManageDrawerItems onClose={onClose} />;
      break;
    }
    case "admin": {
      content = <AdminDrawerItems onClose={onClose} />;
      break;
    }
  }

  return (
    <>
      <DarkTheme>
        <Drawer
          variant="temporary"
          ModalProps={{
            onBackdropClick: onClose
          }}
          open={open}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <Button
            className={classes.homeButton}
            disableRipple
            onClick={onClose}
            component={Link}
            to="/"
          >
            <div className={classes.homeIcon}>
              <Header inverted reduced />
            </div>
          </Button>
          <Divider />
          {content}
        </Drawer>
      </DarkTheme>
      <DefaultTheme>
        <div className={classes.content}>{children}</div>
      </DefaultTheme>
    </>
  );
};

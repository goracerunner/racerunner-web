import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import AppModeContext from "../../contexts/AppModeContext";
import Header from "../../../base/components/Header";
import DefaultTheme, { DarkTheme } from "../../../base/components/Theme";

import { RaceDrawerItems } from "./RaceDrawerItems";
import { ManageDrawerItems } from "./ManageDrawerItems";
import { DashboardDrawerItems } from "./DashboardDrawerItems";
import { AppDrawerProps } from "./types";
import useStyles from "./styles";

/**
 * The app drawer shows navigation links for the user.
 */
export const AppDrawer: FC<AppDrawerProps> = ({ children, open, onClose }) => {
  const classes = useStyles();
  const { mode } = useContext(AppModeContext);

  let content: JSX.Element;

  // Show the appropriate menu items based on the app mode.
  switch (mode) {
    default:
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
          <Tooltip
            title="Home"
            disableHoverListener={open}
            disableFocusListener={open}
            disableTouchListener={open}
            placement="left"
          >
            <Button className={classes.homeButton} component={Link} to="/">
              <div className={classes.homeIcon}>
                <Header inverted reduced />
              </div>
            </Button>
          </Tooltip>
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

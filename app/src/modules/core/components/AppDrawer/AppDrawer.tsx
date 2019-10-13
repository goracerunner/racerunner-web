import React, { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import DefaultTheme, { DarkTheme } from "../../../base/components/Theme";

import { AppDrawerProps } from "./types";
import useStyles from "./styles";
import Header from "../../../base/components/Header";

/**
 * The app drawer shows navigation links for the user.
 */
export const AppDrawer: FC<AppDrawerProps> = ({ children, open, onClose }) => {
  const classes = useStyles();
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
        </Drawer>
      </DarkTheme>
      <DefaultTheme>
        <div className={classes.content}>{children}</div>
      </DefaultTheme>
    </>
  );
};

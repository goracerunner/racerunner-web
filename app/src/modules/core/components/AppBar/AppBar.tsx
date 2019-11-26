import React, { FC, useContext } from "react";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Bar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useMenuAnchor } from "../../hooks/useMenu";

import { AppBarMenu } from "./AppBarMenu";
import { AppBarProps } from "./types";
import useStyles from "./styles";

/**
 * The AppBar renders the user account menu at the top of the page.
 */
export const AppBar: FC<AppBarProps> = ({ onDrawerOpen }) => {
  const classes = useStyles();

  const { user } = useContext(AuthenticationContext);

  const [menuAnchor, openMenu, closeMenu] = useMenuAnchor();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20
  });

  return (
    <>
      <Bar elevation={trigger ? 5 : 0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <div className={classes.spacer} />
          {user && (
            <AppBarMenu
              user={user}
              openMenu={openMenu}
              closeMenu={closeMenu}
              menuAnchor={menuAnchor}
            />
          )}
        </Toolbar>
      </Bar>
      <div className={classes.buffer} />
    </>
  );
};

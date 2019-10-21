import React, { FC, useContext, useState } from "react";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Bar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import { Nullable } from "../../../../types/global";
import AuthenticationContext from "../../contexts/AuthenticationContext";

import { AppBarMenu } from "./AppBarMenu";
import { AppBarProps } from "./types";
import useStyles from "./styles";

/**
 * The AppBar renders the user account menu at the top of the page.
 */
export const AppBar: FC<AppBarProps> = ({ onDrawerOpen }) => {
  const classes = useStyles();

  const { user } = useContext(AuthenticationContext);

  const [menuAnchor, setMenuAnchor] = useState<Nullable<HTMLElement>>(null);
  const closeMenu = () => setMenuAnchor(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20
  });

  return (
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
  );
};

import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import { LinkCard } from "./LinkCard";
import { LinkListProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a list of links.
 */
export const LinkList: FC<LinkListProps> = ({ links }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      {links.map(item => (
        <LinkCard key={item.id} {...item} />
      ))}
    </Grid>
  );
};

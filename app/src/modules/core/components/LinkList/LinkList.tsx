import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import { LinkCard } from "./LinkCard";
import { LinkListProps } from "./types";

/**
 * This component renders a list of links.
 */
export const LinkList: FC<LinkListProps> = ({ links, fullWidth }) => {
  return (
    <Grid container spacing={2}>
      {links.map(item => (
        <LinkCard key={item.id} fullWidth={fullWidth} {...item} />
      ))}
    </Grid>
  );
};

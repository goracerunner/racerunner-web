import React, { FC, useCallback } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";

import { useCardStyles } from "./styles";
import { RaceCardProps } from "./types";

/**
 * This component provides basic information about a race.
 */
export const RaceCard: FC<RaceCardProps> = ({ race, onSelectRace }) => {
  const classes = useCardStyles();

  const open = useCallback(() => {
    if (onSelectRace) onSelectRace(race.uid);
  }, [onSelectRace, race.uid]);

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={open || undefined}>
        <CardHeader
          classes={{
            title: classes.title,
            subheader: classes.subheader
          }}
          title={race.name}
          subheader={race.description}
        />
      </CardActionArea>
    </Card>
  );
};

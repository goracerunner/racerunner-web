import React, { FC } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import GoIcon from "@material-ui/icons/ArrowForward";

import { LinkCardProps } from "./types";
import useStyles from "./styles";

/**
 * This component renders a card that shows a
 * link with a description and icon.
 */
export const LinkCard: FC<LinkCardProps> = props => {
  const classes = useStyles(props);
  const { name, description, link, icon, largeTitle } = props;

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card>
        <CardActionArea className={classes.card} component={Link} to={link}>
          <CardContent className={classes.content}>
            <div className={classes.title}>
              <div className={classes.icon}>{icon}</div>
              <div>
                <Typography variant={largeTitle ? "h5" : "body1"}>
                  <b>{name}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {description}
                </Typography>
              </div>
            </div>
            <GoIcon className={classes.arrow} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

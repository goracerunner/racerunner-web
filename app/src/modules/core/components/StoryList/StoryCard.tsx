import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import MoreIcon from "@material-ui/icons/MoreVert";

import { useCardStyles } from "./styles";
import { StoryCardProps } from "./types";

/**
 * The story card component renders the contents of a story,
 * which contains a title, a small amount of information and
 * links/actions for the user to take in response to the story.
 */
export const StoryCard: React.FC<StoryCardProps> = ({
  title,
  subtitle,
  appIcon,
  appLink,
  onClick,
  appTooltip,
  action,
  openMoreMenu,
  children
}) => {
  const classes = useCardStyles();

  let appButton = null;

  if (appIcon) {
    appButton = <IconButton disabled={!Boolean(appLink)}>{appIcon}</IconButton>;
  }

  if (appButton && appLink) {
    appButton = <Link to={appLink}>{appButton}</Link>;
  }

  if (appButton && appTooltip) {
    appButton = (
      <Tooltip title={appTooltip} placement="left">
        <div>{appButton}</div>
      </Tooltip>
    );
  }

  const content = (
    <>
      <CardContent>
        <div className={classes.header}>
          <div>
            <Typography variant="h6">
              <b>{title || <>&nbsp;</>}</b>
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {subtitle}
            </Typography>
          </div>
          {appButton}
        </div>
        <div className={classes.content}>{children}</div>
      </CardContent>
      {action && (
        <CardActions className={classes.actions}>
          {action}
          {openMoreMenu && (
            <IconButton onClick={openMoreMenu}>
              <MoreIcon fontSize="small" />
            </IconButton>
          )}
        </CardActions>
      )}
    </>
  );

  if (onClick) {
    return (
      <Card className={classes.root}>
        <CardActionArea onClick={onClick} className={classes.root}>
          {content}
        </CardActionArea>
      </Card>
    );
  }

  return <Card>{content}</Card>;
};

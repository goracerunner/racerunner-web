import React from "react";
import moment from "moment";
import uuid from "uuid/v4";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import useStyles from "./styles";
import { StoryCard } from "./StoryCard";
import { StoryListProps } from "./types";

/**
 * The story list component renders a list of stories. A story contains
 * a title, a small amount of information and links/actions for the user
 * to take in response to the story.
 */
export const StoryList: React.FC<StoryListProps> = ({
  stories,
  hideEmptyWelcome,
  welcome,
  children
}) => {
  const classes = useStyles();
  let content = null;

  if (stories && stories.length) {
    // Render stories
    content = stories.map(item => (
      <Grid key={uuid()} item xs={12} sm={6} md={4}>
        <StoryCard {...item} />
      </Grid>
    ));
  } else if (children) {
    if (children.length) {
      // Render stories
      content = children
        // Filter out any null or false items
        .filter((item: JSX.Element) => Boolean(item))
        .map((story: JSX.Element, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            {story}
          </Grid>
        ));
    } else {
      content = (
        <Grid item xs={12} sm={6} md={4}>
          {children}
        </Grid>
      );
    }
  } else if (!hideEmptyWelcome) {
    // If there are no stories, render the welcome card
    content = (
      <Grid item xs={12} sm={6} md={4}>
        {welcome ? (
          // Give the option to customise the welcome card
          welcome
        ) : (
          <StoryCard
            title={`Today is ${moment().format("dddd")}`}
            subtitle={`${moment().format("Do of MMMM, YYYY")}`}
          >
            <div className={classes.centered}>
              <ThumbUpIcon
                className={classes.icon}
                color="disabled"
                fontSize="large"
              />
              <Typography variant="body2" color="textSecondary">
                <em>You don't have any updates to view at the moment.</em>
              </Typography>
            </div>
          </StoryCard>
        )}
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {content}
      </Grid>
    </div>
  );
};

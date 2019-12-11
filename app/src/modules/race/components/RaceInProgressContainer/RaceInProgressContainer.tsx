import React, { FC, useContext } from "react";
import { Redirect } from "react-router";

import RaceContext from "../../../core/contexts/RaceContext";

import RacePageContainer from "../../components/RacePageContainer";

import { Nullable } from "../../../../types/global";

import { RaceInProgressContainerProps } from "./types";
// import useStyles from "./styles";

/**
 * This component renders children only if the user is registered
 * in the race and the race is in progress. Otherwise, it will redirect
 * the user back to the dashboard (path `/race`).
 */
export const RaceInProgressContainer: FC<RaceInProgressContainerProps> = ({
  children,
  ...props
}) => {
  const { loading, registered, race } = useContext(RaceContext);

  let content: Nullable<JSX.Element> = null;

  if (!loading && race) {
    if (!registered || race.status !== "in_progress") {
      return <Redirect to="/race" />;
    } else {
      content = <>{children}</>;
    }
  }

  return <RacePageContainer {...props}>{content}</RacePageContainer>;
};

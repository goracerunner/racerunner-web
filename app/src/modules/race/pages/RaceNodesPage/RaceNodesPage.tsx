import React, { useContext } from "react";

import RaceContext from "../../../core/contexts/RaceContext";

import RaceInProgressContainer from "../../components/RaceInProgressContainer";

// import useStyles from "./styles";

/**
 * TODO: add description
 */
export const RaceNodesPage: React.FC = () => {
  const { loading, registered, race } = useContext(RaceContext);
  return <RaceInProgressContainer title="Challenges"></RaceInProgressContainer>;
};

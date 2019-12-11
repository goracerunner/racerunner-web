import React, { useContext } from "react";

import RaceContext from "../../../core/contexts/RaceContext";

import RaceInProgressContainer from "../../components/RaceInProgressContainer";

// import useStyles from "./styles";

/**
 * TODO: add description
 */
export const RaceViewNodePage: React.FC = () => {
  const {} = useContext(RaceContext);
  return <RaceInProgressContainer title="Challenge"></RaceInProgressContainer>;
};

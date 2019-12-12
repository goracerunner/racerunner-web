import React, { useContext, useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import RaceContext from "../../../core/contexts/RaceContext";

import ManagerPageContainer from "../../components/ManagerPageContainer";
import AllResponsesList from "../../components/AllResponsesList";

import { Nullable } from "../../../../types/global";

// import useStyles from "./styles";

/**
 * TODO: add description
 */
export const ManagerResponsesPage: React.FC = () => {
  const { race } = useContext(RaceContext);

  const [tab, setTab] = useState(0);

  let content: Nullable<JSX.Element> = null;

  if (race) {
    content = (
      <>
        <Tabs
          value={tab}
          onChange={(e, value) => setTab(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Unchecked responses" />
          <Tab label="Checked responses" />
        </Tabs>
        <AllResponsesList
          race={race}
          type={tab === 0 ? "unchecked" : "checked"}
        />
      </>
    );
  }

  return (
    <ManagerPageContainer title="Responses">{content}</ManagerPageContainer>
  );
};

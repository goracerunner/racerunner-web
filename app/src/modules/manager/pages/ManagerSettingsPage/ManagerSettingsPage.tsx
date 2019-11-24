import React, { useContext, useState } from "react";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import RaceContext from "../../../core/contexts/RaceContext";
import Property from "../../../core/components/Property";

import ManagerPageContainer from "../../components/ManagerPageContainer";
import RaceStatus from "../../components/RaceStatus";
import RegistrationFieldEditor from "../../components/RegistrationFieldEditor";
import RaceStatusDialog from "../../components/RaceStatusDialog";

import { Nullable } from "../../../../types/global";

import useStyles from "./styles";

/**
 * This page shows the configurable settings for the selected race.
 */
export const ManagerSettingsPage: React.FC = () => {
  const classes = useStyles();
  const { race } = useContext(RaceContext);

  const [showRaceStatus, setShowRaceStatus] = useState(false);

  let content: Nullable<JSX.Element> = null;

  if (race) {
    content = (
      <>
        <Paper className={classes.paper}>
          {/* TODO: implement edit button */}
          <IconButton className={classes.action} disabled>
            <EditIcon />
          </IconButton>
          <Property title="Name">{race.name}</Property>
          <Property title="Description">{race.description}</Property>
          <Property title="Event date">
            {moment(race.eventDate.toDate()).format("dddd Do MMMM, YYYY")}
          </Property>
        </Paper>
        <Paper className={classes.paper}>
          <Property title="Entry code">{race.uid}</Property>
        </Paper>
        <Paper className={classes.paper}>
          <IconButton
            className={classes.action}
            onClick={() => setShowRaceStatus(true)}
          >
            <EditIcon />
          </IconButton>
          <Property title="Race status">
            <div className={classes.status}>
              <RaceStatus status={race.status} />
            </div>
          </Property>
        </Paper>
        <Paper className={classes.regoPaper}>
          <Property title="Registration fields" noMargin />
          {/* TODO: implement add button */}
          <Tooltip title="Add a new registration field" placement="left">
            <IconButton disabled>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Paper>
        <RegistrationFieldEditor raceId={race.uid} />
        <RaceStatusDialog
          open={showRaceStatus}
          onClose={() => setShowRaceStatus(false)}
          raceId={race.uid}
          status={race.status}
        />
      </>
    );
  }

  return (
    <ManagerPageContainer title="Settings">{content}</ManagerPageContainer>
  );
};

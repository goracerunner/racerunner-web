import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { RaceStatus as RaceStatusType } from "../../../../types/race";

import { RaceStatus } from "./RaceStatus";
export default RaceStatus;

export const RACE_STATUS_INFO: Array<{
  id: RaceStatusType;
  label: string;
  description: string;
  color: string;
}> = [
  {
    id: "registration_open",
    label: "Registration open",
    description: "Users can join the race and register.",
    color: green[500]
  },
  {
    id: "registration_closed",
    label: "Registration closed",
    description: "Users cannot join the race.",
    color: red[500]
  },
  {
    id: "in_progress",
    label: "In progress",
    description: "Participants can access the race nodes and give responses.",
    color: orange[500]
  },
  {
    id: "results",
    label: "Results",
    description: "Participants can view the race results.",
    color: blue[500]
  },
  {
    id: "closed",
    label: "Closed",
    description: "Participants can view the race but cannot interact with it.",
    color: blueGrey[500]
  }
];

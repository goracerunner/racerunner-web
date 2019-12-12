import React, { FC, useContext, useState, useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import AuthenticationContext from "../../../core/contexts/AuthenticationContext";

import { useErrorLogging } from "../../../base/hooks/useLogging";
import { useFirestore } from "../../../core/hooks/useFirebase";

import Property from "../../../core/components/Property";
import * as RichText from "../../../core/components/RichText";

import {
  NodeSecrets,
  Task,
  ResponseCheck,
  ResponseCheckInput
} from "../../../../types/node";

import { CheckResponseDialogProps } from "./types";
import useStyles from "./styles";
import { useBooleanState } from "../../../base/hooks/useStateFactory";
import { TextField } from "@material-ui/core";

/**
 * TODO: Add description
 */
export const CheckResponseDialog: FC<CheckResponseDialogProps> = ({
  open,
  onClose,
  node,
  meta,
  race,
  team,
  response
}) => {
  const classes = useStyles();
  const { user } = useContext(AuthenticationContext);

  const store = useFirestore();
  const raceRef = store.collection("races").doc(race.uid);
  const nodeRef = raceRef.collection("nodes").doc(node.nodeId);

  const [task, taskLoading, taskError] = useDocumentData<Task>(
    nodeRef.collection("tasks").doc(response.taskId)
  );

  const [secrets, secretsLoading, secretsError] = useDocumentData<NodeSecrets>(
    nodeRef.collection("protected").doc("secrets")
  );

  const [check, checkLoading, checkError] = useDocumentData<ResponseCheck>(
    nodeRef.collection("checks").doc(response.responseId)
  );

  const [updatingCheck, setUpdating] = useState(false);
  const [showEdit, openEdit, closeEdit] = useBooleanState(false);
  const [correct, setCorrect] = useState(false);
  const [retry, setRetry] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!showEdit) {
      if (check) {
        setCorrect(check.correct);
        setRetry(check.retry);
        setPoints(check.points);
      } else {
        setCorrect(false);
        setRetry(false);
        setPoints(0);
      }
    }
  }, [showEdit, check, setCorrect, setRetry, setPoints]);

  const saveCheck = async () => {
    if (task && user) {
      setUpdating(true);
      const check: ResponseCheckInput = {
        raceId: race.uid,
        nodeId: node.nodeId,
        teamId: team.teamId,
        responseId: response.responseId,
        taskId: task.taskId,
        date: new Date(),
        feedback: "",
        checkedBy: user.uid,
        correct,
        retry,
        points
      };
      await nodeRef
        .collection("checks")
        .doc(response.responseId)
        .set(check);
      setUpdating(false);
      closeEdit();
    }
  };

  useErrorLogging(
    "CheckResponseDialog",
    "An error occurred when retrieving the task",
    taskError
  );

  useErrorLogging(
    "CheckResponseDialog",
    "An error occurred when retrieving node secrets",
    secretsError
  );

  useErrorLogging(
    "CheckResponseDialog",
    "An error occurred when retrieving the check",
    checkError
  );

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Response for <b>{meta.name}</b>
        </DialogTitle>
        <DialogContent>
          <Property title="Description">
            <RichText.Preview value={meta.description} />
          </Property>
          {secrets && (
            <>
              <Property title="Notes">
                <RichText.Preview value={secrets.notes} />
              </Property>
            </>
          )}
          {task && (
            <>
              <Property title="Task description">
                <RichText.Preview value={task.description} />
              </Property>
            </>
          )}
          <Divider className={classes.divider} />
          {response.type === "phrase" && (
            <Property title="Response">{response.value}</Property>
          )}
          {response.type === "photo" && (
            <Property title="Response">
              <img
                src={response.value}
                alt="response"
                className={classes.image}
              />
            </Property>
          )}
          <Divider className={classes.divider} />
          {!checkLoading &&
            (check ? (
              <>
                <Property title="Correct">
                  {check.correct ? "Yes" : "No"}
                </Property>
                <Property title="Retry">{check.retry ? "Yes" : "No"}</Property>
                <Property title="Points awarded">
                  {check.points.toString()}
                </Property>
                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={openEdit}
                  disabled={updatingCheck}
                >
                  Edit response check
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={openEdit}
                disabled={updatingCheck}
              >
                Check response
              </Button>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showEdit} onClose={closeEdit}>
        <DialogTitle>Response check</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch
                checked={correct}
                value="correct"
                onChange={e => setCorrect(e.target.checked)}
              />
            }
            label="Correct"
          />
          <FormControlLabel
            control={
              <Switch
                checked={retry}
                value="retry"
                onChange={e => setRetry(e.target.checked)}
              />
            }
            label="Retry"
          />
          <TextField
            label="Points"
            value={points}
            onChange={e => {
              if (!isNaN(parseInt(e.target.value))) {
                setPoints(parseInt(e.target.value));
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={saveCheck}
            disabled={updatingCheck}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
